import React from "react";

function buildMonth(year, month) {
  // month: 0~11
  const first = new Date(year, month, 1);
  const firstDay = first.getDay(); // 0:일
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks = [];
  let currentDay = 1 - firstDay; // 첫 주 시작

  while (currentDay <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (currentDay < 1 || currentDay > daysInMonth) {
        week.push(null);
      } else {
        week.push(currentDay);
      }
      currentDay++;
    }
    weeks.push(week);
  }

  return weeks;
}

function formatKey(year, month, day) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export default function CalendarView({ selectedDate, onSelectDate, jobsByDate }) {
  const [year, month] = selectedDate.split("-").map((v, i) => (i === 1 ? Number(v) - 1 : Number(v)));
  const currentYear = year;
  const currentMonth = month;

  const weeks = buildMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    const prev = new Date(currentYear, currentMonth - 1, 1);
    const y = prev.getFullYear();
    const m = String(prev.getMonth() + 1).padStart(2, "0");
    const d = "01";
    onSelectDate(`${y}-${m}-${d}`);
  };

  const handleNextMonth = () => {
    const next = new Date(currentYear, currentMonth + 1, 1);
    const y = next.getFullYear();
    const m = String(next.getMonth() + 1).padStart(2, "0");
    const d = "01";
    onSelectDate(`${y}-${m}-${d}`);
  };

  const [selYear, selMonth, selDay] = selectedDate.split("-").map(Number);

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button className="cal-nav-btn" onClick={handlePrevMonth}>
          ◀
        </button>
        <div className="calendar-title">
          {currentYear}년 {currentMonth + 1}월
        </div>
        <button className="cal-nav-btn" onClick={handleNextMonth}>
          ▶
        </button>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                if (!day) return <td key={di} />;
                const key = formatKey(currentYear, currentMonth, day);
                const hasJobs = jobsByDate[key] && jobsByDate[key].length > 0;
                const isSelected =
                  key ===
                  `${selYear}-${String(selMonth).padStart(2, "0")}-${String(selDay).padStart(
                    2,
                    "0"
                  )}`;

                return (
                  <td key={di}>
                    <button
                      className={`calendar-day-btn ${
                        isSelected ? "day-selected" : ""
                      } ${hasJobs ? "day-has-job" : ""}`}
                      onClick={() => onSelectDate(key)}
                    >
                      <span>{day}</span>
                      {hasJobs && <span className="day-dot" />}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="calendar-footer">
        선택된 날짜:{" "}
        <strong>
          {selYear}년 {selMonth}월 {selDay}일
        </strong>
        <br />
        이 날짜의 현장 수:{" "}
        <strong>{(jobsByDate[selectedDate] || []).length}건</strong>
      </div>
    </div>
  );
}
