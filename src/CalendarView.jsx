import React, { useState } from "react";

// 날짜 비교용 헬퍼
function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// 더미 일정 데이터 (나중에 한톡/서버 연동 시 교체)
const SAMPLE_SCHEDULES = [
  {
    id: 1,
    date: "2025-11-26",
    title: "천안 두정푸르지오 107동 1105호",
    type: "설치",
    siteManager: "송정남",
    team: "김정래 팀",
    customerName: "최경남",
    phone: "010-9422-1268",
    address: "충남 천안시 서북구 두정역길 48, 두정역푸르지오 107동 1105호",
    product: "LG 올인원 다배관 4마력 (18+6+5평)",
    remoteCount: 3,
    schedule: {
      workDate: "2025-11-26",
      time: "오전 작업",
      status: "일정 확정",
    },
    extraCost: {
      angle: "15만 원",
      electric: "10~30만 원 별도",
    },
    memo: "인테리어 포함 2일 공사, 현금영수증 발행 요청",
  },
  {
    id: 2,
    date: "2025-11-26",
    title: "서울 강서구 염창동 e편한세상",
    type: "선배관",
    siteManager: "유OO",
    team: "박경민 팀",
    customerName: "김성범",
    phone: "010-2298-9632",
    address: "서울시 강서구 염창동 309, e편한세상 염창아파트",
    product: "삼성 무풍 4대 (18+6+5+5평)",
    remoteCount: 4,
    schedule: {
      workDate: "2025-11-26",
      time: "오후 작업",
      status: "선배관",
    },
    extraCost: {
      angle: "포함",
      electric: "별도 협의",
    },
    memo: "비닐 보양 필수, 세입자 시간 확인",
  },
];

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  // HTS 스타일: 섹션별 열기/닫기 상태
  const [openSections, setOpenSections] = useState({
    basic: true,
    install: true,
    schedule: true,
    media: false,
    docs: false,
    memo: true,
  });

  // 문자열을 Date 객체로 변환
  const parseDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  // 선택된 날짜의 일정 목록
  const schedulesForSelectedDate = SAMPLE_SCHEDULES.filter((item) =>
    isSameDate(parseDate(item.date), selectedDate)
  );

  const selectedSchedule =
    schedulesForSelectedDate.find((s) => s.id === selectedScheduleId) ||
    schedulesForSelectedDate[0] ||
    null;

  // 현재 달에 일정이 있는 날짜 체크
  const hasScheduleOnDate = (dateObj) =>
    SAMPLE_SCHEDULES.some((item) =>
      isSameDate(parseDate(item.date), dateObj)
    );

  // 달력용 날짜 리스트 생성
  const getDaysInMonthView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth(); // 0~11

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstWeekDay = firstDayOfMonth.getDay(); // 0(일)~6(토)
    const daysInMonth = lastDayOfMonth.getDate();

    const cells = [];
    // 앞쪽 빈 칸
    for (let i = 0; i < firstWeekDay; i++) {
      cells.push(null);
    }
    // 실제 날짜
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day));
    }
    return cells;
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDateClick = (dateObj) => {
    setSelectedDate(dateObj);
    const list = SAMPLE_SCHEDULES.filter((item) =>
      isSameDate(parseDate(item.date), dateObj)
    );
    setSelectedScheduleId(list[0]?.id ?? null);
  };

  const monthLabel = `${currentMonth.getFullYear()}년 ${
    currentMonth.getMonth() + 1
  }월`;

  return (
    <div className="calendar-layout">
      {/* 왼쪽: 달력 전체 영역 */}
      <div className="calendar-panel">
        <div className="calendar-header-row">
          <div className="calendar-month-nav">
            <button
              type="button"
              className="btn-month"
              onClick={handlePrevMonth}
            >
              ◀
            </button>
            <span className="calendar-month-label">{monthLabel}</span>
            <button
              type="button"
              className="btn-month"
              onClick={handleNextMonth}
            >
              ▶
            </button>
          </div>
          <div className="calendar-today-info">
            오늘 선택일{" "}
            <strong>
              {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{" "}
              {selectedDate.getDate()}일
            </strong>
          </div>
        </div>

        <div className="calendar-grid">
          <div className="calendar-week-header">
            <span>일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span>토</span>
          </div>

          <div className="calendar-days">
            {getDaysInMonthView().map((dateObj, idx) => {
              if (!dateObj) {
                return <div key={idx} className="calendar-day empty" />;
              }

              const isSelected = isSameDate(dateObj, selectedDate);
              const hasSchedule = hasScheduleOnDate(dateObj);

              return (
                <button
                  key={idx}
                  type="button"
                  className={[
                    "calendar-day",
                    isSelected ? "selected" : "",
                    hasSchedule ? "has-schedule" : "",
                  ]
                    .join(" ")
                    .trim()}
                  onClick={() => handleDateClick(dateObj)}
                >
                  <span className="day-number">{dateObj.getDate()}</span>
                  {hasSchedule && (
                    <span className="day-dot" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 오른쪽: HTS 스타일 상세 패널 */}
      <div className="detail-panel">
        <div className="detail-header">
          <div className="detail-title">
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{" "}
            {selectedDate.getDate()}일 일정
          </div>
          <div className="detail-sub">
            날짜를 클릭하면 해당 날짜의 현장 일정을 볼 수 있습니다.
          </div>
        </div>

        {/* 날짜별 일정 리스트 */}
        <div className="schedule-list-box">
          <div className="schedule-list-title">📋 일정 목록</div>
          {schedulesForSelectedDate.length === 0 ? (
            <div className="schedule-empty">
              등록된 일정이 없습니다. (추후 한톡/ERP 연동)
            </div>
          ) : (
            <ul className="schedule-list">
              {schedulesForSelectedDate.map((item) => (
                <li
                  key={item.id}
                  className={
                    "schedule-item" +
                    (item.id === selectedScheduleId ? " active" : "")
                  }
                  onClick={() => setSelectedScheduleId(item.id)}
                >
                  <div className="schedule-item-title">{item.title}</div>
                  <div className="schedule-item-meta">
                    {item.type} / {item.team} / {item.schedule.status}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 상세 정보 HTS 섹션 */}
        {selectedSchedule && (
          <div className="hts-sections">
            {/* 기본 정보 */}
            <div className="hts-section">
              <button
                type="button"
