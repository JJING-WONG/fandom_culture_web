import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ======================
      Styled Components
======================= */

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 24px;
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: 2px solid #003976;
  border-radius: 20px;
  background: ${({ active }) => (active ? "#003976" : "white")};
  color: ${({ active }) => (active ? "white" : "#003976")};
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #003976;
    color: white;
  }
`;

const NoticeCard = styled.div`
  background: white;
  border: 2px solid #e2e8f4;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.05);

  &:hover {
    border-color: #003976;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  }
`;

const NoticeTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const NoticeInfo = styled.div`
  font-size: 14px;
  color: #555;
  display: flex;
  gap: 12px;
`;

/* ======================
      Dummy Notice Data
======================= */

const notices = [
  {
    id: 1,
    title: "2025 팬미팅 서울 개최 안내",
    category: "팬미팅",
    date: "2026-07-14",
    place: "서울 올림픽홀",
  },
  {
    id: 2,
    title: "신 OST 'Remember Me' 발매 일정",
    category: "OST",
    date: "2026-07-01",
  },
  {
    id: 3,
    title: "드라마 비하인드 전시회 오픈 안내",
    category: "전시회",
    date: "2026-07-10",
    place: "서울 전시센터",
  },
  {
    id: 4,
    title: "팬 참여 이벤트 - ‘사건 파일 찾기’",
    category: "이벤트",
    date: "2026-07-28",
  },
  {
    id: 5,
    title: "팝업스토어 OPEN 안내",
    category: "이벤트",
    date: "2026-05-28",
  },
];

export default function NoticePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("전체");

  const filtered =
    category === "전체"
      ? notices
      : notices.filter((n) => n.category === category);

  return (
    <>
      <Header />

      <PageContainer>
        <Title>공지사항</Title>

        {/* 카테고리 필터 */}
        <CategoryRow>
          {["전체", "이벤트", "OST", "전시회", "팬미팅"].map((cat) => (
            <CategoryButton
              key={cat}
              active={cat === category}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryRow>

        {/* 공지 목록 */}
        {filtered.map((notice) => (
          <NoticeCard
            key={notice.id}
            onClick={() => navigate(`/notice/${notice.id}`)}
          >
            <NoticeTitle>{notice.title}</NoticeTitle>
            <NoticeInfo>
              <span>{notice.category}</span>
              <span>{notice.date}</span>
              {notice.place && <span>{notice.place}</span>}
            </NoticeInfo>
          </NoticeCard>
        ))}
      </PageContainer>

      <Footer />
    </>
  );
}