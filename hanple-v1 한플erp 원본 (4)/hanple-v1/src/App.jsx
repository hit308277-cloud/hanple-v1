import React, { useState } from 'react'
import CalendarView from './CalendarView'
import TaskChat from './TaskChat'

const tabs = [
  { id: 'calendar', label: '달력' },
  { id: 'chat', label: '업무톡' },
  { id: 'site', label: 'SITE(우리집관리)' }
]

export default function App() {
  const [active, setActive] = useState('calendar')

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="logo">
          <span className="logo-mark">HANPLE</span>
          <span className="logo-sub">현장 중심 ERP v1</span>
        </div>
      </header>

      <main className="app-main">
        <nav className="tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`tab ${active === t.id ? 'tab-active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <section className="tab-panel">
          {active === 'calendar' && <CalendarView />}
          {active === 'chat' && <TaskChat />}
          {active === 'site' && (
            <div className="placeholder">
              <h2>우리집관리 / SITE</h2>
              <p>여기는 나중에 공사현장, 우리집 자산관리 화면을 붙이면 됩니다.</p>
              <ul>
                <li>현장별 사진 / 동영상</li>
                <li>계약서, 견적서 링크</li>
                <li>입금·정산 내역 요약</li>
              </ul>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        한플 기본 뼈대 v1 · 이 코드 위에 기능을 계속 붙여가면 됩니다.
      </footer>
    </div>
  )
}