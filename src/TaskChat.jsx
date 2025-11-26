// src/TaskChat.jsx
import { useState } from "react";

const INIT_ESTIMATE = {
  customerName: "",
  phone: "",
  address: "",
  brand: "LG",
  model: "",
  quantity: "1",
  unitPrice: "",
  supplyAmount: "",
  vatType: "포함", // 포함 / 별도
  memo: "",
};

function TaskChat({ estimates, setEstimates }) {
  // ===== 안전장치: props 가 안 넘어와도 터지지 않게 =====
  const safeEstimates = Array.isArray(estimates) ? estimates : [];
  const safeSetEstimates =
    typeof setEstimates === "function" ? setEstimates : () => {};

  const [activeTab, setActiveTab] = useState("chat"); // chat | estimate
  const [estimate, setEstimate] = useState(INIT_ESTIMATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstimate((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name, raw) => {
    const value = raw.replace(/[^0-9]/g, "");
    setEstimate((prev) => ({ ...prev, [name]: value }));
  };

  const supply =
    estimate.supplyAmount && estimate.supplyAmount !== ""
      ? Number(estimate.supplyAmount)
      : estimate.unitPrice && estimate.quantity
      ? Number(estimate.unitPrice) * Number(estimate.quantity)
      : 0;

  const vat =
    estimate.vatType === "별도" && supply
      ? Math.round(supply * 0.1)
      : 0;

  const total = supply + vat;

  const handleSaveEstimate = () => {
    if (!estimate.customerName || !estimate.address || !supply) {
      alert("고객명, 주소, 공급가(또는 단가·수량)는 필수입니다.");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...estimate,
      supply,
      vat,
      total,
      status: "견적", // 견적 / 계약완료 / 취소
      createdAt: new Date().toLocaleString(),
    };

    safeSetEstimates((prev) => [newItem, ...(Array.isArray(prev) ? prev : [])]);
    setEstimate(INIT_ESTIMATE);
    alert("견적서가 저장되었습니다. (📄 계약/견적관리 메뉴에서 계약 처리 가능)");
  };

  const formatMoney = (v) => (v ? Number(v).toLocaleString() : "");

  return (
    <div className="panel task-panel">
      <div className="task-header">
        <h2>💬 한톡(업무톡)</h2>
        <p className="panel-sub">
          왼쪽은 일반 카톡처럼 대화, 오른쪽은 &quot;견적서 작성&quot; 탭에서
          소비자 견적을 바로 만들 수 있는 구조입니다. (지금은 뼈대 버전)
        </p>
      </div>

      {/* 탭 버튼 */}
      <div className="task-tabs">
        <button
          className={activeTab === "chat" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("chat")}
        >
          채팅 화면
        </button>
        <button
          className={activeTab === "estimate" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("estimate")}
        >
          🧾 견적서 작성
        </button>
      </div>

      {/* 채팅 탭 */}
      {activeTab === "chat" && (
        <div className="chat-placeholder">
          <p>
            여기는 카카오톡처럼 대화가 오가는 &quot;한톡&quot; 화면 자리입니다.
            실제 카톡 연동은 서버·API 연결 후 구현할 수 있고,
            지금은 견적/일정/정산 구조부터 먼저 잡는 단계입니다.
          </p>
          <ul className="bullet-list">
            <li>거래처가 카톡으로 문의 → 한톡에 자동 등록</li>
            <li>대화 내용·주소·사진을 읽어서 견적 추천 (AI 연동 예정)</li>
            <li>아래 견적 아이콘을 눌러 바로 견적서 작성</li>
          </ul>
        </div>
      )}

      {/* 견적 탭 */}
      {activeTab === "estimate" && (
        <div className="estimate-layout">
          {/* 왼쪽: 견적 입력폼 */}
          <div className="estimate-form">
            <h3>🧾 견적서 작성</h3>

            <div className="job-form-row">
              <div className="job-field">
                <label>고객명</label>
                <input
                  type="text"
                  name="customerName"
                  value={estimate.customerName}
                  onChange={handleChange}
                  placeholder="예: 최순호"
                />
              </div>
              <div className="job-field">
                <label>연락처</label>
                <input
                  type="tel"
                  name="phone"
                  value={estimate.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            <div className="job-form-row">
              <div className="job-field full">
                <label>주소</label>
                <input
                  type="text"
                  name="address"
                  value={estimate.address}
                  onChange={handleChange}
                  placeholder="아파트 / 동 / 호수까지 입력"
                />
              </div>
            </div>

            <div className="job-form-row">
              <div className="job-field">
                <label>브랜드</label>
                <select
                  name="brand"
                  value={estimate.brand}
                  onChange={handleChange}
                >
                  <option value="LG">LG</option>
                  <option value="삼성">삼성</option>
                  <option value="캐리어">캐리어</option>
                  <option value="위니아">위니아</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div className="job-field">
                <label>제품모델 / 구성</label>
                <input
                  type="text"
                  name="model"
                  value={estimate.model}
                  onChange={handleChange}
                  placeholder="예: 18평+6평+5평 / 4마력"
                />
              </div>
            </div>

            <div className="job-form-row">
              <div className="job-field">
                <label>수량</label>
                <input
                  type="text"
                  name="quantity"
                  value={estimate.quantity}
                  onChange={(e) =>
                    handleNumberChange("quantity", e.target.value)
                  }
                />
              </div>
              <div className="job-field">
                <label>단가(선택)</label>
                <input
                  type="text"
                  name="unitPrice"
                  value={formatMoney(estimate.unitPrice)}
                  onChange={(e) =>
                    handleNumberChange("unitPrice", e.target.value)
                  }
                  placeholder="도매가+마진 포함 단가"
                />
              </div>
              <div className="job-field">
                <label>공급가(직접 입력 시 단가×수량 대신 사용)</label>
                <input
                  type="text"
                  name="supplyAmount"
                  value={formatMoney(estimate.supplyAmount)}
                  onChange={(e) =>
                    handleNumberChange("supplyAmount", e.target.value)
                  }
                  placeholder="예: 8712000"
                />
              </div>
            </div>

            <div className="job-form-row">
              <div className="job-field">
                <label>부가세</label>
                <select
                  name="vatType"
                  value={estimate.vatType}
                  onChange={handleChange}
                >
                  <option value="포함">부가세 포함</option>
                  <option value="별도">부가세 별도(공급가+10%)</option>
                </select>
              </div>
            </div>

            <div className="job-form-row">
              <div className="job-field full">
                <label>비고 / 메모</label>
                <textarea
                  name="memo"
                  value={estimate.memo}
                  onChange={handleChange}
                  rows={2}
                  placeholder="포함/불포함 공사, 전기·도배·보양, 추가비 별도 안내 등"
                />
              </div>
            </div>

            <div className="job-form-actions">
              <button
                type="button"
                className="primary-btn"
                onClick={handleSaveEstimate}
              >
                🧾 견적서 저장
              </button>
            </div>
          </div>

          {/* 오른쪽: 미리보기 + 저장 목록 */}
          <div className="estimate-preview">
            <h3>📄 견적서 미리보기</h3>
            {supply === 0 ? (
              <p className="empty-text">
                공급가(또는 단가·수량)를 입력하면 자동으로 금액이 계산됩니다.
              </p>
            ) : (
              <div className="estimate-box">
                <p>
                  <strong>고객명:</strong> {estimate.customerName || "-"} /{" "}
                  <strong>연락처:</strong> {estimate.phone || "-"}
                </p>
                <p>
                  <strong>주소:</strong> {estimate.address || "-"}
                </p>
                <p>
                  <strong>브랜드/모델:</strong> {estimate.brand} /{" "}
                  {estimate.model || "-"}
                </p>
                <p>
                  <strong>수량:</strong> {estimate.quantity || "1"} 대
                </p>
                <p>
                  <strong>공급가:</strong> {formatMoney(supply)} 원
                </p>
                <p>
                  <strong>부가세:</strong>{" "}
                  {estimate.vatType === "별도"
                    ? `${formatMoney(vat)} 원`
                    : "포함"}
                </p>
                <p>
                  <strong>총 견적금액:</strong> {formatMoney(total)} 원
                </p>
                {estimate.memo && (
                  <p>
                    <strong>비고:</strong> {estimate.memo}
                  </p>
                )}
              </div>
            )}

            <h4 style={{ marginTop: "12px" }}>💾 저장된 견적 내역</h4>
            {safeEstimates.length === 0 && (
              <p className="empty-text">
                아직 저장된 견적서가 없습니다. 견적서를 저장하면 이곳에 쌓입니다.
              </p>
            )}
            {safeEstimates.map((item) => (
              <div key={item.id} className="estimate-list-item">
                <div>
                  <strong>{item.customerName}</strong> / {item.address} /{" "}
                  {item.brand} {item.model}
                </div>
                <div>
                  총액: {formatMoney(item.total)}원 ({item.vatType}) / 상태:{" "}
                  {item.status}
                </div>
                <small>{item.createdAt}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskChat;
