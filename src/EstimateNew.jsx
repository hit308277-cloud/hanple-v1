function EstimateNew() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">견적서 작성</div>
          <div className="card-sub">
            한 번 작성한 견적은 계약·정산·시공일정까지 한 번에 이어지는 구조입니다.
          </div>
        </div>
      </div>

      <div>
        <div className="form-row">
          <label className="form-label">고객명</label>
          <input className="form-input" placeholder="예: 최경남" />
        </div>
        <div className="form-row">
          <label className="form-label">연락처</label>
          <input className="form-input" placeholder="예: 010-1234-5678" />
        </div>
        <div className="form-row">
          <label className="form-label">현장 주소</label>
          <input
            className="form-input"
            placeholder="예: 천안시 서북구 두정역길 48 두정역푸르지오 107동 1105호"
          />
        </div>
        <div className="form-row">
          <label className="form-label">제품 / 평수</label>
          <input
            className="form-input"
            placeholder="예: LG 올인원 다배관 18평 + 6평 + 5평 / 4마력"
          />
        </div>
        <div className="form-row">
          <label className="form-label">총 견적 금액</label>
          <input className="form-input" placeholder="예: 5,280,000" />
        </div>
        <div className="form-row">
          <label className="form-label">시공 조건 / 메모</label>
          <textarea
            className="form-textarea"
            placeholder="인테리어 포함 2일 공사, 도급(공사비) 150만, 앵글 15만 별도, 전기공사 10~30만 별도 등"
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
          <button className="btn btn-outline" onClick={() => window.history.back()}>
            취소
          </button>
          <button className="btn btn-primary">견적 저장</button>
        </div>
      </div>
    </div>
  );
}

export default EstimateNew;
