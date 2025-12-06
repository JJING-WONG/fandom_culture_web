// src/App.jsx
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TeamPage from "./pages/Teampage";
import LabPage from "./pages/LabPage";
import NoticePage from "./pages/NoticePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import ArchivePage from "./pages/ArchivePage";
import ArchiveDetailPage from "./pages/ArchiveDetailPage";
import PetitionPage from "./pages/PetitionPage";
import MdPage from "./pages/MdPage";
import WritePage from "./pages/WritePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import PetitionWritePage from "./pages/PetitionWritePage";
import PetitionDetailPage from "./pages/PetitionDetailPage";
import PetitionEditPage from "./pages/PetitionEditPage";
import MdDetailPage from "./pages/MdDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/team" element={<TeamPage />} />
      <Route path="/lab" element={<LabPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/notice/:id" element={<NoticeDetailPage />} />
      <Route path="/archive" element={<ArchivePage />} />
      <Route path="/archive/:season/:epId" element={<ArchiveDetailPage />} />
      <Route path="/petition" element={<PetitionPage />} />
      <Route path="/petition/write" element={<PetitionWritePage />} />
      <Route path="/petition/:id" element={<PetitionDetailPage />} />
      <Route path="/petition/edit/:id" element={<PetitionEditPage />} />
      <Route path="/md" element={<MdPage />} />
      <Route path="/md/:id" element={<MdDetailPage />} />
      <Route path="/lab/write" element={<WritePage />} />
      <Route path="/lab/:id" element={<DetailPage />} />
      <Route path="/lab/edit/:id" element={<EditPage />} />
    </Routes>
  );
}