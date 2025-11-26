// src/SettlementView.jsx
const defaultSettlement = {
  totalAmount: "",
  cardAmount: "",
  cashAmount: "",
  bankAmount: "",
  vatType: "포함", // 포함 / 별도
  cashReceipt: false,
  taxInvoice: false,
  memo: "",
  status: "정산대기", // 정산대기 / 정산완료
};

function ensureSettlement(job) {
  return job.settlement ? job.settlement : { ...defaultSettlement };
}

function SettlementView({ jobs, setJobs }) {
  // 정산 대상: 상태가 "시공완료" 또는 "정산완료"인 건
  const targets = jobs.filter(
    (j) => j.status === "시공완료" || j.status === "정산완료"
  );

  const updateSettlement = (jobId, field, value) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== jobId) return job;
        const current = ensureSettlement(job);
        const updated = { ...current, [field]: value };

        // 정산 상태에 따라 job.status도 바꿈
        const nextStatus =
          updated.status === "정산완료" ? "정산완료" : job.status;

        return {
          ...job,
          status: nextStatus,
          settlement: updated,
        };
      })
    );
  };

  const handleNumberChange = (jobId, field, raw) => {
    const value = raw.replace(/[^0-9]/g, ""); // 숫자만
    updateSettlement(jobId, field, value);
  };

  const formatMoney = (v) => {
    if (!v) return "";
    return Number(v).toLocaleString();
  };

  return (
    <div className="panel">
      <h2>💰 정산 관리</h2>
      <p className="panel-sub">
        시공 상태가 &quot;시공완료&quot;인 건이 이 화면에 나타납니다.
        건별로 총액 / 카드 / 현금 / 계좌이체 / 부가세 / 현금영수증 / 계산서 여부를 입력하고
        정산 상태를 &quot;정산완료&quot;로 변경합니다.
      </p>

      {targets.length === 0 && (
        <p className="empty-text">
          정산 대상 건이 없습니다. 일정 화면에서 상태를 &quot;시공완료&quot;로 변경하면 이곳에 표시됩니다.
        </p>
      )}

      {targets.map((job) => {
        const s = ensureSettlement(job);

        return (
          <div key={job.id} className="settle-card">
            <div className="settle-header">
              <div>
                <div className="settle-title">
                  <span className="job-date">
                    {job.date} {job.time && `(${job.time})`}
                  </span>
                  <span className="job-customer">
                    {job.customerName} / {job.phone || "연락처 미입력"}
                  </span>
                </div>
                <div className="settle-sub">
                  {job.address}
                </div>
                <div className="settle-sub">
                  브랜드: {job.brand} / 모델: {job.model || "미입력"} / 시공팀:{" "}
                  {job.team || "미지정"}
                </div>
              </div>
              <div>
                <select
                  className="settle-status-select"
                  value={s.status}
                  onChange={(e) =>
                    updateSettlement(job.id, "status", e.target.value)
                  }
                >
                  <option value="정산대기">정산대기</option>
                  <option value="정산완료">정산완료</option>
                </select>
              </div>
            </div>

            <div className="settle-body">
              <div className="settle-row">
                <div className="settle-field">
                  <label>총 거래금액</label>
                  <input
                    type="text"
                    value={formatMoney(s.totalAmount)}
                    onChange={(e) =>
                      handleNumberChange(job.id, "totalAmount", e.target.value)
                    }
                    placeholder="예: 8712000"
                  />
                </div>
                <div className="settle-field">
                  <label>카드결제</label>
                  <input
                    type="text"
                    value={formatMoney(s.cardAmount)}
                    onChange={(e) =>
                      handleNumberChange(job.id, "cardAmount", e.target.value)
                    }
                    placeholder="카드 결제액"
                  />
                </div>
                <div className="settle-field">
                  <label>현금</label>
                  <input
                    type="text"
                    value={formatMoney(s.cashAmount)}
                    onChange={(e) =>
                      handleNumberChange(job.id, "cashAmount", e.target.value)
                    }
                    placeholder="현금 수령액"
                  />
                </div>
                <div className="settle-field">
                  <label>계좌이체</label>
                  <input
                    type="text"
                    value={formatMoney(s.bankAmount)}
                    onChange={(e) =>
                      handleNumberChange(job.id, "bankAmount", e.target.value)
                    }
                    placeholder="계좌 입금액"
                  />
                </div>
              </div>

              <div className="settle-row">
                <div className="settle-field">
                  <label>부가세</label>
                  <select
                    value={s.vatType}
                    onChange={(e) =>
                      updateSettlement(job.id, "vatType", e.target.value)
                    }
                  >
                    <option value="포함">부가세 포함</option>
                    <option value="별도">부가세 별도(공급가+10%)</option>
                  </select>
                </div>
                <div className="settle-field checkbox-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={s.cashReceipt}
                      onChange={(e) =>
                        updateSettlement(job.id, "cashReceipt", e.target.checked)
                      }
                    />
                    현금영수증 발행
                  </label>
                </div>
                <div className="settle-field checkbox-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={s.taxInvoice}
                      onChange={(e) =>
                        updateSettlement(job.id, "taxInvoice", e.target.checked)
                      }
                    />
                    세금계산서 발행
                  </label>
                </div>
              </div>

              <div className="settle-row">
                <div className="settle-field full">
                  <label>정산 메모</label>
                  <textarea
                    rows={2}
                    value={s.memo}
                    onChange={(e) =>
                      updateSettlement(job.id, "memo", e.target.value)
                    }
                    placeholder="예: 63만 미입금 / 5/15 잔금 예정 / 사업자 계산서 발행 등"
                  />
                </div>
              </div>
            </div>

            <div className="settle-footer">
              <span className="settle-info">
                카드+현금+계좌 합계가 총 거래금액과 맞는지 정산자가 눈으로 확인합니다.
              </span>
              {s.status === "정산완료" && (
                <span className="settle-done-badge">
                  ✅ 이 건은 정산완료로 처리되었습니다.
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SettlementView;
