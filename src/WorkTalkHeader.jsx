import { useNavigate } from "react-router-dom";

function WorkTalkHeader() {
  const navigate = useNavigate();

  return (
    <div className="worktalk-header">
      <button onClick={() => navigate("/worktalk/estimate/new")}>
        견적서 작성
      </button>
    </div>
  );
}

export default WorkTalkHeader;
