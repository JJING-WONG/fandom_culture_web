import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

/* ======================
      Styled Components
======================= */

const PageContainer = styled.div`
  max-width: 900px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  background: #f4f7fc;
  border: 2px solid #d8e2f1;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 28px;
`;

const InfoItem = styled.p`
  margin: 6px 0;
  font-size: 16px;
  color: #444;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 12px;
`;

const ContentBox = styled.div`
  background: white;
  border: 2px solid #e3e8ef;
  border-radius: 12px;
  padding: 20px;
  font-size: 17px;
  color: #333;
  line-height: 1.65;
  white-space: pre-line;
`;

const ClueList = styled.ul`
  padding-left: 20px;
`;

const ClueItem = styled.li`
  font-size: 16px;
  margin-bottom: 6px;
  color: #333;
`;

const BackButton = styled.button`
  margin-top: 20px;
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

/* ======================
   Episode Detail Data
======================= */
/* 
  실제로는 시리즈에 따라 상세내용이 다를 수 있기 때문에
  지금은 예시 데이터를 시즌/회차로 구분하여 넣어줄게.
  나중에 이 파일만 수정하면 내용 바뀜.
*/

const archiveDetails = {
  1: {
    1: {
      title: "1화 - 공원 실종 사건",
      summary:
        "한 시민이 공원에서 실종되는 사건으로 시작합니다.\n" +
        "현장에는 의문의 발자국과 찢어진 메모 조각이 발견됩니다.",
      clues: [
        "공원 벤치 옆에서 발견된 발자국",
        "찢어진 메모 조각",
        "목격자가 남긴 흐릿한 증언",
      ],
    },
    2: {
      title: "2화 - 지하철 추격전",
      summary:
        "용의자가 지하철에서 도주하는 사건.\n" +
        "CCTV와 승객들의 증언을 토대로 용의자의 이동 경로를 파악합니다.",
      clues: [
        "지하철 CCTV",
        "용의자가 남긴 흔적",
        "역무원의 진술",
      ],
    },
  },

  2: {
    1: {
      title: "1화 - 새로운 단서",
      summary:
        "새로운 사건이 발생하며 시즌 1의 흔적과 연결됩니다.\n" +
        "의문의 편지가 팀에게 전달됩니다.",
      clues: [
        "익명의 발신자가 보낸 편지",
        "편지에 적힌 코드",
      ],
    },
    2: {
      title: "2화 - 그림자 속의 인물",
      summary:
        "한 인물이 사건 배후에 연관된 것으로 보이지만 정체는 미궁.\n" +
        "감시카메라에 포착된 그림자만이 단서입니다.",
      clues: [
        "감시카메라 그림자",
        "추적 불가능한 경로",
      ],
    },
  },
};

export default function ArchiveDetailPage() {
  const { season, epId } = useParams();
  const navigate = useNavigate();

  const seasonData = archiveDetails[season];
  const episode = seasonData ? seasonData[epId] : null;

  if (!episode) {
    return (
      <>
        <Header />
        <PageContainer>
          <h2>해당 기록을 찾을 수 없습니다.</h2>
          <BackButton onClick={() => navigate("/archive")}>뒤로가기</BackButton>
        </PageContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <PageContainer>
        <Title>{episode.title}</Title>

        <InfoBox>
          <InfoItem>
            <strong>시즌:</strong> {season}
          </InfoItem>
          <InfoItem>
            <strong>회차:</strong> {epId}화
          </InfoItem>
        </InfoBox>

        <Section>
          <SectionTitle>사건 요약</SectionTitle>
          <ContentBox>{episode.summary}</ContentBox>
        </Section>

        <Section>
          <SectionTitle>주요 단서</SectionTitle>
          <ContentBox>
            <ClueList>
              {episode.clues.map((clue, i) => (
                <ClueItem key={i}>{clue}</ClueItem>
              ))}
            </ClueList>
          </ContentBox>
        </Section>

        <BackButton onClick={() => navigate(`/archive`)}>
          기록 목록으로 돌아가기
        </BackButton>
      </PageContainer>

      <Footer />
    </>
  );
}