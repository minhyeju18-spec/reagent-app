import { useMemo, useState } from "react";
import "./App.css";

const STUDENT_PW = "student1234";
const TEACHER_PW = "teacher1234";

const rules = {
  염산: ["HCl", "부식성", "산 전용 보관함", "염기, 금속과 분리", "보안경, 장갑, 실험복"],
  황산: ["H₂SO₄", "강한 부식성", "산 전용 보관함", "물, 염기와 분리", "보안경, 내화학 장갑, 실험복"],
  질산: ["HNO₃", "부식성 · 산화성", "산화성 물질 보관함", "유기물, 환원제와 분리", "보안경, 장갑, 실험복"],
  수산화나트륨: ["NaOH", "부식성", "염기 전용 보관함", "산성 물질과 분리", "보안경, 장갑, 실험복"],
  에탄올: ["C₂H₅OH", "인화성", "인화성 물질 보관함", "화기, 산화제와 분리", "보안경, 장갑, 환기"],
  메탄올: ["CH₃OH", "인화성 · 유해성", "인화성 물질 보관함", "화기, 산화제와 분리", "보안경, 장갑, 환기"],
  아세톤: ["C₃H₆O", "높은 인화성", "인화성 물질 보관함", "화기, 산화제와 분리", "보안경, 장갑, 환기"],
  과산화수소: ["H₂O₂", "산화성", "산화제 전용 보관함", "가연성 물질, 금속분말과 분리", "보안경, 장갑, 실험복"],
};

