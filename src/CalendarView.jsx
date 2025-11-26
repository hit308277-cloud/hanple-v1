// src/CalendarView.jsx
import { useState } from "react";

const INIT_FORM = {
  date: "",
  time: "",
  customerName: "",
  phone: "",
  address: "",
  brand: "LG",
  model: "",
  team: "",
  status: "시공예정", // 상담 / 계약 / 시공예정 / 시공완료 / 정산완료
  memo: "",
};

const STATUS_OPTIONS = ["상담", "계약", "시공예정", "시공완료", "정산완료"];

function CalendarView() {
  const [form, setForm] = useState(INIT_FORM);
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null); // 수정 중인 일정 id

  // 입력 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 일정 등록 / 수정 저장
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.customerName || !form.address) {
      alert("날짜, 고객명, 주소는 필수입니다.");
      return;
    }

    if (editingId) {
      // 수정 모드
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingId
            ? {
                ...job,
                ...form,
              }
            : job
        )
      );
      setEditingId(null);
    } else {
      // 신규 등록
      const newJob = {
        id: Date.now(),
        ...form,
      };
      setJobs((prev) => [newJob, ...prev]);
    }

    setForm(INIT_FORM);
  };

  // 일정 삭제
  const handleDelete = (id) => {
    if (!window.confirm("이 일정을 삭제할까요?")) return;
    setJobs((prev) => prev.filter((job) => job.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm(INIT_FORM);
    }
  };

  // 일정 수정 버튼 → 폼에 불러오기
  const handleEdit = (job) => {
    setForm({
      date: job.date || "",
      time: job.time || "",
      customerName: job.customerName || "",
      phone: job.phone || "",
      address: job.address || "",
      brand: job.brand || "LG",
      model: job.model || "",
      team: job.team || "",
      status: job.status || "시공예정",
      memo: job.memo || "",
    });
    setEditingId(job.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 일정 복사 → 폼에 불러오되 id는 새로
  const handleCopy = (job) => {
    setForm({
      date: "", // 날짜는 비워둠 (새 일정)
      time: "",
      customerName: job.customerName || "",
      phone: job.phone || "",
      address: job.address || "",
      brand: job.brand || "LG",
      model: job.model || "",
      team: "", // 시공팀은 다시 배정할 수 있게 비움
      status: "시공예정",
      memo: job.memo || "",
    });
    setEditingId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 시공팀 배정/변경
  const handleAssignTeam = (jobId) => {
    const name = window.prompt(
      "시공팀 이름을 입력하세요.\n예: A팀 / B팀 / 김철수팀"
    );
    if (!name) return;
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              team: name,
            }
          : job
      )
    );
  };

  return (
    <div className="panel">
      <h2>📅 한플 일정 / 시공현장</h2>
      <p className="panel-sub">
        상담 → 계약 완료된 건을 이 화면에서 시공 일정으로 등록·수정·복사·삭제하고,
        시공팀을 배정합니다. (나중에 실제 달력·정산·시공완료와 연결됩니다)
      </p>

      {/* 일정 등록 / 수정 폼 */}
      <form className="job-form" onSubmit={handleSubmit}>
        <div className="job-form-row">
          <div className="job-field">
            <label>시공 날짜</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="job-field">
            <label>시간</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />
          </div>
          <div className="job-field">
            <label>상태</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="job-form-row">
          <div className="job-field">
            <label>고객명</label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="예: 최순호"
              required
            />
          </div>
          <div className="job-field">
            <label>연락처</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
            />
          </div>
        </div>

        <div className="job-form-row">
          <div className="job-field full">
            <label>주소</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="아파트 / 동 / 호수까지 입력"
              required
            />
          </div>
        </div>

        <div className="job-form-row">
          <div className="job-field">
            <label>브랜드</label>
            <select
              name="brand"
              value={form.brand}
              onChange={handleChange}
            >
              <option value="LG">LG</option>
              <option value="삼성">삼성</option>
              <option value="캐리어">캐리어</option>
              <option value="위니아">위니아</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="job-field">
            <label>제품모델</label>
            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="예: 18평+6평+5평 / 4마력"
            />
          </div>
          <div className="job-field">
            <label>시공팀</label>
            <input
              type="text"
              name="team"
              value={form.team}
              onChange={handleChange}
              placeholder="예: A팀 / 김철수팀 (비워두면 미지정)"
            />
          </div>
        </div>

        <div className="job-form-row">
          <div className="job-field full">
            <label>메모</label>
            <textarea
              name="memo"
              value={form.memo}
              onChange={handleChange}
              rows={2}
              placeholder="도배 일정 / 전기공사 / 보양 / 특별 요청사항 등"
            />
          </div>
        </div>

        <div className="job-form-actions">
          {editingId && (
            <span className="editing-badge">
              ✏️ 수정 중입니다 (저장 시 해당 일정이 업데이트됩니다)
            </span>
          )}
          <button type="submit" className="primary-btn">
            {editingId ? "💾 수정 저장" : "✅ 일정 등록"}
          </button>
        </div>
      </form>

      {/* 등록된 일정 목록 */}
      <div className="job-list">
        <h3>📋 등록된 시공 일정</h3>
        {jobs.length === 0 && (
          <p className="empty-text">아직 등록된 일정이 없습니다.</p>
        )}

        {jobs.map((job) => (
          <div key={job.id} className="job-item">
            <div className="job-main">
              <div className="job-title">
                <span className="job-date">
                  {job.date} {job.time && `(${job.time})`}
                </span>
                <span className="job-customer">
                  {job.customerName} / {job.phone || "연락처 미입력"}
                </span>
                <span className={`status-badge status-${job.status}`}>
                  {job.status}
                </span>
              </div>

              <div className="job-sub">
                <span>{job.address}</span>
              </div>

              <div className="job-sub">
                <span>
                  브랜드: {job.brand} / 모델: {job.model || "미입력"} / 시공팀:{" "}
                  {job.team || "미지정"}
                </span>
              </div>

              {job.memo && (
                <div className="job-memo">메모: {job.memo}</div>
              )}
            </div>

            <div className="job-item-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => handleAssignTeam(job.id)}
              >
                {job.team ? "시공팀 변경" : "시공팀 배정"}
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => handleEdit(job)}
              >
                수정
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => handleCopy(job)}
              >
                복사
              </button>
              <button
                type="button"
                className="danger-btn"
                onClick={() => handleDelete(job.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
