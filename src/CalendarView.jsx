function CalendarView() {
  return (
    <>
      <div className="section-title-row">
        <div>
          <div className="section-title">일정 / 시공현장</div>
          <div className="section-sub">
            캘린더에서 날짜를 누르면 각 현장별 선배관·제품설치·AS 일정이 보이는 구조로
            설계합니다.
          </div>
        </div>
        <button className="btn btn-primary">새 일정 등록</button>
      </div>

      <div className="card-grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">오늘 일정</div>
            <span className="card-sub">시공팀과 공유되는 스케줄</span>
          </div>
          <ul className="list-simple">
            <li>
              <span>09:00 · 천안 두정역푸르지오 · 선배관</span>
              <span className="badge-status badge-gray">진행 예정</span>
            </li>
            <li>
              <span>13:30 · 광명 철산도덕파크 · 제품설치</span>
              <span className="badge-status badge-gray">진행 예정</span>
            </li>
            <li>
              <span>16:00 · 마곡 힐스테이트 · AS</span>
              <span className="badge-status badge-gray">대기</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">가까운 일정</div>
          </div>
          <ul className="list-simple">
            <li>
              <span>내일 · 평택 고덕신도시 · 올인원 5대</span>
              <span>선배관</span>
            </li>
            <li>
              <span>모레 · 수원 광교 · 상가 냉난방</span>
              <span>현장 미팅</span>
            </li>
            <li>
              <span>3일 뒤 · 인천 송도 · 오피스텔</span>
              <span>제품설치</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CalendarView;
