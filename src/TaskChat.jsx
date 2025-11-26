// src/TaskChat.jsx
import React, { useEffect, useState } from "react";

export default function TaskChat({
  selectedDate,
  jobsForDate,
  selectedJob,
  onSelectJob,
  onCreateJob,
  onUpdateJob,
  onAddMessage,
}) {
  // 🔹 새 현장 등록용 입력 상태
  const [newCompany, setNewCompany] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newMemo, setNewMemo] = useState("");
  const [newHead, setNewHead] = useState("");
  const [newHands, setNewHands] = useState("");
  const [newExtra, setNewExtra] = useState("");

  // 🔹 선택된 현장 편집용 입력 상태
  const [editCompany, setEditCompany] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editMemo, setEditMemo] = useState("");
  const [editHead, setEditHead] = useState("");
  const [editHands, setEditHands] = useState("");
  const [editExtra, setEditExtra] = useState("");

  // 🔹 채팅 입력
  const [chatInput, setChatInput] = useState("");

  // 날짜 바뀔 때 새 등록 폼 초기화
  useEffect(() => {
    setNewCompany("");
    setNewTitle("");
    setNewMemo("");
    setNewHead("");
    setNewHands("");
    setNewExtra("");
  }, [selectedDate]);

  // 선택된 현장이 바뀔 때, 편집 폼에 값 채워주기
  useEffect(() => {
    if (!selectedJob) {
      setEditCompany("");
      setEditTitle("");
      setEditMemo("");
      setEditHead("");
      setEditHands("");
      setEditExtra("");
      return;
    }
    setEditCompany(selectedJob.company || "");
    setEditTitle(selectedJob.title || "");
    setEditMemo(selectedJob.memo || "");
    setEditHead(selectedJob.amounts?.head ?? "");
    setEditHands(selectedJob.amounts?.hands ?? "");
    setEditExtra(selectedJob.amounts?.extra ?? "");
  }, [selectedJob]);

  const handleCreateJobClick = () => {
    if (!newCompany.trim() && !newTitle.trim()) {
      alert("업체 또는 제목 중 하나는 반드시 입력해야 합니다.");
      return;
    }
    onCreateJob({
      date: selectedDate,
      company: newCompany.trim(),
      title: newTitle.trim(),
      memo: newMemo,
      head: Number(newHead || 0),
      hands: Number(newHands || 0),
      extra: Number(newExtra || 0),
    });
    setNewCompany("");
    setNewTitle("");
    setNewMemo("");
    setNewHead("");
    setNewHands("");
    setNewExtra("");
  };

  const handleUpdateJobClick = () => {
    if (!selectedJob) {
      alert("먼저 수정할 현장을 선택하세요.");
      return;
    }
    onUpdateJob({
      id: selectedJob.id,
      date: selectedJob.date, // 날짜 변경은 추후 옵션
      company: editCompany,
      title: editTitle,
      memo: editMemo,
      head: Number(editHead || 0),
      hands: Number(editHands || 0),
      extra: Number(editExtra || 0),
    });
  };

  const handleSendChat = () => {
    if (!selectedJob) {
      alert("먼저 현장을 선택하세요.");
      return;
    }
    if (!chatInput.trim()) return;
    onAddMessage(selectedJob.id, chatInput.trim());
    setChatInput("");
  };

  let total = 0;
  if (selectedJob && selectedJob.amounts) {
    total =
      (selectedJob.amounts.head || 0) +
      (selectedJob.amounts.hands || 0) +
      (selectedJob.amounts.extra || 0);
  }

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div>
          <div className="chat-header-title">한톡 (입력·수정 전용)</div>
          <div className="chat-header-sub">
            ⚙ 모든 일정·정산 입력/수정은 이 화면(한톡)에서만 합니다.  
            달력은 날짜별 현장만 보여주는 “보기 전용”입니다.
          </div>
        </div>
        <div className="chat-header-date">
          선택 날짜 : <strong>{selectedDate}</strong>
        </div>
      </div>

      <div className="chat-body">
        {/* 왼쪽 : 선택 날짜의 현장 목록 (카톡 방 리스트) */}
        <div className="chat-joblist">
          <div className="chat-joblist-title">
            {selectedDate} 현장 목록
          </div>
          {jobsForDate.length === 0 && (
            <div className="chat-joblist-empty">
              아직 등록된 현장이 없습니다.
            </div>
          )}
          {jobsForDate.map((job) => (
            <button
              key={job.id}
              type="button"
              className={
                "chat-job-item" +
                (selectedJob && selectedJob.id === job.id
                  ? " active"
                  : "")
              }
              onClick={() => onSelectJob(job.id)}
            >
              <div className="chat-job-item-title">
                {job.company ? `[${job.company}] ` : ""}
                {job.title || "제목 없음"}
              </div>
              {job.memo && (
                <div className="chat-job-item-memo">
                  {job.memo.slice(0, 30)}
                  {job.memo.length > 30 ? "..." : ""}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* 오른쪽 : 선택된 현장 편집 + 채팅 + 새 현장 등록 */}
        <div className="chat-main-panel">
          {/* 1) 선택된 현장 편집 + 정산 */}
          <div className="job-detail-card">
            {selectedJob ? (
              <>
                <div className="job-detail-header">
                  <div>
                    <div className="job-detail-title">
                      선택된 현장 편집
                    </div>
                    <div className="job-detail-sub">
                      날짜: {selectedJob.date}
                    </div>
                  </div>
                  <div className="job-detail-amount">
                    머리:{" "}
                    {selectedJob.amounts?.head?.toLocaleString() || 0}
                    원 / 손발:{" "}
                    {selectedJob.amounts?.hands?.toLocaleString() || 0}
                    원 / 기타:{" "}
                    {selectedJob.amounts?.extra?.toLocaleString() || 0}
                    원
                    <br />
                    <strong>
                      합계: {total.toLocaleString()}원
                    </strong>
                  </div>
                </div>

                <div className="job-edit-grid">
                  <div className="form-field">
                    <label>업체 / 거래처</label>
                    <input
                      value={editCompany}
                      onChange={(e) =>
                        setEditCompany(e.target.value)
                      }
                      placeholder="예) 한성시스템에어컨"
                    />
                  </div>
                  <div className="form-field">
                    <label>현장 제목</label>
                    <input
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(e.target.value)
                      }
                      placeholder="예) 한성/미입금 엘지 천안 정대현"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>현장 메모</label>
                  <textarea
                    rows={3}
                    value={editMemo}
                    onChange={(e) =>
                      setEditMemo(e.target.value)
                    }
                    placeholder="주소, 공사 범위, 특이사항 등을 수정하세요."
                  />
                </div>

                <div className="job-edit-grid">
                  <div className="form-field">
                    <label>머리 (계약금액)</label>
                    <input
                      type="number"
                      value={editHead}
                      onChange={(e) =>
                        setEditHead(e.target.value)
                      }
                    />
                  </div>
                  <div className="form-field">
                    <label>손발 (인건비)</label>
                    <input
                      type="number"
                      value={editHands}
                      onChange={(e) =>
                        setEditHands(e.target.value)
                      }
                    />
                  </div>
                  <div className="form-field">
                    <label>기타</label>
                    <input
                      type="number"
                      value={editExtra}
                      onChange={(e) =>
                        setEditExtra(e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="job-edit-footer">
                  <span>
                    ※ 선택된 현장만 수정됩니다. (달력에도 자동 반영)
                  </span>
                  <button
                    type="button"
                    className="job-save-btn"
                    onClick={handleUpdateJobClick}
                  >
                    수정 저장
                  </button>
                </div>
              </>
            ) : (
              <div className="job-detail-empty">
                왼쪽에서 현장 제목을 선택하면  
                이 자리에서 그 현장 정보를 편집하고  
                머리/손발/기타 정산을 수정할 수 있습니다.
              </div>
            )}

            {/* 채팅/메모 입력 */}
            {selectedJob && (
              <>
                <div className="chat-messages">
                  {selectedJob.messages?.length === 0 && (
                    <div className="chat-empty">
                      아직 채팅/메모가 없습니다.
                    </div>
                  )}
                  {selectedJob.messages?.map((msg) => (
                    <div
                      key={msg.id}
                      className="chat-message-row"
                    >
                      <div className="chat-message-bubble">
                        <div className="chat-message-text">
                          {msg.text}
                        </div>
                        <div className="chat-message-time">
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="chat-input-row">
                  <input
                    className="chat-input"
                    placeholder="한톡 메모 / 통화내용 / 정산 관련 기록"
                    value={chatInput}
                    onChange={(e) =>
                      setChatInput(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendChat();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="chat-send-btn"
                    onClick={handleSendChat}
                  >
                    입력
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 2) 새 현장 등록 (항상 한톡에서만 입력) */}
          <div className="job-create-card">
            <div className="job-create-title">
              새 현장 등록 (한톡 입력)
            </div>
            <div className="job-create-grid">
              <div className="form-field">
                <label>업체 / 거래처명</label>
                <input
                  value={newCompany}
                  onChange={(e) =>
                    setNewCompany(e.target.value)
                  }
                  placeholder="예) 한성시스템에어컨, 중앙공조 등"
                />
              </div>
              <div className="form-field">
                <label>현장 제목</label>
                <input
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(e.target.value)
                  }
                  placeholder="예) 한성/미입금 엘지 천안 정대현"
                />
              </div>
            </div>

            <div className="form-field">
              <label>현장 메모 / 일정 내용</label>
              <textarea
                rows={2}
                value={newMemo}
                onChange={(e) =>
                  setNewMemo(e.target.value)
                }
                placeholder="주소, 공사 내용, 특이사항 등을 입력하면 달력+정산에 같이 저장됩니다."
              />
            </div>

            <div className="job-create-grid">
              <div className="form-field">
                <label>머리 (계약금액)</label>
                <input
                  type="number"
                  value={newHead}
                  onChange={(e) =>
                    setNewHead(e.target.value)
                  }
                />
              </div>
              <div className="form-field">
                <label>손발 (인건비)</label>
                <input
                  type="number"
                  value={newHands}
                  onChange={(e) =>
                    setNewHands(e.target.value)
                  }
                />
              </div>
              <div className="form-field">
                <label>기타</label>
                <input
                  type="number"
                  value={newExtra}
                  onChange={(e) =>
                    setNewExtra(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="job-create-footer">
              <div className="job-create-info">
                ※ 이곳에서 저장한 현장은  
                달력에도 자동으로 표시됩니다.
              </div>
              <button
                type="button"
                className="job-save-btn"
                onClick={handleCreateJobClick}
              >
                현장 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
