// src/WarehouseView.jsx

// 창고 / 재고 관리 기본 뼈대
// - 제품 마스터 등록 (브랜드, 모델, 코드, 마력, 평수, 비고)
// - 입고/출고 기록
// - 현재 재고 수량 계산

const emptyProduct = {
  brand: "LG",
  model: "",
  code: "",
  spec: "",
  note: "",
};

const emptyMovement = {
  productCode: "",
  type: "입고", // 입고 / 출고
  qty: "",
  ref: "", // 관련 현장 또는 거래처
  memo: "",
};

function WarehouseView({ inventory, setInventory }) {
  const { products, movements } = inventory;

  // 제품 등록
  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const brand = form.get("brand") || "LG";
    const model = form.get("model")?.trim();
    const code = form.get("code")?.trim();
    const spec = form.get("spec")?.trim();
    const note = form.get("note")?.trim();

    if (!code || !model) {
      alert("제품코드와 모델명은 필수입니다.");
      return;
    }

    // 코드 중복 체크
    if (products.some((p) => p.code === code)) {
      alert("이미 등록된 제품코드입니다.");
      return;
    }

    const newProduct = {
      ...emptyProduct,
      brand,
      model,
      code,
      spec,
      note,
    };

    setInventory({
      products: [newProduct, ...products],
      movements,
    });

    e.target.reset();
  };

  // 입·출고 등록
  const handleAddMovement = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const productCode = form.get("productCode");
    const type = form.get("type") || "입고";
    const qtyRaw = form.get("qty") || "";
    const ref = form.get("ref")?.trim();
    const memo = form.get("memo")?.trim();

    const qty = Number(qtyRaw.replace(/[^0-9]/g, ""));

    if (!productCode || !qty) {
      alert("제품과 수량을 입력하세요.");
      return;
    }

    const product = products.find((p) => p.code === productCode);
    if (!product) {
      alert("존재하지 않는 제품입니다.");
      return;
    }

    const newMovement = {
      ...emptyMovement,
      productCode,
      type,
      qty,
      ref,
      memo,
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
    };

    setInventory({
      products,
      movements: [newMovement, ...movements],
    });

    e.target.reset();
  };

  // 제품별 현재 재고 계산
  const calcStock = (code) => {
    return movements.reduce((sum, m) => {
      if (m.productCode !== code) return sum;
      return sum + (m.type === "입고" ? m.qty : -m.qty);
    }, 0);
  };

  return (
    <div className="panel">
      <h2>📦 창고 / 재고 관리</h2>
      <p className="panel-sub">
        LG·삼성·캐리어 등 제품을 코드로 등록하고, 입고/출고를 기록하여
        현재 재고를 한눈에 보는 기본 뼈대입니다.
        (나중에 도매점·현장과 자동연동 예정)
      </p>

      {/* 제품 등록 */}
      <section className="warehouse-section">
        <h3>1️⃣ 제품 마스터 등록</h3>
        <form className="warehouse-form" onSubmit={handleAddProduct}>
          <div className="job-form-row">
            <div className="job-field">
              <label>브랜드</label>
              <select name="brand" defaultValue="LG">
                <option value="LG">LG</option>
                <option value="삼성">삼성</option>
                <option value="캐리어">캐리어</option>
                <option value="위니아">위니아</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div className="job-field">
              <label>제품코드</label>
              <input
                type="text"
                name="code"
                placeholder="예: MNV0720C2W.AKM"
              />
            </div>
            <div className="job-field">
              <label>모델명 / 구성</label>
              <input
                type="text"
                name="model"
                placeholder="예: 18평+6평+5평 / 4마력"
              />
            </div>
          </div>

          <div className="job-form-row">
            <div className="job-field">
              <label>규격(마력/평수 등)</label>
              <input
                type="text"
                name="spec"
                placeholder="예: 4마력 / 18+6+5+5"
              />
            </div>
            <div className="job-field full">
              <label>비고</label>
              <input
                type="text"
                name="note"
                placeholder="예: 무풍신형 / 와이파이 / 실내기 4대 세트"
              />
            </div>
          </div>

          <div className="job-form-actions">
            <button type="submit" className="primary-btn">
              제품 등록
            </button>
          </div>
        </form>

        <div className="warehouse-list">
          <h4>📋 등록된 제품</h4>
          {products.length === 0 && (
            <p className="empty-text">아직 등록된 제품이 없습니다.</p>
          )}
          {products.map((p) => (
            <div key={p.code} className="warehouse-product">
              <div>
                <strong>{p.brand}</strong> / {p.model}
              </div>
              <div className="warehouse-sub">
                코드: {p.code} / 규격: {p.spec || "-"}
              </div>
              {p.note && (
                <div className="warehouse-sub">비고: {p.note}</div>
              )}
              <div className="warehouse-stock">
                현재 재고: {calcStock(p.code)} 대
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 입·출고 기록 */}
      <section className="warehouse-section">
        <h3>2️⃣ 입고 / 출고 기록</h3>
        <form className="warehouse-form" onSubmit={handleAddMovement}>
          <div className="job-form-row">
            <div className="job-field">
              <label>제품</label>
              <select name="productCode" defaultValue="">
                <option value="">선택하세요</option>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.brand} / {p.model} ({p.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="job-field">
              <label>구분</label>
              <select name="type" defaultValue="입고">
                <option value="입고">입고</option>
                <option value="출고">출고</option>
              </select>
            </div>
            <div className="job-field">
              <label>수량</label>
              <input type="text" name="qty" placeholder="예: 1" />
            </div>
          </div>

          <div className="job-form-row">
            <div className="job-field">
              <label>관련 현장 / 거래처</label>
              <input
                type="text"
                name="ref"
                placeholder="예: 최순호 / 회기힐스테이트 105동 803호"
              />
            </div>
            <div className="job-field full">
              <label>메모</label>
              <input
                type="text"
                name="memo"
                placeholder="예: 11/4 선배관용 출고 / 도매창고 입고 등"
              />
            </div>
          </div>

          <div className="job-form-actions">
            <button type="submit" className="primary-btn">
              입·출고 등록
            </button>
          </div>
        </form>

        <div className="warehouse-list">
          <h4>📜 입·출고 내역</h4>
          {movements.length === 0 && (
            <p className="empty-text">아직 입·출고 기록이 없습니다.</p>
          )}
          {movements.map((m) => {
            const p = products.find((p) => p.code === m.productCode);
            return (
              <div key={m.id} className="warehouse-move">
                <div>
                  <strong>{m.type}</strong> {m.qty}대 /{" "}
                  {p ? `${p.brand} ${p.model}` : m.productCode}
                </div>
                {m.ref && (
                  <div className="warehouse-sub">현장/거래처: {m.ref}</div>
                )}
                {m.memo && (
                  <div className="warehouse-sub">메모: {m.memo}</div>
                )}
                <small className="warehouse-date">{m.createdAt}</small>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default WarehouseView;
