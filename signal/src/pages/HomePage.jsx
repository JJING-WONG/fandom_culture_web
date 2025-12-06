// src/pages/HomePage.jsx
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import styled from "styled-components";
import { usePosts } from "../context/PostsContext";
import { useCommunity } from "../context/CommunityContext";
import { useNavigate } from "react-router-dom";

/* ======================
      Styled Components
======================= */

const Section = styled.section`
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 20px;
`;

const CardRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  flex: 1 1 calc(33.33% - 20px);
  min-width: 260px;
  background: white;
  border: 2px solid #e2e8f4;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;

  &:hover {
    border-color: #003976;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardInfo = styled.p`
  font-size: 14px;
  color: #666;
`;

const Button = styled.button`
  background-color: #003976;
  color: #fff;
  padding: 10px 18px;
  border: none;
  margin-top: 20px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #002d63;
  }
`;

/* ======================
        HomePage
======================= */

export default function HomePage() {
  const navigate = useNavigate();

  // 사건분석연구소 전역 데이터
  const { posts: labPosts } = usePosts();

  // 국민신문고 전역 데이터
  const { posts: petitionPosts } = useCommunity();

  // 공지사항(더미)
  const noticeDummy = [
    { id: 1, title: "2025 팬미팅 안내", date: "2025-02-14" },
    { id: 2, title: "OST 발매 일정 공지", date: "2025-03-01" },
    { id: 3, title: "비하인드 전시회 개최", date: "2025-04-10" },
  ];

  return (
    <>
      <Header />
      <Carousel />

      {/* ======================
            섹션 1 - 사건분석연구소
      ======================= */}
      <Section>
        <SectionTitle>🕵️ 사건분석연구소 최신 분석글</SectionTitle>
        <CardRow>
          {labPosts.slice(-3).reverse().map((post) => (
            <Card key={post.id} onClick={() => navigate(`/lab/${post.id}`)}>
              <CardTitle>{post.title}</CardTitle>
              <CardInfo>{post.author} · {post.date}</CardInfo>
            </Card>
          ))}
        </CardRow>
        <Button onClick={() => navigate("/lab")}>전체 분석 보러가기</Button>
      </Section>

      {/* ======================
            섹션 2 - 국민신문고 커뮤니티
      ======================= */}
      <Section>
        <SectionTitle>💬 국민신문고 인기 게시글</SectionTitle>
        <CardRow>
          {petitionPosts
            .slice() // 복사
            .sort((a, b) => b.likes - a.likes) // 좋아요순 정렬
            .slice(0, 3)
            .map((post) => (
              <Card key={post.id} onClick={() => navigate(`/petition/${post.id}`)}>
                <CardTitle>{post.title}</CardTitle>
                <CardInfo>
                  {post.author} · ❤️ {post.likes}
                </CardInfo>
              </Card>
            ))}
        </CardRow>
        <Button onClick={() => navigate("/petition")}>커뮤니티 가기</Button>
      </Section>

      {/* ======================
            섹션 3 - 공지사항
      ======================= */}
      <Section>
        <SectionTitle>📢 공지사항</SectionTitle>
        <CardRow>
          {noticeDummy.map((notice) => (
            <Card key={notice.id} onClick={() => navigate(`/notice/${notice.id}`)}>
              <CardTitle>{notice.title}</CardTitle>
              <CardInfo>{notice.date}</CardInfo>
            </Card>
          ))}
        </CardRow>
        <Button onClick={() => navigate("/notice")}>공지 전체보기</Button>
      </Section>

      {/* ======================
            섹션 4 - 기록저장실
      ======================= */}
      <Section>
        <SectionTitle>📂 기록저장실</SectionTitle>
        <CardRow>
          <Card onClick={() => navigate("/archive/1/1")}>
            <CardTitle>시즌 1 대표 사건</CardTitle>
            <CardInfo>1화 - 공원 실종 사건</CardInfo>
          </Card>

          <Card onClick={() => navigate("/archive/2/1")}>
            <CardTitle>시즌 2 현재 진행</CardTitle>
            <CardInfo>1화 - 새로운 단서</CardInfo>
          </Card>
        </CardRow>
        <Button onClick={() => navigate("/archive")}>기록저장실 가기</Button>
      </Section>

      <Footer />
    </>
  );
}