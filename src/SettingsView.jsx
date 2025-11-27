function SettingsView() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">설정 / 회사정보</div>
          <div className="card-sub">
            한성시스템에어컨 · 중앙공조 등 여러 법인 정보를 한 곳에서 관리하는 화면(샘플)
            입니다.
          </div>
        </div>
      </div>

      <div>
        <div className="form-row">
          <label className="form-label">대표 회사명</label>
          <input className="form-input" defaultValue="한성시스템에어컨(주)" />
        </div>
        <div className="form-row">
          <label className="form-label">대표 전화번호</label>
          <input className="form-input" defaultValue="010-6410-3090" />
        </div>
        <div className="form-row">
          <label className="form-label">대표 이메일</label>
          <input className="form-input" defaultValue="his0828@daum.net" />
        </div>
        <div className="form-row">
          <label className="form-label">표시할 브랜드</label>
          <select className="form-select" defaultValue="hanple">
            <option value="hanple">HANPLE 한플</option>
            <option value="hansung">한성시스템에어컨</option>
            <option value="jungang">중앙공조</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
          <button className="btn btn-outline">취소</button>
          <button className="btn btn-primary">저장</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;
