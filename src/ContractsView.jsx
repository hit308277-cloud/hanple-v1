// src/ContractsView.jsx

// 견적/계약 관리 화면
// - 한톡에서 저장한 estimates 를 받아서 한 번에 관리
// - 상태: 견적 / 계약완료 / 취소
// - "이 견적으로 일정 만들기" 버튼으로 일정(jobs)에 자동 등록

function ContractsView({ estimates, setEstimates, jobs, setJobs }) {
  const formatMoney = (v) =>
    v ? Number(v).toLocaleString() : "";

  const updateStatus = (id, status) => {
    setEstimates((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status }
          : e
      )
    );
  };

  const createJobFromEstimate = (estimate) => {
    if (!window.confirm("이 견적 내용으로 시공 일정을 생성할까요?")) return;

    const newJob = {
      id: Date.now(),
      date: "", // 날짜는 나중에 일정 화면에서 입력
      time: "",
      customerName: estimate.customerName,
      phone: estimate.phone,
      address: estimate.address,
      brand: estimate.brand,
      model: estimate.model,
      team: "",
      status: "시공예정",
      memo: estimate.memo || "",
      settlement: null,
      workDone: null,
    };

    setJobs((prev) => [newJob, ...prev]);
    updateStatus(estimate.id, "계약완료");
    alert("시공 일정 목록에 '시공예정' 건으로 추가되었습니다.");
  };

  return (
    <div className="panel">
      <h2>📄 계약 / 견적 관리</h2>
      <p className="panel-sub">
        한톡(견적)에서 저장한 견적서를 모아보고, 계약완료 / 취소 처리하거나
        바로 시공 일정을 생성할 수 있는 화면입니다.
      </p>

      {estimates.length === 0 && (
        <p className="empty-text">
          저장된 견적서가 없습니다. 먼저 💬 한톡(견적)에서 견적서를 저장해 주세요.
        </p>
      )}

      {estimates.map((e) => (
        <div key={e.id} className="contract-card">
          <div className="contract-header">
            <div>
              <div className="contract-title">
                <strong>{e.customerName}</strong> / {e.phone || "연락처 없음"}
              </div>
              <div className="contract-sub">
                {e.address}
              </div>
              <div className="contract-sub">
                {e.brand} / {e.model || "-"} / 수량 {e.quantity || 1}대
              </div>
              <div className="contract-sub">
                총액 {formatMoney(e.total)}원 ({e.vatType}) /{" "}
                <span className="contract-date">{e.createdAt}</span>
              </div>
            </div>
            <div>
              <select
                className="contract-status-select"
                value={e.status}
                onChange={(ev) => updateStatus(e.id, ev.target.value)}
              >
                <option value="견적">견적</option>
                <option value="계약완료">계약완료</option>
                <option value="취소">취소</option>
              </select>
            </div>
          </div>

          {e.memo && (
            <div className="contract-memo">
              메모: {e.memo}
            </div>
          )}

          <div className="contract-footer">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => createJobFromEstimate(e)}
            >
              이 견적으로 시공 일정 만들기
            </button>
            <span className="settle-info">
              일정은 📅 &quot;일정 / 시공현장&quot; 화면에서 날짜·시간·시공팀을 지정합니다.
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContractsView;
