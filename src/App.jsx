// src/App.jsx
import React, { useState } from "react";
import CalendarView from "./CalendarView";
import TaskChat from "./TaskChat";
import "./styles.css";

export default function App() {
  // 날짜별 현장 데이터
  // { "2025-11-28": [ { id, date, title, memo, head, labor, extra } ] }
  const [sitesByDate, setSitesByDate] = useState({});

  // 상단 탭: calendar | chat | settlement
  const [activeTab, setActiveTab] = useState("calendar");

  // 상세 화면 모드: list(일정 목록) | detail(현장 하나만 보기)
  const [viewMode, setViewMode] = useState("list");
  const [selectedSite, setSelectedSite] = useState(null);

  // 현장 추가
  const handleAddSite = (site) => {
    setSitesByDate((prev) => {
      const next = { ...prev };
      const list = next[site.date] ? [...next[site.date]] : [];
      list.push(site);
      next[site.date] = list;
      return next;
    });
  };

  // 현장 상세 열기 (카톡 방 들어가는 느낌)
  const handleOpenSite = (site) => {
    setSelectedSite(site);
    setViewMode("detail");
  };

  // 현장 상세에서 뒤로가기
  const handleBackToList = () => {
    setSelectedSite(null);
    setViewMode("list");
  };

  // 상세 화면에서 메모/정산 수정 (같은 세션 안에서만 유지)
  const handleUpdateSelectedSite = (updatedSite) => {
    setSelectedSite(updatedSite);
    // 목록에도 반영
    setSitesByDate((prev) => {
      const next = { ...prev };
      const list = next[updatedSite.date] ? [...next[updatedSite.date]] : [];
      const idx = list.findIndex((s) => s.id === updatedSite.id);
      if (idx !== -1) {
        list[idx] = updatedSite;
        next[updatedSite.date] = list;
      }
      return next;
    });
  };

  // 정산 요약용 데이터 펼치기
  const settlementRows = Object.entries(sitesByDate)
    .sort(([d1], [d2]) => (d1 > d2 ? 1 : -1))
    .flatMap(([date, list]) =>
      list.map((site) => ({
        date,
        title: site.title,
        head: Number(site.head || 0),
        labor: Number(site.labor || 0),
        extra: Number(site.extra || 0),
        total:
          Number(site.head || 0) +
          Number(site.labor || 0) +
          Number(site.extra || 0),
      }))
    );

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-area">
          <span className="logo-text-main">HANPLE ERP</span>
          <span className="logo-text-sub"> 현장 일정·한톡·정산 관리 v1.0</span>
        </div>

        <nav className="top-tabs">
          <button
            className={
              "top-tab-btn" + (activeTab === "calendar" ? " top-tab-btn-active" : "")
            }
            onClick={() => {
              setActiveTab("calendar");
              setViewMode("list");
            }}
          >
            달력 일정
          </button>
          <button
            className={
              "top-tab-btn" + (activeTab === "chat" ? " top-tab-btn-active" : "")
            }
            onClick={() => {
              setActiveTab("chat");
              setViewMode("list");
            }}
          >
            한톡(업무톡)
          </button>
          <button
            className={
              "top-tab-btn" + (activeTab === "settlement" ? " top-tab-btn-active" : "")
            }
            onClick={() => {
              setActiveTab("settlement");
              setViewMode("list");
            }}
          >
            정산 요약
          </button>
        </nav>
      </header>

      <main className="app-main">
        {/* 1) 달력 탭 */}
        {activeTab === "calendar" && viewMode === "list" && (
          <CalendarView
            sitesByDate={sitesByDate}
            onAddSite={handleAddSite}
            onOpenSite={handleOpenSite}
          />
        )}

        {/* 2) 달력 → 현장 상세 화면 (카톡 방 처럼) */}
        {activeTab === "calendar" && viewMode === "detail" && selectedSite && (
          <SiteDetailView
            site={selectedSite}
            onBack={handleBackToList}
            onUpdate={handleUpdateSelectedSite}
          />
        )}

        {/* 3) 한톡(업무톡) 탭 */}
        {activeTab === "chat" && (
          <TaskChat />
        )}

        {/* 4) 정산 요약 탭 */}
        {activeTab === "settlement" && (
          <SettlementSummary rows={settlementRows} />
        )}
      </main>
    </div>
  );
}