const startReagents = [
  { id: 1, name: "Ca(OH)₂", location: "LEFT", manager: "과학실" },
  { id: 2, name: "베이킹소다", location: "LEFT", manager: "과학실" },
  { id: 3, name: "CuSO₄·5H₂O", location: "LEFT", manager: "과학실" },
  { id: 4, name: "CH₂Cl₂", location: "LEFT", manager: "과학실" },
  { id: 5, name: "글리세린", location: "LEFT", manager: "과학실" },
  { id: 6, name: "물풀", location: "LEFT", manager: "과학실" },
  { id: 7, name: "Na₂SO₃", location: "LEFT", manager: "과학실" },
  { id: 8, name: "CH₃COOH", location: "LEFT", manager: "과학실" },
  { id: 9, name: "생리식염수", location: "LEFT", manager: "과학실" },
  { id: 10, name: "소듐 알지네이트", location: "LEFT", manager: "과학실" },
  { id: 11, name: "CuCO₃·Cu(OH)₂·H₂O", location: "LEFT", manager: "과학실" },
  { id: 12, name: "수단Ⅲ 용액", location: "LEFT", manager: "과학실" },
  { id: 13, name: "50% 에탄올", location: "LEFT", manager: "과학실" },
  { id: 14, name: "과산화수소", location: "LEFT", manager: "과학실" },
  { id: 15, name: "Biuret Reagent A", location: "LEFT", manager: "과학실" },
  { id: 16, name: "Biuret Reagent B", location: "LEFT", manager: "과학실" },
  { id: 17, name: "페놀프탈레인", location: "LEFT", manager: "과학실" },
  { id: 18, name: "LB Broth", location: "LEFT", manager: "과학실" },
  { id: 19, name: "KIO₃", location: "LEFT", manager: "과학실" },
  { id: 20, name: "MnO₂", location: "LEFT", manager: "과학실" },
  { id: 21, name: "루미놀", location: "LEFT", manager: "과학실" },
  { id: 22, name: "황", location: "LEFT", manager: "과학실" },
  { id: 23, name: "KOH", location: "LEFT", manager: "과학실" },
  { id: 24, name: "탈이온수", location: "LEFT", manager: "과학실" },
  { id: 25, name: "NaCl", location: "LEFT", manager: "과학실" },
  { id: 26, name: "ZnO", location: "LEFT", manager: "과학실" },
  { id: 27, name: "AgNO₃", location: "LEFT", manager: "과학실" },
  { id: 28, name: "MgSO₄", location: "LEFT", manager: "과학실" },
  { id: 29, name: "구연산", location: "LEFT", manager: "과학실" },
  { id: 30, name: "CaCl₂", location: "LEFT", manager: "과학실" },

  { id: 31, name: "NaHSO₃", location: "RIGHT", manager: "과학실" },
  { id: 32, name: "Na₂S₂O₃", location: "RIGHT", manager: "과학실" },
  { id: 33, name: "NaNO₃", location: "RIGHT", manager: "과학실" },
  { id: 34, name: "KH₂PO₄", location: "RIGHT", manager: "과학실" },
  { id: 35, name: "합성수지", location: "RIGHT", manager: "과학실" },
  { id: 36, name: "식용색소", location: "RIGHT", manager: "과학실" },
  { id: 37, name: "KI", location: "RIGHT", manager: "과학실" },
  { id: 38, name: "NaOH", location: "RIGHT", manager: "과학실" },
  { id: 39, name: "Bromothymol Blue", location: "RIGHT", manager: "과학실" },
  { id: 40, name: "에탄올", location: "RIGHT", manager: "과학실" },
  { id: 41, name: "KNO₃", location: "RIGHT", manager: "과학실" },
  { id: 42, name: "CaCO₃", location: "RIGHT", manager: "과학실" },
  { id: 43, name: "닌하이드린", location: "RIGHT", manager: "과학실" },
  { id: 44, name: "MnSO₄·H₂O", location: "RIGHT", manager: "과학실" },
  { id: 45, name: "KMnO₄", location: "RIGHT", manager: "과학실" },
  { id: 46, name: "Na₂S", location: "RIGHT", manager: "과학실" },
  { id: 47, name: "Ba(OH)₂·8H₂O", location: "RIGHT", manager: "과학실" },
  { id: 48, name: "헥세인", location: "RIGHT", manager: "과학실" },
  { id: 49, name: "포도당", location: "RIGHT", manager: "과학실" },
  { id: 50, name: "아세트산에틸", location: "RIGHT", manager: "과학실" },
  { id: 51, name: "인산", location: "RIGHT", manager: "과학실" },
  { id: 52, name: "베네딕트 용액", location: "RIGHT", manager: "과학실" },
  { id: 53, name: "Na₂CO₃", location: "RIGHT", manager: "과학실" },
  { id: 54, name: "CH₃COONa", location: "RIGHT", manager: "과학실" },
  { id: 55, name: "H₃BO₃", location: "RIGHT", manager: "과학실" },
  { id: 56, name: "Agar Powder", location: "RIGHT", manager: "과학실" },
  { id: 57, name: "알긴산", location: "RIGHT", manager: "과학실" },
  { id: 58, name: "Sr(NO₃)₂", location: "RIGHT", manager: "과학실" },
  { id: 59, name: "Urea", location: "RIGHT", manager: "과학실" },
  { id: 60, name: "케라틴", location: "RIGHT", manager: "과학실" },
  { id: 61, name: "TAE Buffer", location: "RIGHT", manager: "과학실" },
  { id: 62, name: "NaHCO₃", location: "RIGHT", manager: "과학실" },
  { id: 63, name: "포타슘아이오다이드 용액", location: "RIGHT", manager: "과학실" },
  { id: 64, name: "NH₃", location: "RIGHT", manager: "과학실" }
];

const startRequests = [
  {
    id: 101,
    studentName: "김하늘",
    studentId: "30201",
    title: "산염기 중화 반응 관찰",
    date: "2026-06-05",
    time: "15:30",
    reagents: "염산, 수산화나트륨",
    purpose: "중화 반응을 관찰하고 pH 변화를 확인한다.",
    safety: "보안경과 장갑을 착용하고 산과 염기를 분리하여 취급한다.",
    status: "대기",
  },
];

