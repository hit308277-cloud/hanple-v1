import React, { useState } from "react";
import CalendarView from "./CalendarView";
import TaskChat from "./TaskChat";
import "./styles.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("calendar"); // 'calendar' | 'chat' | 'site'
  const [showRightPanel, setShowRightPanel] = useState(true);

  return (
    <div className="app-root">
      {/* 상단 바 */}
      <header className="app-topbar">
        <div className="topbar-left">
          <span className="brand-main">HANPLE</span>
          <span className="brand-sub">한플 업무 ERP v1.0</span>
        </div>
        <div className="topbar-center">
          <span className="topbar-info">
            로컬 테스트용 — 현재는 수동 입력 / 더미데이터, 추후 한톡·STO
            연동
          </span>
        </div>
        <div className="topbar-right">
          <button
            type="button"
            className="btn-outline small"
            onClick={() => setShowRightPanel((prev) => !prev)}
          >
            {showRightPanel ? "오른쪽 패널 접기" : "오른쪽 패널 펼치기"}
          </button>
        </div>
      </header>

      {/* 전체 레이아웃 */}
      <div className="app-layout">
        {/* 왼쪽: 기능 선택 (HTS 느낌) */}
        <nav className="app-sidebar">
          <div className="sidebar-title">기능 선택 (HTS 편의 화면)</div>

          <button
            type="button"
            className={
              "sidebar-tab" + (activeTab === "calendar" ? " active" : "")
            }
            onClick={() => setActiveTab("calendar")}
          >
            📅 달력 일정
            <span className="sidebar-tab-sub">전체 현장 일정을 한눈에</span>
          </button>

          <button
            type="button"
            className={
              "sidebar-tab" + (activeTab === "chat" ? " active" : "")
            }
            onClick={() => setActiveTab("chat")}
          >
            💬 업무톡(한톡)
            <span className="sidebar-tab-sub">
              카카오톡처럼 쓰는 현장 업무 채팅
            </span>
          </button>

          <button
            type="button"
            className={
              "sidebar-tab" + (activeTab === "site" ? " active" : "")
            }
            onClick={() => setActiveTab("site")}
          >
            🏠 SITE / 홈케어
            <span className="sidebar-tab-sub">
              우리집관리·AS·필터교체 등 홈케어 관리
            </span>
          </button>

          <div className="sidebar-tip">
            ➕ 나중에 &quot;도매관리&quot;, &quot;정산&quot;,
            &quot;STO계약&quot; 등 탭을 더 추가할 수 있습니다.
          </div>
        </nav>

        {/* 가운데 + 오른쪽: 컨텐츠 영역 */}
        <main
          className={
            "app-main-area" + (showRightPanel ? " with-right" : " no-right")
          }
        >
          {activeTab === "calendar" && <CalendarView />}

          {activeTab === "chat" && (
            <div className="placeholder-center">
              <div className="placeholder-title">업무톡(한톡) 화면 자리</div>
              <p>
                여기에는 카카오톡 스타일 채팅 + 거래처 자동등록 + 일정연동
                화면이 들어갑니다.
              </p>
              <p>기능 설계는 유지하고, UI만 나중에 단계적으로 붙이면 됩니다.</p>
            </div>
          )}

          {activeTab === "site" && (
            <div className="placeholder-center">
              <div className="placeholder-title">SITE / 홈케어 화면 자리</div>
              <p>
                우리집관리, 필터교체 알림, AS 요청, 계약서 보관 등 홈케어용
                기능이 이 탭에 들어갑니다.
              </p>
              <p>현재는 뼈대만 두고, 추후 기능을 하나씩 추가하면 됩니다.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
