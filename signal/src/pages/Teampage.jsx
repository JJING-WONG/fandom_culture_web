// src/pages/TeamPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import orgImg from "../assets/organization.jpeg";  // ⭐ 실제 조직도 이미지 import

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

const OrgChartImage = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 2px solid #003976;
  background-color: #f0f4fb;

  /* 내부 이미지 스타일 */
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: contain;
  }
`;

export default function TeamPage() {
  return (
    <>
      <Header />

      <PageContainer>
        <Title>팀 조직도</Title>

        <OrgChartImage>
          <img src={orgImg} alt="팀 조직도" />
        </OrgChartImage>
      </PageContainer>

      <Footer />
    </>
  );
}