// src/CalendarView.jsx
import React, { useState } from "react";
import "./styles.css";

// 오늘 날짜
const today = new Date();
const THIS_YEAR = today.getFullYear();
const THIS_MONTH = today.getMonth() + 1; // 1~12

// 날짜 키 생성 함수 (2025-11-28 형태)
function makeDateKey(year, month, day) {
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

// 한 달 달력 셀 만들기
function buildMonth(year, month) {
  const first = new Date(year, month - 1, 1);
  const firstDay = first.getDay(); // 0(일)~6(토)
  const lastDay = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= lastDay; d++) {
    cells.push({
      label: d,
      dateKey: makeDateKey(year, month, d),
    });
  }
  return cells;
}

export default function CalendarView() {
  const [year] = useState(THIS_YEAR);
  const [month] = useState(THIS_MONTH);

  // 선택된 날짜, 선택된 현장
  const [selectedDate, setSelectedDate] = useState(
    makeDateKey(THIS_YEAR, THIS_MONTH, today.getDate())
  );
  const [selectedSiteId, setSelectedSiteId] = useState(null);

  // 날짜별 현장 정보 (일정 + 정산까지 모두 여기 들어감)
  const [sitesByDate, setSitesByDate] = useState({
    // 예시 데이터 1건 (원하시면 나중에 지워도 됩니다)
    [makeDateKey(THIS_YEAR, THIS_MONTH, today.getDate())]: [
      {
        id: "sample-1",
        title: "한성/미입금 엘지 천안 정대현",
        customer: "정대현",
        location: "천안시 두정동 푸르지오",
        memo: "도급 160 + 도배 20 / 배관, 보양 포함",
        settlement: "제품 560만 + 공사 200만 = 760만 (미입금 160만)",
      },
    ],
  });

  // 새 일정 입력용 상태 (제목 + 상세/정산 메모)
  const [newTitle, setNewTitle] = useState("");
  const [newDetail, setNewDetail] = useState("");

  const monthCells = buildMonth(year, month);
  const sitesForSelectedDate = sitesByDate[selectedDate] || [];

  const selectedSite =
    sitesForSelectedDate.find((site) => site.id === selectedSiteId) || null;

  // 날짜 클릭
  const handleDayClick = (cell) => {
    if (!cell) return;
    setSelectedDate(cell.dateKey);
    // 날짜 바꾸면 우측 상세는 비워두기
    setSelectedSiteId(null);
  };

  // 새 현장 추가
  const handleAddSite = () => {
    if (!newTitle.trim() && !newDetail.trim()) return;

    const id = `site-${Date.now()}`;
    const newSite = {
      id,
      title: newTitle.trim() || "제목 없는 현장",
      // 상세 내용 안에 정산까지 모두 적는 구조
      memo: newDetail.trim(),
    };

    setSitesByDate((prev) => {
      const list = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [...list, newSite],
      };
    });

    setNewTitle("");
    setNewDetail("");
    setSelectedSiteId(id); // 방금 등록한 현장을 바로 선택
  };

  return (
    <div className="calendar-page">
      {/* 상단 설명 영역 */}
      <div className="calendar-header-bar">
        <div>
          <strong>HANPLE ERP – 일정·현장 관리</strong>
        </div>
        <div className="calendar-header-sub">
          필요 기능만 열어서 보는 HTS 스타일 화면입니다. <br />
          왼쪽에서 날짜와 현장을 선택하면, 오른쪽에 해당 현장의 상세·정산
          정보만 표시됩니다.
        </div>
      </div>

      <div className="calendar-layout">
        {/* 왼쪽 : 달력 + 선택 날짜의 현장 리스트(제목만) */}
        <div className="calendar-left">
          <div className="month-header">
            {year}년 {month}월
          </div>

          <div className="month-grid">
            <div className="month-grid-header">일</div>
            <div className="month-grid-header">월</div>
            <div className="month-grid-header">화</div>
            <div className="month-grid-header">수</div>
            <div className="month-grid-header">목</div>
            <div className="month-grid-header">금</div>
            <div className="month-grid-header">토</div>

            {monthCells.map((cell, idx) => {
              if (!cell) {
                return <div key={idx} className="month-cell empty" />;
              }

              const isSelected = cell.dateKey === selectedDate;
              const hasSites = (sitesByDate[cell.dateKey] || []).length > 0;

              return (
                <button
                  key={cell.dateKey}
                  type="button"
                  className={
                    "month-cell day" +
                    (isSelected ? " selected" : "") +
                    (hasSites ? " has-sites" : "")
                  }
                  onClick={() => handleDayClick(cell)}
                >
                  <span>{cell.label}</span>
                </button>
              );
            })}
          </div>

          <div className="day-sites-panel">
            <div className="day-sites-title">
              {selectedDate} 일정 (현장 제목만 표시)
            </div>

            {sitesForSelectedDate.length === 0 && (
              <div className="day-sites-empty">
                아직 등록된 현장이 없습니다.
                <br />
                아래 입력창에 제목과 정산 내용을 적고
                <strong> [현장 등록] </strong>
                버튼을 눌러 등록하세요.
              </div>
            )}

            {sitesForSelectedDate.map((site) => (
              <button
                key={site.id}
                type="button"
                className={
                  "site-list-item" +
                  (site.id === selectedSiteId ? " site-list-item-selected" : "")
                }
                onClick={() => setSelectedSiteId(site.id)}
              >
                <div className="site-list-title">{site.title}</div>
              </button>
            ))}

            {/* 새 현장 입력 */}
            <div className="new-site-form">
              <div className="new-site-label">새 현장 추가</div>
              <input
                className="new-site-input"
                placeholder="예) 한성/미입금 엘지 천안 정대현"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="new-site-textarea"
                placeholder={
                  "현장 메모, 공사 범위, 정산 내역 등을 자유롭게 입력하세요.\n예) 도급 160 + 도배 20 / 미입금 160 / 자재·보양 포함"
                }
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
              />
              <button
                type="button"
                className="new-site-button"
                onClick={handleAddSite}
              >
                현장 등록
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 : 선택한 한 현장의 상세/정산 정보만 표시 */}
        <div className="calendar-right">
          <div className="site-detail-header">선택한 현장 상세 · 정산</div>

          {!selectedSite && (
            <div className="site-detail-empty">
              왼쪽에서 <strong>현장 제목</strong>을 클릭하면
              <br />
              이 영역에 해당 현장의 상세 정보와 정산 메모가 정리되어 표시됩니다.
            </div>
          )}

          {selectedSite && (
            <div className="site-detail-card">
              <div className="site-detail-title">{selectedSite.title}</div>

              <div className="site-detail-row">
                <span className="site-detail-label">날짜</span>
                <span className="site-detail-value">{selectedDate}</span>
              </div>

              {/* 필요하면 여기에 고객명, 주소, 금액 등을 필드로 더 추가해도 됩니다. */}
              {selectedSite.customer && (
                <div className="site-detail-row">
                  <span className="site-detail-label">고객</span>
                  <span className="site-detail-value">
                    {selectedSite.customer}
                  </span>
                </div>
              )}

              {selectedSite.location && (
                <div className="site-detail-row">
                  <span className="site-detail-label">현장 주소</span>
                  <span className="site-detail-value">
                    {selectedSite.location}
                  </span>
                </div>
              )}

              <div className="site-detail-section-title">현장 메모 · 정산 내용</div>
              <div className="site-detail-memo">
                {selectedSite.memo ? (
                  selectedSite.memo.split("\n").map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))
                ) : (
                  <p>입력된 메모가 없습니다.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
