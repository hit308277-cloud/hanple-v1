// src/LedgerView.jsx

// STO 원장(토큰 기록) 뼈대
// - 계약 / 정산 / 입·출고 / 수금·지급 내역을 "토큰처럼" 기록
// - 지금은 수동 입력, 나중에 정산·계약·창고에서 자동으로 기록하도록 연동 가능

function LedgerView({ ledgerItems, setLedgerItems }) {
  const handleAdd = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const kind = form.get("kind");      // 수금 / 지급 / 계약 / 정산 / 입고 / 출고 / 기타
    const category = form.get("category"); // 견적 / 계약 / 정산 / 창고 / 기타
    const amountRaw = form.get("amount") || "";
    const ref = (form.get("ref") || "").trim();   // 관련 현장/고객/거래처
    const tokenId = (form.get("tokenId") || "").trim(); // 토큰 ID(선택)
    const memo = (form.get("memo") || "").trim();

    const amount = Number(amountRaw.replace(/[^0-9]/g, ""));
    if (!amount) {
      alert("금액을 입력하세요.");
      return;
    }

    const newItem = {
      id: Date.now(),
      kind,
      category,
      amount,
      ref,
      tokenId,
      memo,
      createdAt: new Date().toLocaleString(),
    };

    setLedgerItems((prev) => [newItem, ...prev]);
    e.target.reset();
  };

  const formatMoney = (v) => (v ? Number(v).toLocaleString() : "0");

  const totalIn = ledgerItems
    .filter((i) => i.kind === "수금" || i.kind === "입고")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalOut = ledgerItems
    .filter((i) => i.kind === "지급" || i.kind === "출고")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="panel">
      <h2>📊 STO 기록(원장)</h2>
      <p className="panel-sub">
        계약, 정산, 현장 수금·지급, 창고 입·출고 등 모든 거래를
        &quot;토큰&quot;처럼 기록해 두는 원장입니다.
        지금은 수동으로 기록하고, 나중에 정산·계약·창고 화면과 자동 연동할 수 있습니다.
      </p>

      {/* 요약 */}
      <section className="ledger-section">
        <div className="ledger-summary">
          <div className="ledger-summary-item">
            <div className="label">총 수금(+입고)</div>
            <div className="value">+ {formatMoney(totalIn)} 원</div>
          </div>
          <div className="ledger-summary-item">
            <div className="label">총 지급(+출고)</div>
            <div className="value">- {formatMoney(totalOut)} 원</div>
          </div>
          <div className="ledger-summary-item">
            <div className="label">순이익(단순)</div>
            <div className="value">
              {formatMoney(totalIn - totalOut)} 원
            </div>
          </div>
        </div>
      </section>

      {/* 입력 폼 */}
      <section className="ledger-section">
        <h3>1️⃣ STO 기록 추가</h3>

        <form className="ledger-form" onSubmit={handleAdd}>
          <div className="job-form-row">
            <div className="job-field">
              <label>구분</label>
              <select name="kind" defaultValue="수금">
                <option value="수금">수금(입금)</option>
                <option value="지급">지급(출금)</option>
                <option value="계약">계약</option>
                <option value="정산">정산</option>
                <option value="입고">입고</option>
                <option value="출고">출고</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div className="job-field">
              <label>분류</label>
              <select name="category" defaultValue="정산">
                <option value="견적">견적</option>
                <option value="계약">계약</option>
                <option value="정산">정산</option>
                <option value="창고">창고(입·출고)</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div className="job-field">
              <label>금액</label>
              <input
                type="text"
                name="amount"
                placeholder="예: 8712000"
              />
            </div>
          </div>

          <div className="job-form-row">
            <div className="job-field">
              <label>관련 현장 / 거래처 / 고객</label>
              <input
                type="text"
                name="ref"
                placeholder="예: 최순호 / 회기힐스테이트 105동 803호"
              />
            </div>
            <div className="job-field">
              <label>토큰 ID(선택)</label>
              <input
                type="text"
                name="tokenId"
                placeholder="예: STO-2025-000001"
              />
            </div>
          </div>

          <div className="job-form-row">
            <div className="job-field full">
              <label>메모</label>
              <input
                type="text"
                name="memo"
                placeholder="예: 5/15 잔금 수금 / 도매처 대금 지급 / 창고 입고 등"
              />
            </div>
          </div>

          <div className="job-form-actions">
            <button type="submit" className="primary-btn">
              STO 기록 추가
            </button>
          </div>
        </form>
      </section>

      {/* 기록 목록 */}
      <section className="ledger-section">
        <h3>2️⃣ STO 기록 내역</h3>

        {ledgerItems.length === 0 && (
          <p className="empty-text">
            아직 STO 기록이 없습니다. 위에서 거래 내역을 등록해 주세요.
          </p>
        )}

        {ledgerItems.map((item) => (
          <div key={item.id} className="ledger-item">
            <div className="ledger-main">
              <div className="ledger-kind">
                <span className={`badge badge-${item.kind}`}>
                  {item.kind}
                </span>
                <span className="ledger-category">[{item.category}]</span>
              </div>
              <div className="ledger-amount">
                {item.kind === "지급" || item.kind === "출고" ? "- " : "+ "}
                {formatMoney(item.amount)} 원
              </div>
            </div>
            <div className="ledger-sub">
              {item.ref && <span>현장/거래처: {item.ref}</span>}
              {item.tokenId && <span> / 토큰ID: {item.tokenId}</span>}
            </div>
            {item.memo && (
              <div className="ledger-memo">메모: {item.memo}</div>
            )}
            <div className="ledger-date">{item.createdAt}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default LedgerView;
