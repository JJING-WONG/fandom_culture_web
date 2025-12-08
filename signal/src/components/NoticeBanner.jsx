// src/components/NoticeBanner.jsx
import styled from "styled-components";

const BannerWrap = styled.div`
  width: 100%;
  background-color: #f4f6ff;        /* 은은한 파란색 톤 */
  border-bottom: 1px solid #d0d7e2;
  padding: 12px 20px;
  text-align: center;
`;

const BannerText = styled.p`
  font-size: 14px;
  color: #003976;
  font-weight: 600;
  margin: 0;
`;

export default function NoticeBanner() {
  return (
    <BannerWrap>
      <BannerText>
        이 웹사이트는 PC 해상도에 최적화되어 있습니다. 
        모바일에서도 열람 가능하지만 일부 요소가 최적화되지 않을 수 있습니다.
      </BannerText>
    </BannerWrap>
  );
}