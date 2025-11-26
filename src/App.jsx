// src/App.jsx
import React, { useMemo, useState } from "react";
import CalendarView from "./CalendarView";
import TaskChat from "./TaskChat";
import "./styles.css";

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function App() {
  const today = useMemo(() => formatDate(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(today);

  // 전체 현장 목록 (달력+한톡이 같이 쓰는 공통 데이터)
  // job = { id, date, company, title, memo, amounts:{head,hands,extra}, messages:[] }
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const jobsForSelectedDate = jobs.filter(
    (job) => job.date === selectedDate
  );
  const selectedJob =
    jobs.find((job) => job.id === selectedJobId) || null;

  // 달력에서 날짜 선택 → 한톡도 같은 날짜를 기준으로 작동
  const handleSelectDate = (dateStr) => {
    setSelectedDate(dateStr);
    const firstJob = jobs.find((job) => job.date === dateStr);
    setSelectedJobId(firstJob ? firstJob.id : null);
  };

  // ✅ 새 현장 등록 (한톡에서만 호출)
  const handleCreateJob = (jobInput) => {
    const newJob = {
      id: Date.now().toString(),
      date: jobInput.date || selectedDate,
      company: jobInput.company || "",
      title: jobInput.title || jobInput.company || "제목 없음",
      memo: jobInput.memo || "",
      amounts: {
        head: Number(jobInput.head || 0),
        hands: Number(jobInput.hands || 0),
        extra: Number(jobInput.extra || 0),
      },
      messages: [],
    };

    setJobs((prev) => [...prev, newJob]);
    setSelectedDate(newJob.date);
    setSelectedJobId(newJob.id);
  };

  // ✅ 기존 현장 수정 (한톡에서만 호출)
  const handleUpdateJob = (jobInput) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobInput.id
          ? {
              ...job,
              date: jobInput.date || job.date,
              company: jobInput.company ?? job.company,
              title:
                jobInput.title ||
                jobInput.company ||
                job.title,
              memo: jobInput.memo ?? job.memo,
              amounts: {
                head: Number(jobInput.head ?? job.amounts?.head || 0),
                hands: Number(jobInput.hands ?? job.amounts?.hands || 0),
                extra: Number(jobInput.extra ?? job.amounts?.extra || 0),
              },
            }
          : job
      )
    );
    setSelectedJobId(jobInput.id);
    if (jobInput.date) {
      setSelectedDate(jobInput.date);
    }
  };

  // ✅ 한톡 채팅/메모 추가 (한톡에서만 호출)
  const handleAddMessage = (jobId, text) => {
    if (!text.trim()) return;
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              messages: [
                ...(job.messages || []),
                {
                  id: `${jobId}-${Date.now()}`,
                  text,
                  time: new Date().toLocaleTimeString(),
                },
              ],
            }
          : job
      )
    );
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="logo-area">
          <span className="logo-main">HANPLE ERP</span>
          <span className="logo-sub">
            달력 + 한톡 + 정산 통합 (입력·수정은 한톡 전용)
          </span>
        </div>
        <div className="header-right">
          <span className="header-tag">v1.2 – Chat-Driven 입력 방식</span>
        </div>
      </header>

      <main className="app-main">
        <section className="calendar-section">
          <CalendarView
            selectedDate={selectedDate}
            jobs={jobs}
            onSelectDate={handleSelectDate}
            onSelectJob={setSelectedJobId}
          />
        </section>

        <section className="chat-section">
          <TaskChat
            selectedDate={selectedDate}
            jobsForDate={jobsForSelectedDate}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJobId}
            onCreateJob={handleCreateJob}
            onUpdateJob={handleUpdateJob}
            onAddMessage={handleAddMessage}
          />
        </section>
      </main>
    </div>
  );
}
