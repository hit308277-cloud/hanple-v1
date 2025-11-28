import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import WorkTalk from "./pages/WorkTalk";
import EstimateForm from "./pages/EstimateForm";
import Settings from "./pages/Settings";
function App(){
 return(<AppLayout><Routes>
 <Route path="/" element={<Home/>}/>
 <Route path="/calendar" element={<Calendar/>}/>
 <Route path="/worktalk" element={<WorkTalk/>}/>
 <Route path="/estimate/new" element={<EstimateForm/>}/>
 <Route path="/settings" element={<Settings/>}/>
 <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></AppLayout>);
}
export default App;