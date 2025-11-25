import React, { useMemo, useState } from 'react'

function buildMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth()

  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)

  const startDay = first.getDay()
  const daysInMonth = last.getDate()

  const cells = []
  for (let i = 0; i < startDay; i++) {
    cells.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
}

export default function CalendarView() {
  const [baseDate, setBaseDate] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const cells = useMemo(() => buildMonth(baseDate), [baseDate])

  const year = baseDate.getFullYear()
  const month = baseDate.getMonth() + 1

  const handleMoveMonth = diff => {
    const next = new Date(baseDate)
    next.setMonth(baseDate.getMonth() + diff)
    setBaseDate(next)
  }

  return (
    <div className="calendar-root">
      <div className="calendar-header">
        <button onClick={() => handleMoveMonth(-1)}>&lt;</button>
        <div className="calendar-title">
          {year}년 {month}월
        </div>
        <button onClick={() => handleMoveMonth(1)}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => (
          <div key={d} className="calendar-dayname">
            {d}
          </div>
        ))}

        {cells.map((d, idx) => {
          const key = d ? d.toISOString() : `empty-${idx}`
          const isToday =
            d &&
            (() => {
              const today = new Date()
              return (
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate()
              )
            })()
          const isSelected =
            d &&
            selectedDate &&
            d.toDateString() === selectedDate.toDateString()

          return (
            <button
              key={key}
              className={[
                'calendar-cell',
                isToday ? 'calendar-today' : '',
                isSelected ? 'calendar-selected' : ''
              ]
                .filter(Boolean)
                .join(' ')}
              disabled={!d}
              onClick={() => d && setSelectedDate(d)}
            >
              {d && d.getDate()}
            </button>
          )
        })}
      </div>

      <div className="calendar-side">
        <h3>선택된 일정</h3>
        {selectedDate ? (
          <p>
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
            {selectedDate.getDate()}일 일정입니다.
            <br />
            여기에 공사·설치·미팅 내용을 붙이면 됩니다.
          </p>
        ) : (
          <p>날짜를 클릭하면 해당 날짜의 일정을 볼 수 있습니다.</p>
        )}

        <div className="calendar-legend">
          <span className="dot today" /> 오늘
          <span className="dot selected" /> 선택된 날짜
        </div>
      </div>
    </div>
  )
}