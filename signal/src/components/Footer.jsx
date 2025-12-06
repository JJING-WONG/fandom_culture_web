// src/components/Footer.jsx
import styled from "styled-components";

const FooterWrap = styled.footer`
  width: 100%;
  background-color: #222;
  padding: 40px 0;
  color: #ddd;
  text-align: center;
  margin-top: 80px;
`;

const FooterTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const FooterText = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
  opacity: 0.9;
`;

const FooterCopy = styled.p`
  font-size: 13px;
  opacity: 0.7;
  margin-top: 8px;
`;

export default function Footer() {
  return (
    <FooterWrap>
      <FooterTitle>경찰청 POLICE</FooterTitle>
      <FooterText>서울특별시 서대문구 통일로 97 | 대표전화 182</FooterText>
      <FooterCopy>© 2025 경찰청 All Rights Reserved.</FooterCopy>
    </FooterWrap>
  );
}