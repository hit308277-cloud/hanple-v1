import React, { useState } from 'react'

export default function TaskChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: '고객',
      text: '천안 두정동 33평 아파트 시스템에어컨 견적 부탁드립니다.',
      time: '09:12'
    },
    {
      id: 2,
      from: '상담',
      text: '안녕하세요, 한성시스템에어컨입니다. 실내기 4대 기준으로 대략 350~420만 원 정도 예상됩니다.',
      time: '09:13'
    }
  ])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        from: '상담',
        text,
        time: new Date().toTimeString().slice(0, 5)
      }
    ])
    setInput('')
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-root">
      <div className="chat-header">
        <div>
          <strong>업무톡 – 한성시스템에어컨</strong>
          <div className="chat-sub">
            카카오톡 대신 한플 안에서 상담 내용을 정리하는 공간입니다.
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(m => (
          <div
            key={m.id}
            className={
              'chat-message ' +
              (m.from === '상담' ? 'chat-mine' : 'chat-theirs')
            }
          >
            <div className="chat-meta">
              <span className="chat-from">{m.from}</span>
              <span className="chat-time">{m.time}</span>
            </div>
            <div className="chat-bubble">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="여기에 상담 내용을 입력하세요. (Enter: 전송, Shift+Enter: 줄바꿈)"
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  )
}