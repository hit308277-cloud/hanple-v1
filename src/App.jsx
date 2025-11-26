// src/App.jsx
import { useState } from "react";
import CalendarView from "./CalendarView.jsx";
import TaskChat from "./TaskChat.jsx";

function App() {
  const [activeMenu, setActiveMenu] = useState("calendar"); // calendar | chat | settlement | settings

  return (
    <div className="app-root">
      {/* 상단 헤더 */}
      <header className="app-header">
        <div className="app-logo">
          {/* 로고 글자 / 나중에 이미지로 교체 가능 */}
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
          {activeMenu === "calendar" && <CalendarView />}
          {activeMenu === "chat" && <TaskChat />}

          {activeMenu === "settlement" && (
            <div className="placeholder">
              <h2>💰 정산 화면 (다음 단계에서 구현)</h2>
              <p>시공완료 건 정산 / 카드·현금·계좌 / 부가세 / 현금영수증 / 세금계산서 등을 여기에 넣습니다.</p>
            </div>
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
