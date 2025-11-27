import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import WorkTalkPage from "./WorkTalkPage";
import EstimateNew from "./EstimateNew";
import CalendarView from "./CalendarView";
import EstimateDashboard from "./EstimateDashboard";
import LedgerView from "./LedgerView";
import WarehouseView from "./WarehouseView";
import SettingsView from "./SettingsView";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (pathPrefix) => location.pathname.startsWith(pathPrefix);

  const titleMap = () => {
    if (location.pathname.startsWith("/worktalk/estimate")) return "견적서 작성";
    if (location.pathname.startsWith("/worktalk")) return "업무톡";
    if (location.pathname.startsWith("/calendar")) return "일정 / 시공현장";
    if (location.pathname.startsWith("/estimate")) return "견적 관리";
    if (location.pathname.startsWith("/ledger")) return "계약 · 정산";
    if (location.pathname.startsWith("/warehouse")) return "창고 / 재고";
    if (location.pathname.startsWith("/settings")) return "설정";
    return "HANPLE ERP";
  };

  return (
    <div className="app-shell">
      {/* 왼쪽 사이드바 */}
      <aside className="app-sidebar">
        <div>
          <div className="app-logo">
            HANPLE
            <span className="app-logo-pill">배민 스타일 ERP</span>
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
              onClick={() => navigate("/calendar")}
            >
              <span>일정 / 시공현장</span>
            </div>
            <div
              className={`app-menu-item ${isActive("/estimate") ? "active" : ""}`}
              onClick={() => navigate("/estimate")}
            >
              <span>견적 관리</span>
            </div>
            <div
              className={`app-menu-item ${isActive("/ledger") ? "active" : ""}`}
              onClick={() => navigate("/ledger")}
            >
              <span>계약 · 정산</span>
            </div>
            <div
              className={`app-menu-item ${isActive("/warehouse") ? "active" : ""}`}
              onClick={() => navigate("/warehouse")}
            >
              <span>창고 / 재고</span>
            </div>
          </div>
        </div>

        <div>
          <div className="app-menu-group-title">관리</div>
          <div className="app-menu">
            <div
              className={`app-menu-item ${isActive("/settings") ? "active" : ""}`}
              onClick={() => navigate("/settings")}
            >
              <span>설정 / 회사정보</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 우측 메인 */}
      <div className="app-main">
        {/* 상단바 */}
        <header className="app-header">
          <div className="app-header-title">{titleMap()}</div>
          <div className="app-header-right">
            <span className="badge-pill">한성시스템에어컨(주)</span>
            <span>관리자 · 정성권</span>
          </div>
        </header>

        {/* 내용 */}
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
      <Route
        path="/calendar"
        element={
          <Layout>
            <CalendarView />
          </Layout>
        }
      />
      <Route
        path="/estimate"
        element={
          <Layout>
            <EstimateDashboard />
          </Layout>
        }
      />
      <Route
        path="/ledger"
        element={
          <Layout>
            <LedgerView />
          </Layout>
        }
      />
      <Route
        path="/warehouse"
        element={
          <Layout>
            <WarehouseView />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <SettingsView />
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
