// src/App.jsx
import React, { useState } from "react";
import CalendarView from "./CalendarView";
import TaskChat from "./TaskChat";
import "./styles.css";

function makeTodayString() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function App() {
  // 선택된 날짜 (YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState(makeTodayString());

  // 날짜별 현장 목록
  // 예: { "2025-11-26": [ {id, title, memo, head, hands, extra} ] }
  const [jobsByDate, setJobsByDate] = useState({});

  // 선택된 현장 ID (카톡에서 방 하나 선택한 것처럼)
  const [selectedJobId, setSelectedJobId] = useState(null);

  const jobsForSelectedDate = jobsByDate[selectedDate] || [];
  const selectedJob =
    jobsForSelectedDate.find((job) => job.id === selectedJobId) || null;

  // 달력에서 날짜 클릭
  const handleChangeDate = (dateStr) => {
    setSelectedDate(dateStr);
    setSelectedJobId(null); // 날짜 바꾸면 선택 현장 초기화
  };

  // 새 현장 등록 (한톡에서만 호출)
  const handleCreateJob = (jobData) => {
    setJobsByDate((prev) => {
      const list = prev[selectedDate] || [];
      const newJob = {
        id: Date.now(), // 간단 ID
        ...jobData,
      };
      return {
        ...prev,
        [selectedDate]: [...list, newJob],
      };
    });
  };

  // 기존 현장 수정
  const handleUpdateJob = (updatedFields) => {
    if (!selectedJobId) return;
    setJobsByDate((prev) => {
      const list = prev[selectedDate] || [];
      const newList = list.map((job) =>
        job.id === selectedJobId ? { ...job, ...updatedFields } : job
      );
      return {
        ...prev,
        [selectedDate]: newList,
      };
    });
  };

  return (
    <div className="app-container">
      {/* 왼쪽 : 달력 + 날짜별 현장 제목 리스트 */}
      <CalendarView
        selectedDate={selectedDate}
        jobs={jobsForSelectedDate}
        onChangeDate={handleChangeDate}
        onSelectJob={setSelectedJobId}
      />

      {/* 오른쪽 : 카톡 스타일 한톡 화면 */}
      <TaskChat
        selectedDate={selectedDate}
        selectedJob={selectedJob}
        hasJobs={jobsForSelectedDate.length > 0}
        onCreateJob={handleCreateJob}
        onUpdateJob={handleUpdateJob}
      />
    </div>
  );
}
