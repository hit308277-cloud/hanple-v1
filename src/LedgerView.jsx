function LedgerView() {
  return (
    <>
      <div className="section-title-row">
        <div>
          <div className="section-title">계약 · 정산</div>
          <div className="section-sub">
            소비자 입금 · 시공팀 지급 · 마진을 한 눈에 보는 화면(샘플 구조)입니다.
          </div>
        </div>
        <button className="btn btn-outline">정산 내역 다운로드</button>
      </div>

      <div className="card-grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">오늘 정산 예정</div>
          </div>
          <ul className="list-simple">
            <li>
              <span>천안 두정푸르지오 · 소비자 입금</span>
              <strong>7,920,000원</strong>
            </li>
            <li>
              <span>광명 철산도덕파크 · 시공팀 지급</span>
              <strong>2,320,000원</strong>
            </li>
            <li>
              <span>마곡 힐스테이트 · 도매 대금</span>
              <strong>3,100,000원</strong>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">요약</div>
          </div>
          <ul className="list-simple">
            <li>
              <span>총 매출(부가세 포함)</span>
              <strong>18,200,000원</strong>
            </li>
            <li>
              <span>총 시공비 / 도급비</span>
              <strong>4,300,000원</strong>
            </li>
            <li>
              <span>예상 마진</span>
              <strong>3,200,000원</strong>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default LedgerView;
