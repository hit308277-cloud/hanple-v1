// src/CalendarView.jsx
import React, { useState, useEffect } from "react";
import "./styles.css";

// 🔹 샘플 데이터 (원하시면 나중에 실제 현장 데이터로 수정)
const INITIAL_SITES = [
  {
    id: 1,
    date: "2025-11-28",
    title: "한성/미입금 엘지 천안 정대현",
    customer: "정대현",
    address: "천안시 두정동 푸르지오",
    memo: "도급 160 + 도배 20 / 배관·보양 포함",
    settlement: "제품 560만 + 공사 200만 = 760만 (미입금 160만)",
  },
  {
    id: 2,
    date: "2025-11-28",
    title: "중앙/미입금 수원 상가",
    customer: "상가주인 김OO",
    address: "수원시 영통구 상가 현장",
    memo: "공조기 설치 후 잔금 미입금. 미입금 300만.",
    settlement: "총 1,200만 중 900만 입금, 300만 미입금",
  },
];

function getTodayKey() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// year: 2025, monthIndex: 0~11
function buildMonth(year, monthIndex) {
  const cells = [];
  const firstDay = new Date(year, monthIndex, 1).getDay(); // 0=일
  const lastDate = new Date(year, monthIndex + 1, 0).getDate();

  // 앞에 비는 칸(null)
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  // 실제 날짜들
  for (let d = 1; d <= lastDate; d++) {
    const monthNumber = monthIndex + 1;
    const m = String(monthNumber).padStart(2, "0");
    const dayStr = String(d).padStart(2, "0");
    const dateKey = `${year}-${m}-${dayStr}`;
    cells.push({ day: d, dateKey });
  }

  return cells;
}

