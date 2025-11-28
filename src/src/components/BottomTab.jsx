import {NavLink} from "react-router-dom";
export default function BottomTab(){return(<nav>
<NavLink to="/">홈</NavLink>
<NavLink to="/calendar">달력</NavLink>
<NavLink to="/worktalk">업무톡</NavLink>
<NavLink to="/estimate/new">견적</NavLink>
<NavLink to="/settings">설정</NavLink>
</nav>);}