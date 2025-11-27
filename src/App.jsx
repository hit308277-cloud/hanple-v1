import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import WorkTalkPage from "./WorkTalkPage";
import EstimateNew from "./EstimateNew";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (pathPrefix) => location.pathname.startsWith(pathPrefix);

  return (
    <div className="app-shell">
      {/* 사이드바 */}
      <aside className="app-sidebar">
        <div>
          <div className="app-logo">
            HANPLE
            <span className="app-logo-pill">ERP · 업무톡</span>
          </div>
        </div>

        <div>
          <div className="app-menu-group-title">업무</div>
          <div className="app-menu">
            <div
              className={`app-menu-item ${isActive("/worktalk") ? "active" : ""}`}
              onClick={() => navigate("/worktalk")}
            >
              <span>업무톡</span>
            </div>
            <div
              className={`app-menu-item ${isActive("/calendar") ? "active" : ""}`}
              onClick={() => alert("캘린더 화면은 추후 연결 예정입니다.")} // 자리만 잡기
            >
              <span>일정 / 시공현장</span>
            </div>
            <div
              className={`app-menu-item ${isActive("/ledger") ? "active" : ""}`}
              onClick={() => alert("정산 화면은 추후 연결 예정입니다.")}
            >
              <span>정산 / 매출</span>
            </div>
          </div>
        </div>

        <div>
          <div className="app-menu-group-title">설정</div>
          <div className="app-menu">
            <div
              className={`app-menu-item ${isActive("/settings") ? "active" : ""}`}
              onClick={() => alert("설정 화면은 추후 연결 예정입니다.")}
            >
              <span>설정 / 회사정보</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 메인 영역 */}
      <div className="app-main">
        {/* 헤더 */}
        <header className="app-header">
          <div className="app-header-title">
            {location.pathname.startsWith("/worktalk")
              ? "업무톡 (배민 스타일 한플)"
              : "HANPLE ERP"}
          </div>
          <div className="app-header-right">
            <span className="badge-pill">한성시스템에어컨(주)</span>
            <span>관리자 · 정성권</span>
          </div>
        </header>

        {/* 본문 */}
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <WorkTalkPage />
          </Layout>
        }
      />
      <Route
        path="/worktalk"
        element={
          <Layout>
            <WorkTalkPage />
          </Layout>
        }
      />
      <Route
        path="/worktalk/estimate/new"
        element={
          <Layout>
            <EstimateNew />
          </Layout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
