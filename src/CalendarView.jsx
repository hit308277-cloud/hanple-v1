// src/CalendarView.jsx
function CalendarView() {
  return (
    <div className="panel">
      <h2>📅 한플 일정 / 시공현장</h2>
      <p>여기에 달력, 일정목록, 시공팀 배정, 일정 수정/복사/삭제 기능이 들어갑니다.</p>
      <ul className="bullet-list">
        <li>상담 → 계약 완료 건을 자동으로 일정에 등록</li>
        <li>날짜 선택 후 시공팀 지정, 시간, 메모 입력</li>
        <li>일정 변경 시 시공팀·상담사에게 자동 알림</li>
      </ul>
      <p>지금은 뼈대 상태이니, 이후 실제 달력 컴포넌트를 붙이면 됩니다.</p>
    </div>
  );
}

export default CalendarView;
