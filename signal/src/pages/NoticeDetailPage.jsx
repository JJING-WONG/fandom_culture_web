import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

/* ======================
      Styled Components
======================= */

const PageContainer = styled.div`
  max-width: 800px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 20px;
`;

const InfoCard = styled.div`
  background: #f4f7fc;
  border: 2px solid #d8e2f1;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
`;

const InfoItem = styled.p`
  margin: 6px 0;
  font-size: 16px;
  color: #444;
`;

const ContentArea = styled.div`
  background: white;
  border: 2px solid #e3e8ef;
  border-radius: 12px;
  padding: 24px;
  min-height: 200px;
  line-height: 1.65;
  font-size: 17px;
  color: #333;
  white-space: pre-line;
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
      Dummy Notice Data
======================= */

const notices = [
  {
    id: 1,
    title: "2025 팬미팅 서울 개최 안내",
    category: "팬미팅",
    date: "2025-02-14",
    place: "서울 올림픽홀",
    content:
      "2025 팬미팅이 서울 올림픽홀에서 진행됩니다.\n\n" +
      "티켓 오픈일: 2025-01-20\n" +
      "자세한 사항은 추후 공지 예정입니다.\n" +
      "많은 관심 부탁드립니다!",
  },
  {
    id: 2,
    title: "신 OST 'Remember Me' 발매 일정",
    category: "OST",
    date: "2025-03-01",
    content:
      "드라마 신 OST 'Remember Me'가 공식 발매됩니다.\n" +
      "작곡: OOO\n가창: OOO\n\n" +
      "음원 사이트에서 확인 가능합니다.",
  },
  {
    id: 3,
    title: "드라마 비하인드 전시회 오픈 안내",
    category: "전시회",
    date: "2025-04-10",
    place: "서울 전시센터",
    content:
      "드라마 제작 비하인드 전시회가 열립니다.\n" +
      "촬영 소품, 미공개 사진, 인터뷰 영상 등 다양한 콘텐츠가 공개됩니다.\n" +
      "관람 시간: 오전 10시 ~ 오후 6시",
  },
  {
    id: 4,
    title: "팬 참여 이벤트 - ‘사건 파일 찾기’",
    category: "이벤트",
    date: "2025-02-28",
    content:
      "드라마 속 단서를 기반으로 한 팬 참여 이벤트가 진행됩니다.\n" +
      "온라인 퀘스트를 완료하면 특별한 굿즈를 받을 수 있습니다.",
  },
];

/* ======================
         Component
======================= */

export default function NoticeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const notice = notices.find((n) => n.id === Number(id));

  if (!notice) {
    return (
      <>
        <Header />
        <PageContainer>
          <h2>해당 공지사항을 찾을 수 없습니다.</h2>
          <BackButton onClick={() => navigate("/notice")}>뒤로가기</BackButton>
        </PageContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <PageContainer>
        <Title>{notice.title}</Title>

        <InfoCard>
          <InfoItem>
            <strong>카테고리:</strong> {notice.category}
          </InfoItem>
          <InfoItem>
            <strong>날짜:</strong> {notice.date}
          </InfoItem>
          {notice.place && (
            <InfoItem>
              <strong>장소:</strong> {notice.place}
            </InfoItem>
          )}
        </InfoCard>

        <ContentArea>{notice.content}</ContentArea>

        <BackButton onClick={() => navigate("/notice")}>
          목록으로 돌아가기
        </BackButton>
      </PageContainer>

      <Footer />
    </>
  );
}