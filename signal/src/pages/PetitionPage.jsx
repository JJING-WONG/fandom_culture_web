// src/pages/PetitionPage.jsx

import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCommunity } from "../context/CommunityContext";

/* ======================
      Styled Components
======================= */

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #003976;
`;

const WriteButton = styled.button`
  background-color: #003976;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    background-color: #002e63;
  }
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
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

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Card = styled.div`
  background: white;
  border: 2px solid #e2e8f4;
  border-radius: 12px;
  padding: 20px 24px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.05);

  &:hover {
    border-color: #003976;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  }
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardInfo = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  gap: 16px;
`;

const Like = styled.span`
  margin-left: auto;
  font-size: 14px;
  font-weight: 600;
  color: #e63946;
`;

/* ======================
        Component
======================= */

export default function PetitionPage() {
  const navigate = useNavigate();

  // ⭐ 전역 커뮤니티 데이터 불러오기
  const { posts } = useCommunity();

  const [category, setCategory] = useState("전체");

  const filtered =
    category === "전체"
      ? posts
      : posts.filter((p) => p.category === category);

  return (
    <>
      <Header />

      <PageContainer>
        <TitleRow>
          <PageTitle>국민신문고 커뮤니티</PageTitle>
          <WriteButton onClick={() => navigate("/petition/write")}>
            + 글쓰기
          </WriteButton>
        </TitleRow>

        {/* 카테고리 */}
        <CategoryRow>
          {["전체", "자유", "질문", "정보", "팬아트"].map((cat) => (
            <CategoryButton
              key={cat}
              active={cat === category}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryRow>

        {/* 게시글 목록 */}
        <CardList>
          {filtered.map((post) => (
            <Card
              key={post.id}
              onClick={() => navigate(`/petition/${post.id}`)}
            >
              <CardTitle>{post.title}</CardTitle>

              <CardInfo>
                <span>{post.author}</span>
                <span>{post.date}</span>
                <Like>❤️ {post.likes}</Like>
              </CardInfo>
            </Card>
          ))}
        </CardList>
      </PageContainer>

      <Footer />
    </>
  );
}