// src/App.jsx
import { useState } from "react";
import CalendarView from "./CalendarView.jsx";
import TaskChat from "./TaskChat.jsx";
import SettlementView from "./SettlementView.jsx";

function App() {
  const [activeMenu, setActiveMenu] = useState("calendar"); // calendar | chat | settlement | settings

  // 한플 전체에서 공유하는 일정 목록
  const [jobs, setJobs] = useState([]); // CalendarView에서 생성, SettlementView에서 정산

  return (
    <div className="app-root">
      {/* 상단 헤더 */}
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-main">HANPLE</span>
          <span className="logo-sub">ERP v1.0</span>
        </div>
        <div className="app-header-right">
          <span className="app-company">한성시스템에어컨(주)</span>
          <span className="app-user">관리자</span>
        </div>
      </header>

      {/* 좌측 메뉴 + 우측 내용 영역 */}
      <div className="app-body">
        {/* 좌측 메뉴 */}
        <nav className="app-sidebar">
          <button
            className={activeMenu === "calendar" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("calendar")}
          >
            📅 일정 / 시공현장
          </button>
          <button
            className={activeMenu === "chat" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("chat")}
          >
            💬 업무톡(한톡)
          </button>
          <button
            className={activeMenu === "settlement" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("settlement")}
          >
            💰 정산
          </button>
          <button
            className={activeMenu === "settings" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("settings")}
          >
            ⚙️ 설정
          </button>
        </nav>

        {/* 우측 메인 내용 */}
        <main className="app-content">
          {activeMenu === "calendar" && (
            <CalendarView jobs={jobs} setJobs={setJobs} />
          )}

          {activeMenu === "chat" && <TaskChat />}

          {activeMenu === "settlement" && (
            <SettlementView jobs={jobs} setJobs={setJobs} />
          )}

          {activeMenu === "settings" && (
            <div className="placeholder">
              <h2>⚙️ 설정 화면 (다음 단계에서 구현)</h2>
              <p>회사 정보, 직원 권한, 도메인, 브랜드 문구, 유료/무료 설정 등을 여기에 넣습니다.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