export default function CalendarView() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [monthIndex, setMonthIndex] = useState(today.getMonth()); // 0~11
  const [selectedDate, setSelectedDate] = useState(getTodayKey());

  // 🔹 전체 현장 목록 (날짜별로 필터해서 사용)
  const [sites, setSites] = useState(INITIAL_SITES);

  // 🔹 어떤 현장(제목)을 클릭했는지
  const [selectedSiteId, setSelectedSiteId] = useState(null);

  // 🔹 새 현장 추가용 입력값
  const [newTitle, setNewTitle] = useState("");
  const [newMemo, setNewMemo] = useState("");

  // 월 달력 셀
  const monthCells = buildMonth(year, monthIndex);

  // 선택한 날짜의 현장들
  const sitesForSelectedDate = sites.filter(
    (site) => site.date === selectedDate
  );

  // 선택된 현장 1개 (카톡에서 현재 채팅방 같은 개념)
  const selectedSite =
    sitesForSelectedDate.find((s) => s.id === selectedSiteId) || null;

  // 날짜를 바꾸면, 선택된 현장 초기화
  useEffect(() => {
    setSelectedSiteId(null);
  }, [selectedDate]);

  const handlePrevMonth = () => {
    if (monthIndex === 0) {
      setYear((y) => y - 1);
      setMonthIndex(11);
    } else {
      setMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex === 11) {
      setYear((y) => y + 1);
      setMonthIndex(0);
    } else {
      setMonthIndex((m) => m + 1);
    }
  };

  const handleDayClick = (cell) => {
    if (!cell) return;
    setSelectedDate(cell.dateKey);
  };

  const handleAddSite = () => {
    if (!newTitle.trim() && !newMemo.trim()) return;

    const newId = Date.now();
    const newSite = {
      id: newId,
      date: selectedDate,
      title: newTitle.trim() || "제목 없는 현장",
      memo: newMemo.trim(),
      settlement: "",
    };

    setSites((prev) => [...prev, newSite]);
    setNewTitle("");
    setNewMemo("");
    setSelectedSiteId(newId);
  };

  const monthLabel = `${year}년 ${monthIndex + 1}월`;

  return (
    <div className="hp-calendar-root">
      {/* 상단 설명 */}
      <div className="hp-top-bar">
        <div className="hp-top-title">HANPLE ERP – 일정·현장 관리</div>
        <div className="hp-top-sub">
          왼쪽은 날짜와 현장 제목 목록, 오른쪽은 선택한 현장의 상세/정산입니다.
          <br />
          키움증권 HTS, 카카오톡처럼{" "}
          <strong>제목을 클릭했을 때만 상세 화면이 열리는 구조</strong>입니다.
        </div>
      </div>

      <div className="hp-layout">
        {/* 🔹 왼쪽 : 달력 + 해당 날짜 현장 제목 목록 */}
        <section className="hp-left">
          {/* 달력 헤더 */}
          <div className="hp-month-header">
            <button
              type="button"
              className="hp-month-nav"
              onClick={handlePrevMonth}
            >
              ◀
            </button>
            <span className="hp-month-label">{monthLabel}</span>
            <button
              type="button"
              className="hp-month-nav"
              onClick={handleNextMonth}
            >
              ▶
            </button>
          </div>

          {/* 달력 */}
          <div className="hp-month-grid">
            <div className="hp-month-grid-header">일</div>
            <div className="hp-month-grid-header">월</div>
            <div className="hp-month-grid-header">화</div>
            <div className="hp-month-grid-header">수</div>
            <div className="hp-month-grid-header">목</div>
            <div className="hp-month-grid-header">금</div>
            <div className="hp-month-grid-header">토</div>

            {monthCells.map((cell, idx) => {
              if (!cell) {
                return <div key={idx} className="hp-day-cell hp-empty" />;
              }

              const isSelected = cell.dateKey === selectedDate;
              const hasSites = sites.some((s) => s.date === cell.dateKey);

              return (
                <button
                  key={cell.dateKey}
                  type="button"
                  className={[
                    "hp-day-cell",
                    isSelected ? "hp-day-selected" : "",
                    hasSites ? "hp-day-has-sites" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleDayClick(cell)}
                >
                  <span className="hp-day-number">{cell.day}</span>
                </button>
              );
            })}
          </div>

          {/* 선택한 날짜의 현장 제목 리스트 */}
          <div className="hp-site-list-panel">
            <div className="hp-site-list-title">
              {selectedDate} 현장 목록 (제목만 표시)
            </div>

            {sitesForSelectedDate.length === 0 && (
              <div className="hp-site-list-empty">
                이 날짜에는 아직 등록된 현장이 없습니다.
              </div>
            )}

            <ul className="hp-site-list">
              {sitesForSelectedDate.map((site) => (
                <li
                  key={site.id}
                  className={[
                    "hp-site-item",
                    site.id === selectedSiteId ? "hp-site-item-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setSelectedSiteId(site.id)}
                >
                  <div className="hp-site-item-title">{site.title}</div>
                </li>
              ))}
            </ul>

            {/* 새 현장 추가 폼 */}
            <div className="hp-new-site">
              <div className="hp-new-site-label">새 현장 추가</div>
              <input
                className="hp-new-site-input"
                placeholder="예) 한성/미입금 엘지 천안 정대현"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="hp-new-site-textarea"
                placeholder={
                  "현장 메모, 정산 메모 등을 자유롭게 입력하세요.\n예) 도급 160 + 도배 20 / 미입금 160 / 보양 포함"
                }
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
              />
              <button
                type="button"
                className="hp-new-site-button"
                onClick={handleAddSite}
              >
                선택한 날짜에 현장 등록
              </button>
            </div>
          </div>
        </section>

        {/* 🔹 오른쪽 : 선택한 한 현장의 상세 / 정산만 표시 (카톡 채팅창 역할) */}
        <section className="hp-right">
          <div className="hp-detail-header">선택한 현장 상세 · 정산</div>

          {!selectedSite && (
            <div className="hp-detail-empty">
              왼쪽에서 <strong>현장 제목</strong>을 클릭하면
              <br />
              이곳에 해당 현장의 상세 정보와 정산 메모가 표시됩니다.
            </div>
          )}

          {selectedSite && (
            <div className="hp-detail-card">
              <div className="hp-detail-title">{selectedSite.title}</div>

              <div className="hp-detail-row">
                <span className="hp-detail-label">날짜</span>
                <span className="hp-detail-value">{selectedSite.date}</span>
              </div>

              {selectedSite.customer && (
                <div className="hp-detail-row">
                  <span className="hp-detail-label">고객</span>
                  <span className="hp-detail-value">
                    {selectedSite.customer}
                  </span>
                </div>
              )}

              {selectedSite.address && (
                <div className="hp-detail-row">
                  <span className="hp-detail-label">주소</span>
                  <span className="hp-detail-value">
                    {selectedSite.address}
                  </span>
                </div>
              )}

              {selectedSite.memo && (
                <>
                  <div className="hp-detail-section-title">현장 메모</div>
                  <div className="hp-detail-memo">
                    {selectedSite.memo.split("\n").map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </>
              )}

              {selectedSite.settlement && (
                <>
                  <div className="hp-detail-section-title">정산 메모</div>
                  <div className="hp-detail-memo">
                    {selectedSite.settlement.split("\n").map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
