import React, { useState } from "react";

let nextId = 1;

export default function TaskChat({ selectedDate, jobs, onChangeJobs }) {
  const [selectedJobId, setSelectedJobId] = useState(null);

  // 새 현장 입력용 상태
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [head, setHead] = useState("");
  const [hands, setHands] = useState("");
  const [extra, setExtra] = useState("");

  const resetForm = () => {
    setTitle("");
    setMemo("");
    setHead("");
    setHands("");
    setExtra("");
  };

  const handleCreateJob = () => {
    if (!title.trim()) {
      alert("현장 제목(업체명 + 요약)을 입력해 주세요.");
      return;
    }

    const newJob = {
      id: nextId++,
      title: title.trim(),
      memo: memo.trim(),
      head: Number(head || 0),
      hands: Number(hands || 0),
      extra: Number(extra || 0),
      createdAt: new Date().toISOString(),
    };

    const newJobs = [...jobs, newJob];
    onChangeJobs(newJobs);
    setSelectedJobId(newJob.id);
    resetForm();
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || null;

  const handleUpdateSelectedJob = () => {
    if (!selectedJob) return;

    const updated = {
      ...selectedJob,
      memo,
      head: Number(head || 0),
      hands: Number(hands || 0),
      extra: Number(extra || 0),
    };

    const newJobs = jobs.map((j) => (j.id === selectedJob.id ? updated : j));
    onChangeJobs(newJobs);
    alert("현장 정보가 수정되었습니다.");
  };

  const handleClickJob = (job) => {
    setSelectedJobId(job.id);
    setTitle(job.title);
    setMemo(job.memo || "");
    setHead(String(job.head || ""));
    setHands(String(job.hands || ""));
    setExtra(String(job.extra || ""));
  };

  const total = (Number(head || 0) + Number(hands || 0) + Number(extra || 0)) || 0;

  return (
    <div className="taskchat-layout">
      {/* 왼쪽 : 카톡 방 리스트 */}
      <div className="taskchat-list-panel">
        <div className="taskchat-list-header">
          <div className="list-title">한톡(업무톡) 방 목록</div>
          <div className="list-sub">
            {selectedDate} 기준 · 총 {jobs.length}개 현장
          </div>
        </div>

        <div className="taskchat-list">
          {jobs.length === 0 && (
            <div className="empty-list">
              아직 등록된 현장이 없습니다.
              <br />
              아래 입력창에서 새 현장을 등록해 주세요.
            </div>
          )}

          {jobs.map((job) => (
            <button
              key={job.id}
              className={`job-list-item ${
                job.id === selectedJobId ? "job-list-item-active" : ""
              }`}
              onClick={() => handleClickJob(job)}
            >
              <div className="job-title">{job.title}</div>
              <div className="job-meta">
                메모 {job.memo ? "있음" : "없음"} · 정산{" "}
                {job.head || job.hands || job.extra ? "입력됨" : "미입력"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 오른쪽 : 선택된 방 상세 (카톡 스타일) */}
      <div className="taskchat-detail-panel">
        {!selectedJob && (
          <div className="detail-empty">
            왼쪽에서 **현장 제목**을 선택하면
            <br />
            이 영역에 카톡 형식으로
            <br />
            메모 · 정산 정보가 표시됩니다.
          </div>
        )}

        {selectedJob && (
          <div className="detail-wrapper">
            {/* 상단 제목(방 제목) */}
            <div className="chat-header-bar">
              <div className="chat-room-title">{selectedJob.title}</div>
              <div className="chat-room-sub">
                {selectedDate} · 한톡 현장 단톡방
              </div>
            </div>

            <div className="chat-body">
              {/* 메모 카드 */}
              <div className="chat-card">
                <div className="chat-card-title">현장 메모 · 공사 범위</div>
                <textarea
                  className="memo-textarea"
                  placeholder="카톡에 쓰듯이 현장 상황, 공사 범위, 메모를 자유롭게 입력하세요."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </div>

              {/* 정산 카드 */}
              <div className="chat-card">
                <div className="chat-card-title">정산 (머리 · 손발 · 기타)</div>

                <div className="settlement-grid">
                  <div className="settlement-row">
                    <label>머리 (계약자 수익)</label>
                    <input
                      type="number"
                      className="settlement-input"
                      value={head}
                      onChange={(e) => setHead(e.target.value)}
                      placeholder="예) 5000000"
                    />
                    <span className="settlement-unit">원</span>
                  </div>
                  <div className="settlement-row">
                    <label>손발 (인건비)</label>
                    <input
                      type="number"
                      className="settlement-input"
                      value={hands}
                      onChange={(e) => setHands(e.target.value)}
                      placeholder="예) 2000000"
                    />
                    <span className="settlement-unit">원</span>
                  </div>
                  <div className="settlement-row">
                    <label>기타 (경비 등)</label>
                    <input
                      type="number"
                      className="settlement-input"
                      value={extra}
                      onChange={(e) => setExtra(e.target.value)}
                      placeholder="예) 300000"
                    />
                    <span className="settlement-unit">원</span>
                  </div>
                </div>

                <div className="settlement-summary">
                  <span>합계(머리+손발+기타)</span>
                  <span className="settlement-total">
                    {total.toLocaleString()} 원
                  </span>
                </div>
              </div>

              <div className="detail-buttons">
                <button className="btn-primary" onClick={handleUpdateSelectedJob}>
                  선택된 현장 정보 저장(수정)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 새 현장 추가 – 화면 제일 아래, 카톡 입력창 느낌 */}
        <div className="new-job-section">
          <div className="new-job-title">새 현장 추가 (카톡 입력창 느낌)</div>
          <input
            className="new-job-input"
            placeholder="현장 제목 (예: 한성/미입금 천안 정대현, 삼성 무풍 4대 설치)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn-secondary" onClick={handleCreateJob}>
            새 현장 등록
          </button>
        </div>
      </div>
    </div>
  );
}
