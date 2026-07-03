import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Domains } from "./pages/Domains";
import { DomainDetail } from "./pages/DomainDetail";
import { Writing } from "./pages/Writing";
import { Speaking } from "./pages/Speaking";
import { Teachers } from "./pages/Teachers";
import { LessonLogs } from "./pages/LessonLogs";
import { Trainer } from "./pages/Trainer";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/domains/:domainId" element={<DomainDetail />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/logs" element={<LessonLogs />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