function getInfo(name) {
  const key = Object.keys(rules).find((x) => name.includes(x) || x.includes(name));
  if (!key) {
    return {
      formula: "정보 없음",
      risk: "추가 확인 필요",
      level: "판단 보류",
      storage: "담당 교사 확인",
      incompatible: "SDS 확인 필요",
      gear: "보안경, 장갑 권장",
      disposal: "담당 교사 지시에 따라 폐기",
      summary: "등록되지 않은 시약입니다. 실제 사용 전 SDS 자료 확인이 필요합니다.",
    };
  }

  const [formula, risk, storage, incompatible, gear] = rules[key];
  let level = "낮음";
  if (risk.includes("강한") || risk.includes("높은") || risk.includes("산화성")) level = "높음";
  else if (risk.includes("부식") || risk.includes("인화") || risk.includes("유해")) level = "중간";

  let disposal = "담당 교사 지시에 따라 분리 폐기";
  if (risk.includes("부식")) disposal = "산/염기성 폐액통에 분리 배출";
  if (risk.includes("인화")) disposal = "유기용매 폐액통에 분리 배출";
  if (risk.includes("산화")) disposal = "산화제 폐기 지침에 따라 별도 폐기";

  return {
    formula,
    risk,
    level,
    storage,
    incompatible,
    gear,
    disposal,
    summary: `${key}은/는 ${risk} 물질로 분류되어 ${storage}에 보관하는 것이 적절합니다.`,
  };
}

function daysLeft(date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date + "T00:00:00");
  return Math.ceil((target - now) / 86400000);
}

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
}

function planAnalyze(text, safety) {
  const detected = Object.keys(rules).filter((x) => text.includes(x));
  const infos = detected.map(getInfo);
  let level = "낮음";
  if (infos.some((x) => x.level === "높음")) level = "높음";
  else if (infos.some((x) => x.level === "중간")) level = "중간";

  let summary = "실험 계획서가 기본 조건을 충족합니다.";
  if (safety.trim().length < 10) summary = "안전 계획이 너무 짧습니다. 보호구, 폐액 처리, 사고 대응을 더 작성해야 합니다.";
  else if (level === "높음") summary = "위험도가 높은 시약이 포함되어 교사 확인이 꼭 필요합니다.";
  else if (level === "중간") summary = "부식성 또는 인화성 시약이 포함되어 보관과 폐액 처리를 확인해야 합니다.";

  return { detected: detected.join(", ") || "없음", level, summary };
}

