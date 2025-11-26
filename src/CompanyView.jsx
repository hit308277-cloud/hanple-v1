// src/CompanyView.jsx

function CompanyView({ company, setCompany, employees, setEmployees }) {
  const handleCompanyChange = (field, value) => {
    setCompany((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = (form.get("name") || "").trim();
    const role = (form.get("role") || "").trim();
    const status = form.get("status") || "재직";

    if (!name) {
      alert("직원 이름은 필수입니다.");
      return;
    }

    const newEmp = {
      id: Date.now(),
      name,
      role: role || "직원",
      status,
      permissions: {
        calendar: true,
        workdone: role.includes("시공") ? true : false,
        settlement: role.includes("정산") ? true : false,
        warehouse: role.includes("창고") ? true : false,
        contract: role.includes("상담") ? true : false,
        chat: true,
        blogWrite: role.includes("블로그손") || role.includes("손발") ? true : false,
        blogApprove: role.includes("블로그머리") || role.includes("머리") ? true : false,
      },
    };

    setEmployees((prev) => [newEmp, ...prev]);
    e.target.reset();
  };

  const handleStatusChange = (id, status) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, status } : emp
      )
    );
  };

  const togglePermission = (id, key) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              permissions: {
                ...emp.permissions,
                [key]: !emp.permissions[key],
              },
            }
          : emp
      )
    );
  };

  return (
    <div className="panel">
      <h2>🏢 회사 / 직원·권한 관리</h2>
      <p className="panel-sub">
        사업자 기본 정보, 한플 요금제(유료/무료) 설정, 직원 계정 등록 및
        &quot;머리 / 손발&quot; 블로그 권한 등을 관리하는 화면입니다.
        (지금은 화면 뼈대이며, 나중에 서버·회원가입 기능과 연동 예정)
      </p>

      {/* 회사 정보 */}
      <section className="company-section">
        <h3>1️⃣ 회사(사업자) 기본 정보</h3>

        <div className="company-grid">
          <div className="company-field">
            <label>상호</label>
            <input
              type="text"
              value={company.name}
              onChange={(e) => handleCompanyChange("name", e.target.value)}
              placeholder="예: 한성시스템에어컨(주)"
            />
          </div>
          <div className="company-field">
            <label>사업자등록번호</label>
            <input
              type="text"
              value={company.bizNo}
              onChange={(e) => handleCompanyChange("bizNo", e.target.value)}
              placeholder="예: 000-00-00000"
            />
          </div>
          <div className="company-field">
            <label>대표자</label>
            <input
              type="text"
              value={company.owner}
              onChange={(e) => handleCompanyChange("owner", e.target.value)}
              placeholder="예: 정성권"
            />
          </div>
          <div className="company-field">
            <label>업종</label>
            <input
              type="text"
              value={company.industry}
              onChange={(e) => handleCompanyChange("industry", e.target.value)}
              placeholder="예: 시스템에어컨 / 설비"
            />
          </div>
          <div className="company-field full">
            <label>주소</label>
            <input
              type="text"
              value={company.address}
              onChange={(e) => handleCompanyChange("address", e.target.value)}
              placeholder="사업장 주소"
            />
          </div>
          <div className="company-field">
            <label>한플 요금제</label>
            <select
              value={company.plan}
              onChange={(e) => handleCompanyChange("plan", e.target.value)}
            >
              <option value="무료">무료</option>
              <option value="유료-베이직">유료-베이직</option>
              <option value="유료-프로">유료-프로</option>
            </select>
          </div>
        </div>

        <p className="company-plan-info">
          현재 요금제: <strong>{company.plan}</strong>{" "}
          {company.plan === "무료" && "→ 모든 기능은 무료모드(테스트용)로 동작합니다."}
          {company.plan !== "무료" && "→ 결제/STO 기록 기능과 연결 예정입니다."}
        </p>
      </section>

      {/* 직원 등록 */}
      <section className="company-section">
        <h3>2️⃣ 직원 계정 등록 (입사)</h3>

        <form className="employee-form" onSubmit={handleAddEmployee}>
          <div className="job-form-row">
            <div className="job-field">
              <label>이름</label>
              <input
                type="text"
                name="name"
                placeholder="예: 김상담"
              />
            </div>
            <div className="job-field">
              <label>역할(직무)</label>
              <input
                type="text"
                name="role"
                placeholder="예: 상담 / 시공팀 / 정산 / 창고 / 블로그머리 / 블로그손발"
              />
            </div>
            <div className="job-field">
              <label>상태</label>
              <select name="status" defaultValue="재직">
                <option value="재직">재직</option>
                <option value="퇴사">퇴사</option>
              </select>
            </div>
          </div>

          <div className="job-form-actions">
            <button type="submit" className="primary-btn">
              직원 등록
            </button>
          </div>
        </form>
      </section>

      {/* 직원 / 권한 목록 */}
      <section className="company-section">
        <h3>3️⃣ 직원 목록 / 권한 설정</h3>

        {employees.length === 0 && (
          <p className="empty-text">
            아직 등록된 직원이 없습니다. 위에서 직원을 추가해 주세요.
          </p>
        )}

        {employees.length > 0 && (
          <div className="employee-table">
            <div className="employee-header-row">
              <div className="col-name">이름 / 역할</div>
              <div className="col-status">상태</div>
              <div className="col-perms">
                권한 (일정 / 시공완료 / 정산 / 창고 / 계약 / 한톡 / 블로그머리 / 블로그손발)
              </div>
            </div>

            {employees.map((emp) => (
              <div key={emp.id} className="employee-row">
                <div className="col-name">
                  <div className="emp-name">{emp.name}</div>
                  <div className="emp-role">{emp.role}</div>
                </div>

                <div className="col-status">
                  <select
                    value={emp.status}
                    onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                  >
                    <option value="재직">재직</option>
                    <option value="퇴사">퇴사</option>
                  </select>
                </div>

                <div className="col-perms">
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.permissions.calendar || false}
                      onChange={() => togglePermission(emp.id, "calendar")}
                    />
                    일정
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.permissions.workdone || false}
                      onChange={() => togglePermission(emp.id, "workdone")}
                    />
                    시공완료
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.permissions.settlement || false}
                      onChange={() => togglePermission(emp.id, "settlement")}
                    />
                    정산
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.permissions.warehouse || false}
                      onChange={() => togglePermission(emp.id, "warehouse")}
                    />
                    창고
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.permissions.contract || false}
                      onChange={() => togglePermission(emp.id, "contract")}
                    />
                    계약
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.permissions.chat || false}
                      onChange={() => togglePermission(emp.id, "chat")}
                    />
                    한톡
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.permissions.blogApprove || false}
                      onChange={() => togglePermission(emp.id, "blogApprove")}
                    />
                    블로그머리(승인)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={emp.permissions.blogWrite || false}
                      onChange={() => togglePermission(emp.id, "blogWrite")}
                    />
                    블로그손발(작성만)
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="panel-sub" style={{ marginTop: "8px" }}>
          블로그 머리(승인권자)는 글 검토·승인 후 게시만 가능, 손발은 글 작성만 가능하게
          나중에 블로그 모듈과 실제로 연동할 수 있습니다.
        </p>
      </section>
    </div>
  );
}

export default CompanyView;
