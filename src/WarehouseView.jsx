function WarehouseView() {
  return (
    <>
      <div className="section-title-row">
        <div>
          <div className="section-title">창고 / 재고</div>
          <div className="section-sub">
            실외기 · 실내기 · 자재 재고를 단순 리스트로 먼저 보여주는 화면(샘플)입니다.
          </div>
        </div>
        <button className="btn btn-primary">입·출고 등록</button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">주요 재고</div>
        </div>
        <ul className="list-simple">
          <li>
            <span>LG 실외기 4마력</span>
            <span>재고 3대</span>
          </li>
          <li>
            <span>LG 실내기 18평</span>
            <span>재고 4대</span>
          </li>
          <li>
            <span>동배관 3/8 · 5/8 롤</span>
            <span>재고 5롤</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default WarehouseView;
