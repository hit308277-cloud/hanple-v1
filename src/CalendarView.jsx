import React, { useState } from "react";
import "./styles.css";

// 🔹 샘플 일정 데이터 (필요에 맞게 자유롭게 수정 가능)
const INITIAL_SCHEDULES = [
  {
    id: 1,
    date: "2025-11-28",
    title: "한성/미입금 일지 천안 정대현",
    location: "천안",
    summary: "11/28 도급160 + 도배20 천안",
    siteManager: "정대현",
    company: "한성시스템에어컨",
    type: "미입금 관리",
    memo: "천안 올인원 3대 설치 후 미입금 관리 필요",
    contractAmount: 1800000,
    materialCost: 900000,
    laborCost: 600000,
    etcCost: 100000,
    paidAmount: 0
  },
  {
    id: 2,
    date: "2025-11-28",
    title: "한성/미입금 일지 인천",
    location: "인천 현장",
    summary: "인천현장 미입금 관리",
    siteManager: "현장소장 김OO",
    company: "한성시스템에어컨",
    type: "미입금 관리",
    memo: "실내기 4대, 실외기 4마력 설치 완료",
    contractAmount: 2500000,
    materialCost: 1300000,
    laborCost: 900000,
    etcCost: 100000,
    paidAmount: 500000
  },
  {
    id: 3,
    date: "2025-11-28",
    title: "중앙/미입금 수원",
    location: "수원",
    summary: "수원 상가 미입금",
    siteManager: "송OO",
    company: "중앙공조",
    type: "미입금 관리",
    memo: "상가 공조기 설치 현장, 잔금 입금 요청 필요",
    contractAmount: 3200000,
    materialCost: 1500000,
    laborCost: 1200000,
    etcCost: 200000,
    paidAmount: 2000000
  }
];

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function CalendarView() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0~11
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);

  // ▶ 선택된 “현장 한 개”만 보여주기 위한 상태
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  // ▶ 새 일정 추가용 상태
  const [newTitle, setNewTitle] = useState("");
  const [newMemo, setNewMemo] = useState("");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0:일 ~ 6:토

  const weeks = [];
  let dayNum = 1 - firstDay;
  while (dayNum <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (dayNum < 1 || dayNum > daysInMonth) {
        week.push(null);
      } else {
        week.push(dayNum);
      }
      dayNum++;
    }
    weeks.push(week);
  }

  const handlePrevMonth = () => {
    let y = currentYear;
    let m = currentMonth - 1;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    setCurrentYear(y);
    setCurrentMonth(m);
  };

  const handleNextMonth = () => {
    let y = currentYear;
    let m = currentMonth + 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setCurrentYear(y);
    setCurrentMonth(m);
  };

  const handleSelectDate = (day) => {
    if (!day) return;
    const m = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    const newDate = `${currentYear}-${m}-${d}`;
    setSelectedDate(newDate);

    // 날짜 바꾸면, 그 날짜의 첫 번째 현장으로 자동 선택
    const daySchedules = schedules.filter((s) => s.date === newDate);
    setSelectedScheduleId(daySchedules.length > 0 ? daySchedules[0].id : null);
  };

  const schedulesForDate = schedules.filter(
    (s) => s.date === selectedDate
  );

  const selectedSchedule =
    schedulesForDate.find((s) => s.id === selectedScheduleId) ||
    schedulesForDate[0] ||
    null;

  const handleAddSchedule = () => {
    if (!newTitle.trim()) return;
    const nextId =
      schedules.reduce((max, s) => Math.max(max, s.id), 0) + 1;

    const newSchedule = {
      id: nextId,
      date: selectedDate,
      title: newTitle.trim(),
      location: "",
      summary: newMemo.trim(),
      siteManager: "",
      company: "",
      type: "일반 일정",
      memo: newMemo.trim(),
      contractAmount: 0,
      materialCost: 0,
      laborCost: 0,
      etcCost: 0,
      paidAmount: 0
    };

    const updated = [...schedules, newSchedule];
    setSchedules(updated);
    setNewTitle("");
    setNewMemo("");
    setSelectedScheduleId(newSchedule.id);
  };

  const monthLabel = `${currentYear}년 ${currentMonth + 1}월`;

  // 정산 계산
  const calcSettlement = (schedule) => {
    const totalCost =
      (schedule.materialCost || 0) +
      (schedule.laborCost || 0) +
      (schedule.etcCost || 0);
    const profit = (schedule.contractAmount || 0) - totalCost;
    const unpaid =
      (schedule.contractAmount || 0) - (schedule.paidAmount || 0);
    return { totalCost, profit, unpaid };
  };

  return (
    <div className="calendar-layout">
      {/* 왼쪽: 달력 */}
      <section className="calendar-panel">
        <header className="calendar-header">
          <div className="calendar-header-left">
            <button className="nav-btn" onClick={handlePrevMonth}>
              ◀
            </button>
            <span className="month-label">{monthLabel}</span>
            <button className="nav-btn" onClick={handleNextMonth}>
              ▶
            </button>
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
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => {
                  if (!day) return <td key={di} className="empty-cell" />;
                  const m = String(currentMonth + 1).padStart(2, "0");
                  const d = String(day).padStart(2, "0");
                  const dateStr = `${currentYear}-${m}-${d}`;
                  const hasSchedule = schedules.some(
                    (s) => s.date === dateStr
                  );
                  const isSelected = dateStr === selectedDate;
                  return (
                    <td
                      key={di}
                      className={
                        "day-cell" +
                        (isSelected ? " selected" : "") +
                        (hasSchedule ? " has-schedule" : "")
                      }
                      onClick={() => handleSelectDate(day)}
                    >
                      <span className="day-number">{day}</span>
                      {hasSchedule && <span className="day-dot">●</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 오른쪽: HTS 스타일 현장 리스트 + 상세/정산 */}
      <section className="detail-panel">
        <header className="detail-header">
          <div>
            <div className="detail-header-title">
              {selectedDate.replace(/-/g, ".")} 일정
            </div>
            <div className="detail-header-sub">
              한플 ERP – 일정·현장 관리
            </div>
          </div>
        </header>

        {/* 1) 현장 목록 (제목만 나열) */}
        <div className="schedule-list">
          {schedulesForDate.length === 0 ? (
            <div className="schedule-empty">
              선택된 날짜에 등록된 일정이 없습니다.
            </div>
          ) : (
            schedulesForDate.map((s) => (
              <button
                key={s.id}
                className={
                  "schedule-list-item" +
                  (s.id === selectedScheduleId ? " active" : "")
                }
                onClick={() => setSelectedScheduleId(s.id)}
              >
                <div className="schedule-list-title">{s.title}</div>
                {s.location && (
                  <div className="schedule-list-sub">{s.location}</div>
                )}
                {!s.location && s.summary && (
                  <div className="schedule-list-sub">{s.summary}</div>
                )}
              </button>
            ))
          )}
        </div>

        {/* 2) 선택된 현장 상세 + 정산 */}
        {selectedSchedule && (
          <div className="schedule-detail-card">
            <div className="schedule-detail-header">
              <div className="schedule-detail-title">
                {selectedSchedule.title}
              </div>
              {selectedSchedule.location && (
                <div className="schedule-detail-location">
                  {selectedSchedule.location}
                </div>
              )}
            </div>

            <div className="schedule-detail-body">
              <div className="detail-row">
                <span className="detail-label">회사</span>
                <span className="detail-value">
                  {selectedSchedule.company || "-"}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">현장 유형</span>
                <span className="detail-value">
                  {selectedSchedule.type || "-"}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">현장소장</span>
                <span className="detail-value">
                  {selectedSchedule.siteManager || "-"}
                </span>
              </div>
              {selectedSchedule.memo && (
                <div className="detail-row detail-memo">
                  <span className="detail-label">현장 메모</span>
                  <span className="detail-value">
                    {selectedSchedule.memo}
                  </span>
                </div>
              )}

              {/* 정산 영역 */}
              <div className="settlement-section">
                <div className="settlement-title">정산 요약</div>
                {(() => {
                  const { totalCost, profit, unpaid } =
                    calcSettlement(selectedSchedule);
                  return (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">계약금액</span>
                        <span className="detail-value">
                          {selectedSchedule.contractAmount.toLocaleString()}원
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">자재비</span>
                        <span className="detail-value">
                          {selectedSchedule.materialCost.toLocaleString()}원
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">인건비</span>
                        <span className="detail-value">
                          {selectedSchedule.laborCost.toLocaleString()}원
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">기타비용</span>
                        <span className="detail-value">
                          {selectedSchedule.etcCost.toLocaleString()}원
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">총 원가</span>
                        <span className="detail-value">
                          {totalCost.toLocaleString()}원
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">현재까지 입금</span>
                        <span className="detail-value">
                          {selectedSchedule.paidAmount.toLocaleString()}원
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">미입금</span>
                        <span className="detail-value unpaid">
                          {unpaid.toLocaleString()}원
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">예상 마진</span>
                        <span className="detail-value profit">
                          {profit.toLocaleString()}원
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* 3) 새 일정 추가 폼 */}
        <div className="new-schedule-section">
          <div className="new-schedule-title">새 일정 추가</div>
          <input
            className="new-schedule-input"
            placeholder="예) 천안 두정푸르지오 3대 설치"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            className="new-schedule-textarea"
            placeholder="현장 메모, 공사 범위 등"
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
          />
          <button className="add-schedule-btn" onClick={handleAddSchedule}>
            선택한 날짜에 일정 등록
          </button>
        </div>
      </section>
    </div>
  );
}
