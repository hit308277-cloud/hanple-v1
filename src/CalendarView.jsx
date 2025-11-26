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
  memo: "",
};

function CalendarView() {
  const [form, setForm] = useState(INIT_FORM);
  const [jobs, setJobs] = useState([]);

  // 입력 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 일정 등록 버튼
  const handleSubmit = (e) => {
    e.preventDefault();
    // 최소 필수값 체크 (날짜, 고객명, 주소 정도만)
    if (!form.date || !form.customerName || !form.address) {
      alert("날짜, 고객명, 주소는 필수입니다.");
      return;
    }

    const newJob = {
      id: Date.now(),
      ...form,
    };

    setJobs((prev) => [newJob, ...prev]);
    setForm(INIT_FORM);
  };

  return (
    <div className="panel">
      <h2>📅 한플 일정 / 시공현장 등록</h2>
      <p className="panel-sub">
        상담 → 계약 완료된 건을 이 화면에서 시공 일정으로 등록합니다.
        (나중에 실제 달력·시공팀·정산과 자동 연결됩니다)
      </p>

      {/* 일정등록 폼 */}
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
              placeholder="예: A팀 / 김철수팀"
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
          <button type="submit" className="primary-btn">
            ✅ 일정 등록
          </button>
        </div>
      </form>

      {/* 등록된 일정 목록 */}
      <div className="job-list">
        <h3>📋 오늘까지 등록된 시공 일정</h3>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
