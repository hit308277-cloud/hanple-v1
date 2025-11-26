// src/App.jsx
import { useState } from "react";
import CalendarView from "./CalendarView.jsx";
import TaskChat from "./TaskChat.jsx";
import SettlementView from "./SettlementView.jsx";
import WorkDoneView from "./WorkDoneView.jsx";
import ContractsView from "./ContractsView.jsx";
import WarehouseView from "./WarehouseView.jsx";
import CompanyView from "./CompanyView.jsx";
import LedgerView from "./LedgerView.jsx";

function App() {
  const [activeMenu, setActiveMenu] = useState("calendar");

  // 공통 데이터
  const [jobs, setJobs] = useState([]);          // 일정 / 시공완료 / 정산
  const [estimates, setEstimates] = useState([]); // 견적 / 계약
  const [inventory, setInventory] = useState({
    products: [],  // 제품 마스터
    movements: [], // 입·출고 내역
  });

  // 회사 / 직원 / 권한
  const [company, setCompany] = useState({
    name: "한성시스템에어컨(주)",
    bizNo: "",
    owner: "정성권",
    industry: "시스템에어컨 / 설비",
    address: "",
    plan: "무료", // 무료 / 유료-베이직 / 유료-프로
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "관리자",
      role: "대표",
      status: "재직", // 재직 / 퇴사
      permissions: {
        calendar: true,
        workdone: true,
        settlement: true,
        warehouse: true,
        contract: true,
        chat: true,
        blogWrite: true,   // 블로그 작성
        blogApprove: true, // 블로그 승인
      },
    },
  ]);

  // STO 원장(토큰 기록)
  const [ledgerItems, setLedgerItems] = useState([]);

  return (
    <div className="app-root">
      {/* 상단 헤더 */}
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-main">HANPLE</span>
          <span className="logo-sub">ERP v1.0</span>
        </div>
        <div className="app-header-right">
          <span className="app-company">{company.name}</span>
          <span className="app-user">관리자</span>
        </div>
      </header>

      <div className="app-body">
        {/* 왼쪽 메뉴 */}
        <nav className="app-sidebar">
          <button
            className={activeMenu === "calendar" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("calendar")}
          >
            📅 일정 / 시공현장
          </button>
          <button
            className={activeMenu === "workdone" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("workdone")}
          >
            ✅ 시공완료
          </button>
          <button
            className={activeMenu === "chat" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("chat")}
          >
            💬 한톡(견적)
          </button>
          <button
            className={activeMenu === "contracts" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("contracts")}
          >
            📄 계약 / 견적관리
          </button>
          <button
            className={activeMenu === "warehouse" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("warehouse")}
          >
            📦 창고 / 재고
          </button>
          <button
            className={activeMenu === "company" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("company")}
          >
            🏢 회사 / 직원·권한
          </button>
          <button
            className={activeMenu === "settlement" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("settlement")}
          >
            💰 정산
          </button>
          <button
            className={activeMenu === "ledger" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("ledger")}
          >
            📊 STO 기록(원장)
          </button>
          <button
            className={activeMenu === "settings" ? "nav-btn active" : "nav-btn"}
            onClick={() => setActiveMenu("settings")}
          >
            ⚙️ 설정
          </button>
        </nav>

        {/* 오른쪽 본문 */}
        <main className="app-content">
          {activeMenu === "calendar" && (
            <CalendarView jobs={jobs} setJobs={setJobs} />
          )}

          {activeMenu === "workdone" && (
            <WorkDoneView jobs={jobs} setJobs={setJobs} />
          )}

          {activeMenu === "chat" && (
            <TaskChat estimates={estimates} setEstimates={setEstimates} />
          )}

          {activeMenu === "contracts" && (
            <ContractsView
              estimates={estimates}
              setEstimates={setEstimates}
              jobs={jobs}
              setJobs={setJobs}
            />
          )}

          {activeMenu === "warehouse" && (
            <WarehouseView inventory={inventory} setInventory={setInventory} />
          )}

          {activeMenu === "company" && (
            <CompanyView
              company={company}
              setCompany={setCompany}
              employees={employees}
              setEmployees={setEmployees}
            />
          )}

          {activeMenu === "settlement" && (
            <SettlementView jobs={jobs} setJobs={setJobs} />
          )}

          {activeMenu === "ledger" && (
            <LedgerView
              ledgerItems={ledgerItems}
              setLedgerItems={setLedgerItems}
            />
          )}

          {activeMenu === "settings" && (
            <div className="placeholder">
              <h2>⚙️ 설정 화면 (추후 구현)</h2>
              <p>회사 정보, 직원 권한, 요금제, 브랜드 문구 등을 설정하는 화면입니다.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
// (예시) App.tsx 또는 Router.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import EstimateCreatePage from "./pages/EstimateCreatePage"; // 새로 만들 페이지

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기존 라우트들 */}
        {/* 예: <Route path="/worktalk" element={<WorkTalkPage />} /> */}

        {/* 👇 새로 추가 */}
        <Route path="/worktalk/estimate/new" element={<EstimateCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
