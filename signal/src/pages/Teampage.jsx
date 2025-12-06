// src/pages/TeamPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";

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
  margin-bottom: 32px;
  color: #003976;
`;

const OrgChartPlaceholder = styled.div`
  width: 100%;
  height: 600px;          /* 조직도 이미지 크기 대체 */
  background-color: #e8eef7;  /* 경찰 느낌의 파스텔 블루 */
  border: 2px dashed #003976;
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  color: #003976;
  font-weight: 600;
`;

export default function TeamPage() {
  return (
    <>
      <Header />

      <PageContainer>
        <Title>팀 조직도</Title>

        <OrgChartPlaceholder>
          조직도 이미지 영역 (추후 이미지로 교체 예정)
        </OrgChartPlaceholder>
      </PageContainer>

      <Footer />
    </>
  );
}