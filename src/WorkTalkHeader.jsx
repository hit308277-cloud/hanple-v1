import { useNavigate } from "react-router-dom";

function WorkTalkHeader() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, background: "#f2f2f2" }}>
      <button onClick={() => navigate("/worktalk/estimate/new")}>
        견적서 작성
      </button>
    </div>
  );
}

export default WorkTalkHeader;
