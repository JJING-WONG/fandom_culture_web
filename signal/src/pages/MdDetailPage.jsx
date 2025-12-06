import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

// ⭐ 이미지 import
import radioImg from "../assets/radio.png";
import cardImg from "../assets/card.png";
import fileImg from "../assets/file.png";
import notebookImg from "../assets/notebook.png";
import packageImg from "../assets/package.png";
import ostImg from "../assets/ost.jpeg";

const PageContainer = styled.div`
  max-width: 700px;
  margin: 60px auto 80px;
  padding: 0 16px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 30px;
`;

const ImageBox = styled.div`
  background: #f1f5fb;
  border-radius: 16px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  img {
    max-height: 90%;
    max-width: 90%;
    object-fit: contain;
  }
`;

const Message = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #555;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  background-color: #003976;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #002d63;
  }
`;

// ⭐ 상품명 + 이미지 매핑
const itemData = {
  1: { name: "무전기", image: radioImg },
  2: { name: "공무원증", image: cardImg },
  3: { name: "경찰 수첩", image: notebookImg },
  4: { name: "사건 파일", image: fileImg },
  5: { name: "OST 패키지", image: ostImg },
  6: { name: "5종 세트", image: packageImg },
};

export default function MdDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = itemData[id];

  return (
    <>
      <Header />

      <PageContainer>
        <Title>{item.name}</Title>

        <ImageBox>
          <img src={item.image} alt={item.name} />
        </ImageBox>

        <Message>
          상품 준비 중입니다.<br />
          COMING SOON…
        </Message>

        <BackButton onClick={() => navigate("/md")}>
          ← 목록으로 돌아가기
        </BackButton>
      </PageContainer>

      <Footer />
    </>
  );
}