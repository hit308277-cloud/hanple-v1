// src/CalendarView.jsx
import React, { useState } from "react";

function getDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function CalendarView({ sitesByDate, onAddSite, onOpenSite }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [head, setHead] = useState("");
  const [labor, setLabor] = useState("");
  const [extra, setExtra] = useState("");

  const selectedKey = getDateKey(selectedDate);
  const siteList = sitesByDate[selectedKey] || [];

  const handlePrevMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonth(d);
  };

  const handleNextMonth = () => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonth(d);
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(d);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("현장 제목을 입력하세요.");
      return;
    }

    const newSite = {
      id: Date.now(),
      date: selectedKey,
      title: title.trim(),
      memo: memo.trim(),
      head: head,
      labor: labor,
      extra: extra,
    };

    onAddSite(newSite);

    // 입력값 초기화
    setTitle("");
    setMemo("");
    setHead("");
    setLabor("");
    setExtra("");
  };

  // 현재 달의 달력 데이터 생성
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0~11

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = firstDay.getDay(); // 0(일)~6(토)
  const daysInMonth = lastDay.getDate();

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  const selectedDateLabel = `${selectedDate.getFullYear()}년 ${
    selectedDate.getMonth() + 1
  }월 ${selectedDate.getDate()}일`;

  return (
    <div className="calendar-layout">
      {/* 좌측: 달력 + 새 현장 추가 폼 */}
      <section className="calendar-left">
        <header className="calendar-header">
          <div className="calendar-title">
            HANPLE ERP - 일정·현장 관리
          </div>
          <div className="calendar-month-nav">
            <button onClick={handlePrevMonth}>◀</button>
            <span>
              {year}년 {month + 1}월
            </span>
            <button onClick={handleNextMonth}>▶</button>
          </div>
        </header>

        <table className="calendar-table">
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((week, idx) => (
              <tr key={idx}>
                {week.map((day, idx2) => {
                  if (!day) {
                    return <td key={idx2} className="calendar-cell empty" />;
                  }
                  const dateKey = getDateKey(
                    new Date(year, month, day)
                  );
                  const hasSites = (sitesByDate[dateKey] || []).length > 0;
                  const isSelected =
                    dateKey === getDateKey(selectedDate);

                  return (
                    <td
                      key={idx2}
                      className={
                        "calendar-cell" +
                        (isSelected ? " calendar-cell-selected" : "") +
                        (hasSites ? " calendar-cell-has-sites" : "")
                      }
                      onClick={() => handleDayClick(day)}
                    >
                      <span className="day-number">{day}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="selected-date-box">
          <div className="selected-date-label">
            선택한 날짜: {selectedDateLabel}
          </div>
          <div className="selected-date-help">
            날짜를 선택한 뒤 아래에서 현장을 등록하세요.
          </div>
        </div>

        <form className="new-site-form" onSubmit={handleSubmit}>
          <h3 className="panel-title">새 현장 추가</h3>

          <label className="form-label">현장 제목</label>
          <input
            className="form-input"
            placeholder="예) 한성/미입금 엘지 천안 정대현"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="form-label">현장 메모</label>
          <textarea
            className="form-textarea"
            placeholder="현장 메모, 공사 범위, 주소, 연락처 등을 입력하세요."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />

          <div className="form-grid">
            <div>
              <label className="form-label">머리 (제품·자재)</label>
              <input
                type="number"
                className="form-input"
                value={head}
                onChange={(e) => setHead(e.target.value)}
                placeholder="예) 5,000,000"
              />
            </div>
            <div>
              <label className="form-label">손발 (인건비)</label>
              <input
                type="number"
                className="form-input"
                value={labor}
                onChange={(e) => setLabor(e.target.value)}
                placeholder="예) 2,000,000"
              />
            </div>
            <div>
              <label className="form-label">기타</label>
              <input
                type="number"
                className="form-input"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="예) 300,000"
              />
            </div>
          </div>

          <button type="submit" className="primary-btn">
            현장 저장
          </button>
        </form>
      </section>

      {/* 우측: 선택한 날짜의 현장 목록 (제목만) */}
      <section className="calendar-right">
        <h3 className="panel-title">
          {selectedDateLabel} 현장 목록
        </h3>
        <p className="right-panel-help">
          ● 카톡 방 리스트처럼, 제목만 보이고  
          ● 제목을 클릭하면 별도 상세 화면에서 메모·정산을 볼 수 있습니다.
        </p>

        {siteList.length === 0 ? (
          <div className="site-empty">
            아직 등록된 현장이 없습니다.
          </div>
        ) : (
          <ul className="site-list">
            {siteList.map((site) => (
              <li
                key={site.id}
                className="site-list-item"
                onClick={() => onOpenSite(site)}
              >
                <div className="site-title">{site.title}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
