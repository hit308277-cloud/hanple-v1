// src/CalendarView.jsx
import React, { useState, useMemo, useEffect } from "react";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

// 날짜 키 형식: 2025-11-28
function makeDateKey(year, monthIndex, day) {
  const y = year.toString();
  const m = (monthIndex + 1).toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 한 달 달력 셀 만들기
function buildMonthCells(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1);
  const firstWeekday = firstDay.getDay(); // 0 = 일요일
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(d);
  }
  return cells;
}

// 초기 예시 일정 (사용자 일정 추가용 구조 참고용)
const INITIAL_SCHEDULES = [
  {
    id: 1,
    dateKey: "2025-11-28",
    title: "한성/미입금 일지 천안 정대현",
    memo: "도급 160 + 도배 20 / 천안 현장",
    settlement: "예시 정산: 총 200만, 도급비 160만, 도배 20만, 기타 20만",
  },
  {
    id: 2,
    dateKey: "2025-11-28",
    title: "중앙/미입금 수원",
    memo: "수원 미입금 회수",
    settlement: "예시 정산: 미입금 300만 회수 예정",
  },
];

export default function CalendarView() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [monthIndex, setMonthIndex] = useState(today.getMonth());
  const [selectedDateKey, setSelectedDateKey] = useState(
    makeDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // 일정 목록 (달력 + 우측 패널에서 공통으로 사용)
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [activeScheduleId, setActiveScheduleId] = useState(
    INITIAL_SCHEDULES[0]?.id ?? null
  );

  // 새 일정 입력값
  const [newTitle, setNewTitle] = useState("");
  const [newMemo, setNewMemo] = useState("");
  const [newSettlement, setNewSettlement] = useState("");

  // 현재 달 셀
  const monthCells = useMemo(
    () => buildMonthCells(year, monthIndex),
    [year, monthIndex]
  );

  // 선택된 날짜의 일정들
  const schedulesForSelectedDate = useMemo(
    () => schedules.filter((s) => s.dateKey === selectedDateKey),
    [schedules, selectedDateKey]
  );

  // 날짜 바뀔 때, 해당 날짜에 일정이 있으면 첫 번째를 자동 선택
  useEffect(() => {
    if (schedulesForSelectedDate.length > 0) {
      setActiveScheduleId(schedulesForSelectedDate[0].id);
    } else {
      setActiveScheduleId(null);
    }
  }, [schedulesForSelectedDate]);

  const activeSchedule = schedulesForSelectedDate.find(
    (s) => s.id === activeScheduleId
  );

  // 이전/다음 달 이동
  const goPrevMonth = () => {
    if (monthIndex === 0) {
      setYear((y) => y - 1);
      setMonthIndex(11);
    } else {
      setMonthIndex((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (monthIndex === 11) {
      setYear((y) => y + 1);
      setMonthIndex(0);
    } else {
      setMonthIndex((m) => m + 1);
    }
  };

  // 날짜 클릭 시
  const handleDayClick = (day) => {
    if (!day) return;
    const key = makeDateKey(year, monthIndex, day);
    setSelectedDateKey(key);
  };

  // 새 일정 추가
  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: Date.now(),
      dateKey: selectedDateKey,
      title: newTitle.trim(),
      memo: newMemo.trim(),
      settlement: newSettlement.trim(),
    };

    setSchedules((prev) => [...prev, newItem]);
    setNewTitle("");
    setNewMemo("");
    setNewSettlement("");
    setActiveScheduleId(newItem.id);
  };

  // 날짜 key → 화면용 텍스트
  const selectedDateLabel = useMemo(() => {
    const [y, m, d] = selectedDateKey.split("-");
    return `${y}년 ${parseInt(m, 10)}월 ${parseInt(d, 10)}일`;
  }, [selectedDateKey]);

  // 특정 날짜에 일정이 있는지
  const hasSchedule = (day) => {
    if (!day) return false;
    const key = makeDateKey(year, monthIndex, day);
    return schedules.some((s) => s.dateKey === key);
  };

  return (
    <div className="calendar-page">
      {/* 상단 안내 영역 */}
      <div className="calendar-top-bar">
        <div className="calendar-top-title">한플 ERP – 일정·현장 관리</div>
        <div className="calendar-top-desc">
          날짜를 선택하고, 오른쪽에서 현장을 등록·조회·정산까지 관리합니다.
        </div>
      </div>

      <div className="calendar-layout">
        {/* 왼쪽: 달력 영역 */}
        <section className="calendar-main">
          <header className="calendar-header">
            <button
              type="button"
              className="calendar-nav-btn"
              onClick={goPrevMonth}
            >
              ◀
            </button>
            <div className="calendar-header-title">
              {year}년 {monthIndex + 1}월
            </div>
            <button
              type="button"
              className="calendar-nav-btn"
              onClick={goNextMonth}
            >
              ▶
            </button>
          </header>

          <div className="calendar-grid">
            {DAY_LABELS.map((label) => (
              <div key={label} className="calendar-day-label">
                {label}
              </div>
            ))}

            {monthCells.map((day, idx) => {
              const key = `${year}-${monthIndex}-${idx}`;
              const isSelected =
                day &&
                selectedDateKey === makeDateKey(year, monthIndex, day);
              const isToday =
                day &&
                makeDateKey(year, monthIndex, day) ===
                  makeDateKey(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );

              return (
                <button
                  key={key}
                  type="button"
                  className={[
                    "calendar-cell",
                    !day ? "calendar-cell-empty" : "",
                    isSelected ? "calendar-cell-selected" : "",
                    isToday ? "calendar-cell-today" : "",
                    hasSchedule(day) ? "calendar-cell-has-schedule" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleDayClick(day)}
                  disabled={!day}
                >
                  {day || ""}
                </button>
              );
            })}
          </div>
        </section>

        {/* 오른쪽: 일정/현장 패널 */}
        <aside className="schedule-panel">
          {/* 선택된 날짜 제목 */}
          <div className="schedule-date-header">
            <div className="schedule-date-title">{selectedDateLabel} 일정</div>
            <div className="schedule-date-sub">
              날짜별로 등록된 현장 목록을 클릭하면,
              아래에서 해당 현장의 메모·정산 정보를 따로 볼 수 있습니다.
            </div>
          </div>

          {/* 현장 목록 + 상세 보기 2단 구성 */}
          <div className="schedule-content">
            {/* 왼쪽: 현장 리스트 */}
            <div className="schedule-list">
              <div className="schedule-list-title">현장 목록</div>
              {schedulesForSelectedDate.length === 0 && (
                <div className="schedule-list-empty">
                  등록된 현장이 없습니다.
                </div>
              )}

              {schedulesForSelectedDate.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    "schedule-list-item",
                    item.id === activeScheduleId
                      ? "schedule-list-item-active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setActiveScheduleId(item.id)}
                >
                  <div className="schedule-list-item-title">{item.title}</div>
                  {item.memo && (
                    <div className="schedule-list-item-preview">
                      {item.memo.length > 30
                        ? `${item.memo.slice(0, 30)}…`
                        : item.memo}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* 오른쪽: 선택된 현장 상세 */}
            <div className="schedule-detail">
              <div className="schedule-detail-title">현장 상세 / 정산</div>

              {!activeSchedule && (
                <div className="schedule-detail-empty">
                  현장을 선택하면 이곳에 상세 정보와 정산 내용을 보여줍니다.
                </div>
              )}

              {activeSchedule && (
                <div className="schedule-detail-card">
                  <div className="schedule-detail-field">
                    <span className="schedule-detail-label">현장 제목</span>
                    <span className="schedule-detail-value">
                      {activeSchedule.title}
                    </span>
                  </div>

                  {activeSchedule.memo && (
                    <div className="schedule-detail-field">
                      <span className="schedule-detail-label">현장 메모</span>
                      <p className="schedule-detail-text">
                        {activeSchedule.memo}
                      </p>
                    </div>
                  )}

                  {activeSchedule.settlement && (
                    <div className="schedule-detail-field">
                      <span className="schedule-detail-label">정산 정보</span>
                      <p className="schedule-detail-text">
                        {activeSchedule.settlement}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 새 일정(현장) 추가 폼 */}
          <form className="schedule-form" onSubmit={handleAddSchedule}>
            <div className="schedule-form-title">새 현장 일정 추가</div>
            <div className="schedule-form-row">
              <label className="schedule-form-label">
                현장 제목
                <input
                  type="text"
                  className="schedule-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예) 천안 두정푸르지오 3대 설치"
                />
              </label>
            </div>

            <div className="schedule-form-row">
              <label className="schedule-form-label">
                현장 메모 / 공사 범위
                <textarea
                  className="schedule-textarea"
                  rows={3}
                  value={newMemo}
                  onChange={(e) => setNewMemo(e.target.value)}
                  placeholder="주소, 고객명, 공사 내용, 시간 등"
                />
              </label>
            </div>

            <div className="schedule-form-row">
              <label className="schedule-form-label">
                정산 메모
                <textarea
                  className="schedule-textarea"
                  rows={3}
                  value={newSettlement}
                  onChange={(e) => setNewSettlement(e.target.value)}
                  placeholder="상품금액, 공사비, 도급비, 마진, 미입금 등 정산 내역"
                />
              </label>
            </div>

            <div className="schedule-form-actions">
              <button type="submit" className="schedule-submit-btn">
                선택한 날짜에 현장 일정 추가
              </button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}
