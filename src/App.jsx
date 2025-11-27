import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkTalkPage from "./WorkTalkPage";
import EstimateNew from "./EstimateNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 진입 → 업무톡 */}
        <Route path="/" element={<WorkTalkPage />} />
        <Route path="/worktalk" element={<WorkTalkPage />} />

        {/* 견적서 작성 페이지 */}
        <Route path="/worktalk/estimate/new" element={<EstimateNew />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
