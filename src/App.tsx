import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { SkillPage } from "./pages/SkillPage";
import { DomainList } from "./pages/DomainList";
import { DomainDetail } from "./pages/DomainDetail";
import { TeacherList } from "./pages/TeacherList";
import { TeacherDetail } from "./pages/TeacherDetail";
import { TeacherBrief } from "./pages/TeacherBrief";
import { LessonLog } from "./pages/LessonLog";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hoeren" element={<SkillPage sectionId="hoeren" />} />
          <Route path="/lesen" element={<SkillPage sectionId="lesen" />} />
          <Route path="/schreiben" element={<SkillPage sectionId="schreiben" />} />
          <Route path="/sprechen" element={<SkillPage sectionId="sprechen" />} />
          <Route path="/domains" element={<DomainList />} />
          <Route path="/domains/:domainId" element={<DomainDetail />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/brief" element={<TeacherBrief />} />
          <Route path="/teachers/:teacherId" element={<TeacherDetail />} />
          <Route path="/log" element={<LessonLog />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
