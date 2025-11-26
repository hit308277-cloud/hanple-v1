// src/CalendarView.jsx
import React, { useState, useEffect } from "react";

// YYYY-MM-DD → Date
function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(y, m, d) {
  const mm = String(m + 1).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarView({
  selectedDate,
  jobs,
  onChangeDate,
  onSelectJob,
}) {
  const baseDate = parseDate(selectedDate);
  const [viewYear, setViewYear] = useState(baseDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(baseDate.getMonth());

  // 날짜 바뀌면 달력 월도 맞춰주기
  useEffect(() => {
    const d = parseDate(selectedDate);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }, [selectedDate]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=일요일

  const handlePrevMonth = () => {
    const newMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const newYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    setViewYear(newYear);
    setViewMonth(newMonth);
    // 날짜도 첫째 날로 이동
    onChangeDate(formatDate(newYear, newMonth, 1));
  };

  const handleNextMonth = () => {
    const newMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const newYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    setViewYear(newYear);
    setViewMonth(newMonth);
    onChangeDate(formatDate(newYear, newMonth, 1));
  };

  const selected = parseDate(selectedDate);

  const cells = [];
  // 앞쪽 빈칸
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="cal-cell cal-empty" />);
  }
  // 날짜 칸
  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected =
      selected.getFullYear() === viewYear &&
      selected.getMonth() === viewMonth &&
      selected.getDate() === d;

    const dateStr = formatDate(viewYear, viewMonth, d);

    cells.push(
      <button
        key={d}
        className={
          "cal-cell cal-day" + (isSelected ? " cal-day-selected" : "")
        }
        onClick={() => onChangeDate(dateStr)}
      >
        {d}
      </button>
    );
  }

  // 요일
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="left-panel">
      <h1 className="app-title">HANPLE ERP</h1>
      <p className="app-subtitle">달력 · 현장 선택 (카톡 방 목록 역할)</p>

      <div className="calendar-card">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <span>
            {viewYear}년 {viewMonth + 1}월
          </span>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>

        <div className="calendar-weekdays">
          {weekdays.map((w) => (
            <div key={w} className="cal-cell cal-weekday">
              {w}
            </div>
          ))}
        </div>

        <div className="calendar-grid">{cells}</div>
      </div>

      <div className="job-list-wrapper">
        <div className="job-list-header">
          <span>
            {selectedDate.replace(/-/g, ".")} 현장 목록 ({jobs.length}건)
          </span>
          <span className="job-list-hint">제목을 클릭하면 오른쪽에 상세 한톡이 열립니다.</span>
        </div>

        {jobs.length === 0 ? (
          <div className="job-list-empty">
            아직 등록된 현장이 없습니다.  
            오른쪽 한톡에서 새 현장을 등록하세요.
          </div>
        ) : (
          <ul className="job-list">
            {jobs.map((job) => (
              <li key={job.id}>
                <button
                  className="job-list-item"
                  onClick={() => onSelectJob(job.id)}
                >
                  {/* 카톡 방 이름 느낌 */}
                  <div className="job-title-line">{job.title}</div>
                  <div className="job-subline">
                    머리: {job.head.toLocaleString()} / 손발:{" "}
                    {job.hands.toLocaleString()} / 기타:{" "}
                    {job.extra.toLocaleString()}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
