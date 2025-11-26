// src/TaskChat.jsx
import React, { useState } from "react";

const dummyRooms = [
  {
    id: 1,
    name: "한성 설치팀 단톡방",
    lastMessage: "내일 천안 현장 9시 출발입니다.",
  },
  {
    id: 2,
    name: "중앙 도매+설치 일정방",
    lastMessage: "12월 물량 발주 체크해주세요.",
  },
];

export default function TaskChat() {
  const [activeRoom, setActiveRoom] = useState(dummyRooms[0]);

  return (
    <div className="chat-layout">
      <section className="chat-left">
        <h3 className="panel-title">한톡(업무톡) 방 목록</h3>
        <p className="right-panel-help">
          카톡처럼 방을 나누어 관리하는 영역입니다.  
          나중에 실제 카카오톡/문자/전화와 연동할 수 있는 구조로 설계할 수 있습니다.
        </p>

        <ul className="site-list">
          {dummyRooms.map((room) => (
            <li
              key={room.id}
              className={
                "site-list-item" +
                (activeRoom && activeRoom.id === room.id
                  ? " site-list-item-active"
                  : "")
              }
              onClick={() => setActiveRoom(room)}
            >
              <div className="site-title">{room.name}</div>
              <div className="site-sub">{room.lastMessage}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="chat-right">
        <h3 className="panel-title">
          {activeRoom ? activeRoom.name : "대화방 선택"}
        </h3>
        <div className="chat-window">
          <div className="chat-message chat-message-me">
            예시) 소비자 견적 문의 내용
          </div>
          <div className="chat-message chat-message-other">
            예시) 한플 ERP 자동 견적 답변
          </div>
        </div>
        <div className="chat-input-row">
          <input
            className="form-input"
            placeholder="여기에 메시지 입력 (지금은 예시 화면)"
            disabled
          />
          <button className="primary-btn" disabled>
            전송
          </button>
        </div>
      </section>
    </div>
  );
}
