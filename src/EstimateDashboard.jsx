function EstimateDashboard() {
  return (
    <>
      <div className="section-title-row">
        <div>
          <div className="section-title">견적 관리</div>
          <div className="section-sub">
            상담에서 나온 견적을 한 눈에 확인하고, 계약으로 전환할 수 있는 화면입니다.
          </div>
        </div>
        <button className="btn btn-primary">새 견적 작성</button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">최근 견적 목록</div>
          <span className="card-sub">샘플 데이터</span>
        </div>
        <ul className="list-simple">
          <li>
            <span>최경남 · 천안 두정푸르지오 · LG 올인원 3대</span>
            <span className="badge-status badge-green">계약 진행중</span>
          </li>
          <li>
            <span>김OO · 광명 철산도덕파크 · 삼성 무풍 4대</span>
            <span className="badge-status badge-gray">견적 발송</span>
          </li>
          <li>
            <span>박OO · 마곡 힐스테이트 · 상가 냉난방</span>
            <span className="badge-status badge-gray">추가 상담</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default EstimateDashboard;
