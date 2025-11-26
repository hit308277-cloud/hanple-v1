// src/TaskChat.jsx
function TaskChat() {
  return (
    <div className="panel">
      <h2>💬 한톡(업무톡)</h2>
      <p>고객 / 시공팀 / 본사 / 도매점이 카카오톡처럼 대화하는 공간입니다.</p>
      <ul className="bullet-list">
        <li>고객 문의 → 자동으로 거래처 등록</li>
        <li>주소 / 사진 / 음성 인식 → 자동 견적 추천</li>
        <li>채팅 안에서 견적서 / 계약서 / 일정 생성 버튼 제공</li>
      </ul>
      <p>지금은 설명용 뼈대만 넣어두었고, 이후 실제 채팅 기능을 붙이면 됩니다.</p>
    </div>
  );
}

export default TaskChat;
