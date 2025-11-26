import React, { useState } from "react";
import CalendarView from "./CalendarView";
import TaskChat from "./TaskChat";

function getTodayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(getTodayKey());

  // 날짜별 현장 목록
  // jobsByDate: { '2025-11-28': [ {id, title, memo, head, hands, extra} ] }
  const [jobsByDate, setJobsByDate] = useState({});

  const jobsForSelectedDate = jobsByDate[selectedDate] || [];

  const handleChangeJobsForDate = (newJobs) => {
    setJobsByDate((prev) => ({
      ...prev,
      [selectedDate]: newJobs,
    }));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">HANPLE ERP</div>
        <div className="app-subtitle">달력 · 한톡(업무톡) · 정산을 한 화면에서 관리</div>
      </header>

      <div className="app-main">
        {/* 왼쪽 : 달력 */}
        <div className="calendar-panel">
          <CalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            jobsByDate={jobsByDate}
          />
        </div>

        {/* 오른쪽 : 한톡(업무톡) – 제목 리스트 + 상세화면 */}
        <div className="chat-panel">
          <TaskChat
            selectedDate={selectedDate}
            jobs={jobsForSelectedDate}
            onChangeJobs={handleChangeJobsForDate}
          />
        </div>
      </div>
    </div>
  );
}
