// src/TaskChat.jsx
import React, { useEffect, useState } from "react";

function formatKoreanDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

const emptyForm = {
  title: "",
  memo: "",
  head: "",
  hands: "",
  extra: "",
};

export default function TaskChat({
  selectedDate,
  selectedJob,
  hasJobs,
  onCreateJob,
  onUpdateJob,
}) {
  // 상세 화면에서 수정용 상태
  const [edit, setEdit] = useState(emptyForm);
  // 새 현장 등록용 상태
  const [newForm, setNewForm] = useState(emptyForm);

  // 선택 현장 바뀌면 수정폼 동기화
  useEffect(() => {
    if (!selectedJob) {
      setEdit(emptyForm);
      return;
    }
    setEdit({
      title: selectedJob.title,
      memo: selectedJob.memo,
      head: String(selectedJob.head),
      hands: String(selectedJob.hands),
      extra: String(selectedJob.extra),
    });
  }, [selectedJob]);

  const parseNumber = (v) => {
    const n = Number(v.toString().replace(/,/g, ""));
    return Number.isNaN(n) ? 0 : n;
  };

  const handleSaveEdit = () => {
    if (!selectedJob) return;
    onUpdateJob({
      title: edit.title.trim() || "제목 없음",
      memo: edit.memo,
      head: parseNumber(edit.head),
      hands: parseNumber(edit.hands),
      extra: parseNumber(edit.extra),
    });
    alert("현장 정보가 저장되었습니다.");
  };

  const handleCreate = () => {
    if (!newForm.title.trim()) {
      alert("현장 제목을 입력해주세요. (예: 한성/미입금 일지 천안 정대현)");
      return;
    }

    onCreateJob({
      title: newForm.title.trim(),
      memo: newForm.memo,
      head: parseNumber(newForm.head),
      hands: parseNumber(newForm.hands),
      extra: parseNumber(newForm.extra),
    });

    setNewForm(emptyForm);
    alert("새 현장이 등록되었습니다. (좌측 목록과 달력에 반영)");
  };

  const currentHead = selectedJob ? selectedJob.head : 0;
  const currentHands = selectedJob ? selectedJob.hands : 0;
  const currentExtra = selectedJob ? selectedJob.extra : 0;
  const currentNet = currentHead - currentHands - currentExtra;

  return (
    <div className="right-panel">
      {/* 상단 헤더 - 카톡 채팅창 느낌 */}
      <header className="chat-header">
        <div className="chat-header-title">
          <span className="chat-main-title">한톡 (업무톡)</span>
          <span className="chat-sub-title">
            {formatKoreanDate(selectedDate)} 기준 현장 한톡 · 정산
          </span>
        </div>
      </header>

      <div className="chat-body">
        {/* 선택된 현장 상세 (카톡 채팅창 같은 역할) */}
        <section className="chat-room">
          {!selectedJob && !hasJobs && (
            <div className="chat-empty">
              <p>
                아직 현장이 없습니다.
                <br />
                아래 <strong>“새 현장 등록”</strong>에서 먼저 현장을 추가하세요.
              </p>
            </div>
          )}

          {!selectedJob && hasJobs && (
            <div className="chat-empty">
              <p>
                좌측 달력 아래 <strong>현장 제목</strong>을 클릭하면
                <br />
                여기에서 해당 현장의 메모와 정산을 볼 수 있습니다.
              </p>
            </div>
          )}

          {selectedJob && (
            <div className="chat-detail">
              <h2 className="chat-room-title">{edit.title || "제목 없음"}</h2>
              <p className="chat-room-date">
                {formatKoreanDate(selectedDate)} · 한플 ERP 현장 한톡
              </p>

              <div className="chat-section">
                <h3>현장 메모 · 공사 범위</h3>
                <textarea
                  className="chat-textarea"
                  placeholder="예) 천안 두정푸르지오 3대 설치 / 한성 미입금 일지 등"
                  value={edit.memo}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, memo: e.target.value }))
                  }
                />
              </div>

              <div className="chat-section">
                <h3>정산 (머리 · 손발 · 기타)</h3>
                <div className="settle-grid">
                  <label>
                    머리 (계약금액 또는 도급비)
                    <input
                      type="text"
                      value={edit.head}
                      onChange={(e) =>
                        setEdit((prev) => ({ ...prev, head: e.target.value }))
                      }
                      placeholder="예) 5,000,000"
                    />
                  </label>
                  <label>
                    손발 (인건비/시공비)
                    <input
                      type="text"
                      value={edit.hands}
                      onChange={(e) =>
                        setEdit((prev) => ({ ...prev, hands: e.target.value }))
                      }
                      placeholder="예) 2,000,000"
                    />
                  </label>
                  <label>
                    기타 (자재/경비 등)
                    <input
                      type="text"
                      value={edit.extra}
                      onChange={(e) =>
                        setEdit((prev) => ({ ...prev, extra: e.target.value }))
                      }
                      placeholder="예) 300,000"
                    />
                  </label>
                </div>

                <div className="settle-summary">
                  <div>머리: {currentHead.toLocaleString()}원</div>
                  <div>손발: {currentHands.toLocaleString()}원</div>
                  <div>기타: {currentExtra.toLocaleString()}원</div>
                  <div className="settle-net">
                    순이익(머리-손발-기타):{" "}
                    <strong>{currentNet.toLocaleString()}원</strong>
                  </div>
                </div>
              </div>

              <div className="chat-actions">
                <button onClick={handleSaveEdit}>현장 정보 저장</button>
              </div>
            </div>
          )}
        </section>

        {/* 아래쪽 : 새 현장 등록 (한톡 입력창 역할) */}
        <section className="new-job-section">
          <h3>📝 새 현장 등록 (한톡 입력창)</h3>
          <p className="new-job-help">
            카톡처럼 이 입력창에서만 현장을 등록·수정합니다. 달력은{" "}
            <strong>보기용</strong>입니다.
          </p>

          <div className="new-job-grid">
            <label>
              현장 제목 (업체/미입금/지역 등)
              <input
                type="text"
                value={newForm.title}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="예) 한성/미입금 일지 천안 정대현"
              />
            </label>

            <label>
              메모 (현장 주소, 공사 범위 등)
              <textarea
                value={newForm.memo}
                onChange={(e) =>
                  setNewForm((prev) => ({ ...prev, memo: e.target.value }))
                }
                placeholder="예) 천안 두정푸르지오 3대 설치, 미입금 내역 등 상세 메모"
              />
            </label>

            <div className="settle-grid">
              <label>
                머리
                <input
                  type="text"
                  value={newForm.head}
                  onChange={(e) =>
                    setNewForm((prev) => ({ ...prev, head: e.target.value }))
                  }
                  placeholder="계약금액"
                />
              </label>
              <label>
                손발
                <input
                  type="text"
                  value={newForm.hands}
                  onChange={(e) =>
                    setNewForm((prev) => ({ ...prev, hands: e.target.value }))
                  }
                  placeholder="인건비/시공비"
                />
              </label>
              <label>
                기타
                <input
                  type="text"
                  value={newForm.extra}
                  onChange={(e) =>
                    setNewForm((prev) => ({ ...prev, extra: e.target.value }))
                  }
                  placeholder="자재/경비 등"
                />
              </label>
            </div>
          </div>

          <div className="chat-actions">
            <button onClick={handleCreate}>
              {formatKoreanDate(selectedDate)} 새 현장 등록
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
