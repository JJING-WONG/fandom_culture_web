// src/pages/LabPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";

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

export default function LabPage() {
  const navigate = useNavigate();
  const { posts } = usePosts();  // ⭐ 전역 데이터 가져오기

  return (
    <>
      <Header />

      <PageContainer>
        <TitleRow>
          <PageTitle>사건분석연구소</PageTitle>
          <WriteButton onClick={() => navigate("/lab/write")}>
            + 분석 올리기
          </WriteButton>
        </TitleRow>

        <CardList>
          {posts.map((post) => (
            <Card 
              key={post.id} 
              onClick={() => navigate(`/lab/${post.id}`)}
            >
              <CardTitle>{post.title}</CardTitle>
              <CardInfo>
                <span>작성자: {post.author}</span>
                <span>작성일: {post.date}</span>
              </CardInfo>
            </Card>
          ))}
        </CardList>
      </PageContainer>

      <Footer />
    </>
  );
}