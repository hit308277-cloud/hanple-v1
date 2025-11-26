import React, { useState } from 'react';
import CalendarView from './CalendarView';
import TaskChat from './TaskChat';

const tabs = [
  { id: 'calendar', label: '업체 달력' },
  { id: 'chat', label: '업무톡(한톡)' },
  { id: 'site', label: 'SITE / 홈케어' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [isLeftOpen, setIsLeftOpen] = useState(true);

  const renderMain = () => {
    if (activeTab === 'chat') return <TaskChat />;

    if (activeTab === 'site') {
      return (
        <div style={{ padding: 16, fontSize: 14 }}>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>SITE / 홈케어</h2>
          <p>홈케어(우리집관리) 화면은 여기서 점점 살을 붙여 나가면 됩니다.</p>
        </div>
      );
    }

    // 기본은 달력
    return <CalendarView />;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <span className="logo-mark">HANPLE</span>
          <span className="logo-sub">한플 ERP v1.0</span>
        </div>

        <div className="hts-toolbar">
          <button
            className="hts-toggle"
            type="button"
            onClick={() => setIsLeftOpen(prev => !prev)}
          >
            {isLeftOpen ? '◀ 기능 패널 접기' : '▶ 기능 패널 펼치기'}
          </button>
        </div>
      </header>

      <div className="app-body">
        {isLeftOpen && (
          <aside className="left-panel">
            <div className="left-panel-title">기능 선택 (HTS 티어)</div>
            <nav className="tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`tab-btn ${activeTab === tab.id ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>
        )}

        <section className="right-panel">
          {renderMain()}
        </section>
      </div>
    </div>
  );
}