export default function App() {
  const [role, setRole] = useState("");
  const [loginMode, setLoginMode] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");

  const [reagents, setReagents] = useState(startReagents);
  const [requests, setRequests] = useState(startRequests);
  const [query, setQuery] = useState("");

  const [form, setForm] = useState({ name: "", amount: "", unit: "mL", location: "", expiry: "", manager: "" });
  const [editId, setEditId] = useState(null);

  const [requestForm, setRequestForm] = useState({
    title: "",
    date: "",
    time: "",
    reagents: "",
    purpose: "",
    safety: "",
  });

  const filtered = useMemo(() => {
    return reagents.filter((r) => r.name.includes(query) || r.location.toLowerCase().includes(query.toLowerCase()));
  }, [query, reagents]);

  const dangerCount = reagents.filter((r) => ["중간", "높음"].includes(getInfo(r.name).level)).length;
  const expireCount = reagents.filter((r) => daysLeft(r.expiry) <= 30).length;
  const pendingCount = requests.filter((r) => r.status === "대기").length;

  function studentLogin(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name").trim();
    const studentId = fd.get("studentId").trim();
    const pw = fd.get("pw");

    if (!name || !studentId) return setMessage("이름과 학번을 입력하세요.");
    if (pw !== STUDENT_PW) return setMessage("학생 비밀번호는 student1234 입니다.");

    setStudent({ name, studentId });
    setRole("student");
    setMessage("");
  }

  function teacherLogin(e) {
    e.preventDefault();
    const pw = new FormData(e.currentTarget).get("pw");
    if (pw !== TEACHER_PW) return setMessage("선생님 비밀번호는 teacher1234 입니다.");
    setRole("teacher");
    setMessage("");
  }

  function saveReagent(e) {
    e.preventDefault();
    if (!form.name || !form.amount || !form.location || !form.expiry) {
      return alert("시약명, 현재량, 위치, 유효기간은 필수입니다.");
    }

    const item = {
      name: form.name,
      amount: Number(form.amount),
      unit: form.unit,
      location: form.location,
      expiry: form.expiry,
      manager: form.manager || "미지정",
    };

    if (editId) {
      setReagents(reagents.map((r) => (r.id === editId ? { ...r, ...item } : r)));
      setEditId(null);
    } else {
      setReagents([...reagents, { id: Date.now(), ...item }]);
    }

    setForm({ name: "", amount: "", unit: "mL", location: "", expiry: "", manager: "" });
  }

  function editReagent(r) {
    setEditId(r.id);
    setForm({
      name: r.name,
      amount: String(r.amount),
      unit: r.unit,
      location: r.location,
      expiry: r.expiry,
      manager: r.manager,
    });
  }

  function submitRequest(e) {
    e.preventDefault();

    if (!requestForm.title || !requestForm.date || !requestForm.time || !requestForm.reagents || !requestForm.purpose || !requestForm.safety) {
      return setMessage("신청서의 모든 항목을 작성하세요.");
    }

    if (daysLeft(requestForm.date) < 3) {
      return setMessage(`실험일 기준 최소 3일 전부터 신청 가능합니다. 신청 가능 시작일: ${minDate()}`);
    }

    setRequests([
      ...requests,
      {
        id: Date.now(),
        studentName: student.name,
        studentId: student.studentId,
        ...requestForm,
        status: "대기",
      },
    ]);

    setRequestForm({ title: "", date: "", time: "", reagents: "", purpose: "", safety: "" });
    setMessage("신청서가 제출되었습니다.");
  }

  function reset() {
    setRole("");
    setLoginMode("");
    setStudent(null);
    setMessage("");
  }

  return (
    <div>
      <Hero stats={{ reagents: reagents.length, dangerCount, expireCount, pendingCount }} />

      <main className="container">
        {!role && (
          <>
            <section className="card">
              <h2>사용자 역할 선택</h2>
              <p className="sub">학생은 검색과 신청을, 선생님은 시약 관리와 신청 승인을 할 수 있습니다.</p>

              <div className="roleGrid">
                <button className="roleCard" onClick={() => setLoginMode("student")}>
                  <div className="icon">👩‍🔬</div>
                  <h3>학생으로 시작</h3>
                  <p>시약 검색 · AI 안전 정보 확인 · 과학실 사용 신청</p>
                </button>

                <button className="roleCard" onClick={() => setLoginMode("teacher")}>
                  <div className="icon">🧑‍🏫</div>
                  <h3>선생님으로 시작</h3>
                  <p>시약 등록 · 수정 · 삭제 · 신청 승인/반려</p>
                </button>
              </div>
            </section>

            {loginMode === "student" && (
              <section className="card">
                <h2>학생 로그인</h2>
                <form className="login" onSubmit={studentLogin}>
                  <input name="name" placeholder="이름" />
                  <input name="studentId" placeholder="학번" />
                  <input name="pw" type="password" placeholder="비밀번호" />
                  <button>로그인</button>
                </form>
                <p className="hint">예시 비밀번호: student1234</p>
              </section>
            )}

            {loginMode === "teacher" && (
              <section className="card">
                <h2>선생님 로그인</h2>
                <form className="login" onSubmit={teacherLogin}>
                  <input name="pw" type="password" placeholder="관리자 비밀번호" />
                  <button>로그인</button>
                </form>
                <p className="hint">예시 비밀번호: teacher1234</p>
              </section>
            )}
          </>
        )}

        {role && (
          <div className="topBar">
            <div>
              <p>현재 접속 권한</p>
              <h2>{role === "student" ? `${student.name} 학생` : "선생님 관리자"}</h2>
            </div>
            <button className="lightBtn" onClick={reset}>처음 화면</button>
          </div>
        )}

        {role === "student" && (
          <div className="two">
            <section className="card">
              <h2>시약 검색</h2>
              <Search query={query} setQuery={setQuery} />
              <ReagentList list={filtered} />
            </section>

            <section className="card">
              <h2>과학실 사용 신청</h2>
              <p className="sub">신청 가능 시작일: {minDate()}</p>

              <form className="form" onSubmit={submitRequest}>
                <Input label="실험 제목" value={requestForm.title} onChange={(v) => setRequestForm({ ...requestForm, title: v })} />
                <Input label="실험 날짜" type="date" min={minDate()} value={requestForm.date} onChange={(v) => setRequestForm({ ...requestForm, date: v })} />
                <Input label="실험 시간" type="time" value={requestForm.time} onChange={(v) => setRequestForm({ ...requestForm, time: v })} />
                <Text label="사용 예정 시약" value={requestForm.reagents} onChange={(v) => setRequestForm({ ...requestForm, reagents: v })} />
                <Text label="실험 목적" value={requestForm.purpose} onChange={(v) => setRequestForm({ ...requestForm, purpose: v })} />
                <Text label="안전 계획" value={requestForm.safety} onChange={(v) => setRequestForm({ ...requestForm, safety: v })} />
                {(requestForm.reagents || requestForm.safety) && <PlanBox data={planAnalyze(requestForm.reagents, requestForm.safety)} />}
                <button>신청서 제출하기</button>
              </form>

              <h3 className="sectionTitle">내 신청 현황</h3>
              <RequestList list={requests.filter((r) => r.studentId === student.studentId)} />
            </section>
          </div>
        )}

        {role === "teacher" && (
          <div className="teacher">
            <section className="card">
              <h2>시약 등록 및 수정</h2>
              <form className="form" onSubmit={saveReagent}>
                <Input label="시약명" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Input label="현재량" type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} />
                <label className="field">단위
                  <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                    <option>mL</option><option>L</option><option>g</option><option>kg</option>
                  </select>
                </label>
                <Input label="보관 위치" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
                <Input label="유효기간" type="date" value={form.expiry} onChange={(v) => setForm({ ...form, expiry: v })} />
                <Input label="담당자" value={form.manager} onChange={(v) => setForm({ ...form, manager: v })} />
                {form.name && <Analysis data={getInfo(form.name)} />}
                <button>{editId ? "수정 완료" : "시약 추가"}</button>
              </form>
            </section>

            <section className="card">
              <h2>시약 목록 관리</h2>
              <Search query={query} setQuery={setQuery} />
              <ReagentList
                list={filtered}
                teacher
                onEdit={editReagent}
                onDelete={(id) => setReagents(reagents.filter((r) => r.id !== id))}
              />
            </section>

            <section className="card full">
              <h2>학생 신청 확인</h2>
              <RequestList
                list={requests}
                teacher
                onStatus={(id, status) => setRequests(requests.map((r) => r.id === id ? { ...r, status } : r))}
              />
            </section>
          </div>
        )}

        {message && <p className="msg">{message}</p>}
      </main>
    </div>
  );
}

