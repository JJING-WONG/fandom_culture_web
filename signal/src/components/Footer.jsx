// src/components/Footer.jsx
import styled from "styled-components";

const FooterWrap = styled.footer`
  width: 100%;
  background-color: #222;
  padding: 40px 20px;
  color: #ddd;
  text-align: center;
  margin-top: 80px;
`;

const FooterNotice = styled.p`
  font-size: 1em;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 700px;
  margin: 0 auto;
`;

export default function Footer() {
  return (
    <FooterWrap>
      <FooterNotice>
        본 사이트는 교육 목적의 성공회대학교 수업 발표 참고자료로 제작되었으며,<br />
        상업적 용도로 사용되지 않습니다. 또한 발표일 이후 이 웹사이트의 url 배포는 중단될 예정입니다.
      </FooterNotice>
    </FooterWrap>
  );
}