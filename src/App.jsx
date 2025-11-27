import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarView from "./CalendarView";
import CompanyView from "./CompanyView";
import ContractsView from "./ContractsView";
import EstimateCreatePage from "./EstimateCreatePage";
import EstimateNew from "./EstimateNew";
import LedgerView from "./LedgerView";
import SettlementView from "./SettlementView";
import TaskChat from "./TaskChat";
import WarehouseView from "./WarehouseView";
import WorkTalkPage from "./WorkTalkPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 기본 업무톡 메인 */}
        <Route path="/worktalk" element={<WorkTalkPage />} />

        {/* 견적서 작성페이지 */}
        <Route path="/worktalk/estimate/new" element={<EstimateNew />} />

        {/* 기존 페이지들 */}
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/company" element={<CompanyView />} />
        <Route path="/contracts" element={<ContractsView />} />
        <Route path="/estimate/create" element={<EstimateCreatePage />} />
        <Route path="/ledger" element={<LedgerView />} />
        <Route path="/settlement" element={<SettlementView />} />
        <Route path="/task" element={<TaskChat />} />
        <Route path="/warehouse" element={<WarehouseView />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