function Hero({ stats }) {
  return (
    <header className="hero">
      <div>
        <p className="badge">AI · DIGITAL SAFETY PROJECT</p>
        <h1>시약장을 부탁해</h1>
        <p className="maker">제작자 민혜주 · 황예음 · 강규빈</p>
        <p className="heroText">
          학생은 과학실 사용 신청과 실험 계획서를 제출하고, 선생님은 승인과 시약 관리를 수행합니다.
        </p>
      </div>

      <div className="stats">
        <Stat label="등록 시약" value={stats.reagents} />
        <Stat label="위험 시약" value={stats.dangerCount} />
        <Stat label="만료 임박" value={stats.expireCount} />
        <Stat label="승인 대기" value={stats.pendingCount} />
      </div>
    </header>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Search({ query, setQuery }) {
  return <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="시약명 또는 위치 검색" />;
}

function ReagentList({ list, teacher, onEdit, onDelete }) {
  if (!list.length) return <p className="empty">검색 결과가 없습니다.</p>;

  return (
    <div className="list">
      {list.map((r) => {
        const info = getInfo(r.name);
        const left = daysLeft(r.expiry);
        const status = left < 0 ? "유효기간 경과" : left <= 30 ? "만료 임박" : "정상";

        return (
          <article className="item" key={r.id}>
            <div className="itemTop">
              <div>
                <h3>{r.name} <span>{info.formula}</span></h3>
                <p>{r.amount}{r.unit} · {r.location} · 담당 {r.manager}</p>
              </div>
              <b className={`pill ${status === "정상" ? "green" : "red"}`}>{status}</b>
            </div>

            <div className="miniGrid">
              <Mini label="위험성" value={info.risk} />
              <Mini label="AI 위험도" value={info.level} />
              <Mini label="유효기간" value={r.expiry} />
            </div>

            <div className="detail">
              <p><b>권장 보관 위치:</b> {info.storage}</p>
              <p><b>함께 보관하면 위험한 물질:</b> {info.incompatible}</p>
              <p><b>권장 보호구:</b> {info.gear}</p>
              <p><b>폐기 방법:</b> {info.disposal}</p>
              <p className="ai">AI 요약: {info.summary}</p>
            </div>

            {teacher && (
              <div className="actions">
                <button className="lightBtn" onClick={() => onEdit(r)}>수정</button>
                <button className="dangerBtn" onClick={() => onDelete(r.id)}>삭제</button>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function RequestList({ list, teacher, onStatus }) {
  if (!list.length) return <p className="empty">신청 내역이 없습니다.</p>;

  return (
    <div className="list">
      {list.map((r) => {
        const a = planAnalyze(r.reagents, r.safety);

        return (
          <article className="item" key={r.id}>
            <div className="itemTop">
              <div>
                <h3>{r.title}</h3>
                <p>{r.studentName} ({r.studentId}) · {r.date} {r.time}</p>
              </div>
              <b className={`pill ${r.status === "승인" ? "green" : r.status === "반려" ? "red" : "yellow"}`}>{r.status}</b>
            </div>

            <div className="miniGrid twoMini">
              <Mini label="사용 예정 시약" value={r.reagents} />
              <Mini label="AI 실험 위험도" value={a.level} />
            </div>

            <div className="detail">
              <p><b>실험 목적:</b> {r.purpose}</p>
              <p><b>안전 계획:</b> {r.safety}</p>
              <p className="ai">AI 분석: {a.summary} / 인식된 시약: {a.detected}</p>
            </div>

            {teacher && (
              <div className="actions">
                <button className="okBtn" onClick={() => onStatus(r.id, "승인")}>승인</button>
                <button className="dangerBtn" onClick={() => onStatus(r.id, "반려")}>반려</button>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div className="mini">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", min }) {
  return (
    <label className="field">{label}
      <input type={type} min={min} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Text({ label, value, onChange }) {
  return (
    <label className="field">{label}
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Analysis({ data }) {
  return (
    <div className="analysis">
      <b>AI 분석 결과</b>
      <p>위험성: {data.risk}</p>
      <p>AI 위험도: {data.level}</p>
      <p>권장 보관 위치: {data.storage}</p>
      <p>함께 보관하면 위험한 물질: {data.incompatible}</p>
      <p>권장 보호구: {data.gear}</p>
      <p>폐기 방법: {data.disposal}</p>
      <p className="ai">{data.summary}</p>
    </div>
  );
}

function PlanBox({ data }) {
  return (
    <div className="analysis">
      <b>AI 계획서 분석</b>
      <p>인식된 시약: {data.detected}</p>
      <p>실험 위험도: {data.level}</p>
      <p className="ai">{data.summary}</p>
    </div>
  );
}
