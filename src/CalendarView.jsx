import React, { useState } from 'react';

export default function CalendarView() {
  const today = new Date().getDate();

  // 1~30일까지만 샘플로 사용 (나중에 실제 달력 로직으로 교체 가능)
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 선택된 날짜 & 일정 목록 상태
  const [selectedDay, setSelectedDay] = useState(today);
  const [events, setEvents] = useState({
    // 예시 데이터 (원하면 지워도 됩니다)
    26: [{ title: '천안 시스템에어컨 공사', memo: '3대 설치·선배관 포함' }],
  });

  const [newTitle, setNewTitle] = useState('');
  const [newMemo, setNewMemo] = useState('');

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  const handleAddEvent = () => {
    if (!newTitle.trim()) return;

    setEvents((prev) => {
      const current = prev[selectedDay] || [];
      return {
        ...prev,
        [selectedDay]: [...current, { title: newTitle, memo: newMemo }],
      };
    });

    setNewTitle('');
    setNewMemo('');
  };

  const dayEvents = events[selectedDay] || [];

  return (
    <div className="calendar-layout">
      {/* 왼쪽: 달력 본판 */}
      <div className="calendar-main">
        <div className="calendar-title-row">
          <h2 className="calendar-title">2025년 11월</h2>
          <span className="calendar-sub">날짜를 클릭하면 오른쪽에 일정이 열립니다.</span>
        </div>

        {/* 요일 헤더 */}
        <div className="calendar-week-header">
          {weekDays.map((w) => (
            <div key={w} className="calendar-week-cell">
              {w}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="calendar-grid">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              className={[
                'calendar-cell',
                day === today ? 'calendar-today' : '',
                day === selectedDay ? 'calendar-selected' : '',
              ].join(' ')}
              onClick={() => handleSelectDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* 오른쪽: HTS 스타일 일정 패널 */}
      <aside className="calendar-side">
        <div className="side-header">
          <div className="side-title">
            📌 {`11월 ${selectedDay}일 일정`}
          </div>
          <div className="side-desc">한플 ERP – 일정·현장 관리</div>
        </div>

        <div className="side-events">
          {dayEvents.length === 0 ? (
            <div className="side-empty">등록된 일정이 없습니다.</div>
          ) : (
            dayEvents.map((ev, idx) => (
              <div key={idx} className="side-event-card">
                <div className="event-title">• {ev.title}</div>
                {ev.memo && <div className="event-memo">{ev.memo}</div>}
              </div>
            ))
          )}
        </div>

        <div className="side-form">
          <div className="side-form-title">새 일정 추가</div>
          <input
            className="side-input"
            placeholder="예) 천안 두정푸르지오 3대 설치"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            className="side-textarea"
            placeholder="현장 메모, 공사 범위 등"
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
          />
          <button type="button" className="side-btn" onClick={handleAddEvent}>
            + 일정 저장
          </button>
        </div>
      </aside>
    </div>
  );
}
