import { useNavigate } from "react-router-dom";

function WorkTalkHeader() {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 18 }}>
      <div className="card" style={{ padding: 14 }}>
        <div className="card-header">
          <div>
            <div className="card-title">업무톡 · 견적 연동</div>
            <div className="card-sub">
              왼쪽은 카톡처럼 상담, 오른쪽에서는 바로 견적·계약·정산까지 이어집니다.
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/worktalk/estimate/new")}
          >
            견적서 작성
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkTalkHeader;