/**
 * 현장 상세 화면 (제목 클릭했을 때 나오는 별도 화면)
 * - 왼쪽: 현장 메모
 * - 오른쪽: 정산(머리/손발/기타/합계)
 */
function SiteDetailView({ site, onBack, onUpdate }) {
  const [localSite, setLocalSite] = useState(site);

  const handleChange = (field, value) => {
    const updated = { ...localSite, [field]: value };
    setLocalSite(updated);
    onUpdate(updated);
  };

  const head = Number(localSite.head || 0);
  const labor = Number(localSite.labor || 0);
  const extra = Number(localSite.extra || 0);
  const total = head + labor + extra;

  return (
    <div className="detail-container">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ← 일정 목록으로
        </button>
        <div className="detail-title-area">
          <div className="detail-date">{localSite.date}</div>
          <div className="detail-title">{localSite.title}</div>
        </div>
      </div>

      <div className="detail-body">
        {/* 메모 영역 */}
        <section className="detail-panel">
          <h3 className="panel-title">현장 메모</h3>
          <textarea
            className="memo-textarea"
            placeholder="현장 메모, 공사 범위, 특이사항 등을 입력하세요."
            value={localSite.memo || ""}
            onChange={(e) => handleChange("memo", e.target.value)}
          />
        </section>

        {/* 정산 영역 */}
        <section className="detail-panel">
          <h3 className="panel-title">정산 (머리 / 손발 분리)</h3>

          <div className="settlement-row">
            <label>머리 (제품·자재 / 도급 총금액 등)</label>
            <input
              type="number"
              className="settlement-input"
              value={localSite.head || ""}
              onChange={(e) => handleChange("head", e.target.value)}
              placeholder="예) 5,000,000"
            />
          </div>

          <div className="settlement-row">
            <label>손발 (인건비, 설치팀 공사비)</label>
            <input
              type="number"
              className="settlement-input"
              value={localSite.labor || ""}
              onChange={(e) => handleChange("labor", e.target.value)}
              placeholder="예) 2,000,000"
            />
          </div>

          <div className="settlement-row">
            <label>기타 (추가비용, 잡비 등)</label>
            <input
              type="number"
              className="settlement-input"
              value={localSite.extra || ""}
              onChange={(e) => handleChange("extra", e.target.value)}
              placeholder="예) 300,000"
            />
          </div>

          <div className="settlement-total-box">
            <div>합계</div>
            <div className="settlement-total-amount">
              {total.toLocaleString()} 원
            </div>
          </div>

          <p className="settlement-hint">
            * 머리·손발을 분리해서 기록해 두면 나중에 STO·배당 설계할 때
            자동 계산 기준으로 사용할 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}

/**
 * 정산 요약 탭
 * 날짜·제목·머리·손발·합계만 간단히 테이블로 보여줌
 */
function SettlementSummary({ rows }) {
  return (
    <div className="summary-container">
      <h2 className="summary-title">정산 요약</h2>
      <p className="summary-subtitle">
        달력에 등록한 현장들의 머리·손발·합계 금액을 간단히 확인하는 화면입니다.
      </p>

      {rows.length === 0 ? (
        <div className="summary-empty">
          아직 등록된 현장이 없습니다. 달력 탭에서 현장을 먼저 추가하세요.
        </div>
      ) : (
        <table className="summary-table">
          <thead>
            <tr>
              <th>일자</th>
              <th>현장 제목</th>
              <th>머리</th>
              <th>손발</th>
              <th>기타</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.date}</td>
                <td>{row.title}</td>
                <td>{row.head.toLocaleString()} 원</td>
                <td>{row.labor.toLocaleString()} 원</td>
                <td>{row.extra.toLocaleString()} 원</td>
                <td className="summary-total-cell">
                  {row.total.toLocaleString()} 원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
