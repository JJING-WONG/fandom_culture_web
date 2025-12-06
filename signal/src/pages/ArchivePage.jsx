import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ======================
      Styled Components
======================= */

const PageContainer = styled.div`
  max-width: 900px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 24px;
`;

const TabRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-bottom: 3px solid
    ${({ active }) => (active ? "#003976" : "transparent")};
  background: none;
  font-size: 18px;
  font-weight: 700;
  color: ${({ active }) => (active ? "#003976" : "#555")};
  cursor: pointer;
`;

const EpisodeCard = styled.div`
  background: ${({ available }) => (available ? "white" : "#f2f4f7")};
  border: 2px solid #e2e8f4;
  border-radius: 12px;
  padding: 18px 22px;
  margin-bottom: 16px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.05);
  cursor: ${({ available }) => (available ? "pointer" : "default")};
  opacity: ${({ available }) => (available ? 1 : 0.5)};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: ${({ available }) => (available ? "#003976" : "#e2e8f4")};
  }
`;

const EpisodeTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const LockTag = styled.div`
  background: #999;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: white;
`;

const AvailableTag = styled.div`
  background: #003976;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: white;
`;

/* ======================
      Episode Data
======================= */

const season1Data = [
  { id: 1, title: "1화 - 공원 실종 사건" },
  { id: 2, title: "2화 - 지하철 추격전" },
  { id: 3, title: "3화 - 사라진 목격자" },
  { id: 4, title: "4화 - 범인의 단서" },
];

const season2Data = [
  { id: 1, title: "1화 - 새로운 단서", available: true },
  { id: 2, title: "2화 - 그림자 속의 인물", available: true },
  { id: 3, title: "3화 - ???", available: false },
  { id: 4, title: "4화 - ???", available: false },
];

/* ======================
        Component
======================= */

export default function ArchivePage() {
  const navigate = useNavigate();
  const [season, setSeason] = useState(1);

  const data = season === 1 ? season1Data : season2Data;

  return (
    <>
      <Header />

      <PageContainer>
        <Title>기록저장실</Title>

        {/* 시즌 탭 */}
        <TabRow>
          <TabButton active={season === 1} onClick={() => setSeason(1)}>
            시즌 1
          </TabButton>
          <TabButton active={season === 2} onClick={() => setSeason(2)}>
            시즌 2
          </TabButton>
        </TabRow>

        {/* 에피소드 목록 */}
        {data.map((ep) => (
          <EpisodeCard
            key={ep.id}
            available={ep.available ?? true}
            onClick={() => {
              if (ep.available ?? true) navigate(`/archive/${season}/${ep.id}`);
            }}
          >
            <EpisodeTitle>{ep.title}</EpisodeTitle>

            {season === 2 && ep.available ? (
              <AvailableTag>공개됨</AvailableTag>
            ) : season === 2 && !ep.available ? (
              <LockTag>방영 예정</LockTag>
            ) : (
              <AvailableTag>완료</AvailableTag>
            )}
          </EpisodeCard>
        ))}
      </PageContainer>

      <Footer />
    </>
  );
}