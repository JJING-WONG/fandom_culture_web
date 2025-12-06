import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCommunity } from "../context/CommunityContext";

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
  margin-bottom: 32px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #d0d7e2;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;

  &:focus {
    border-color: #003976;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #d0d7e2;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;

  &:focus {
    border-color: #003976;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 240px;
  padding: 12px;
  border: 2px solid #d0d7e2;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  resize: none;

  &:focus {
    border-color: #003976;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #003976;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
  float: right;

  &:hover {
    background-color: #002d63;
  }
`;

/* ======================
        Component
======================= */

export default function PetitionEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ⭐ 전역 CommunityContext 불러오기
  const { posts, dispatch } = useCommunity();

  // ⭐ 수정할 글 찾기
  const origin = posts.find((p) => p.id === Number(id));

  // 잘못된 URL 접근 대비
  if (!origin) {
    return (
      <>
        <Header />
        <PageContainer>
          <h2>해당 글을 찾을 수 없습니다.</h2>
        </PageContainer>
        <Footer />
      </>
    );
  }

  // ⭐ form 초기값 = 기존 글 데이터
  const [form, setForm] = useState({
    title: origin.title,
    author: origin.author,
    category: origin.category,
    content: origin.content,
  });

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedPost = {
      ...origin,
      title: form.title,
      author: form.author,
      category: form.category,
      content: form.content,
    };

    // ⭐ 전역 UPDATE 적용
    dispatch({ type: "UPDATE_POST", post: updatedPost });

    alert("수정이 완료되었습니다!");

    // 수정 완료 후 상세 페이지 이동
    navigate(`/petition/${id}`);
  };

  return (
    <>
      <Header />

      <PageContainer>
        <Title>글 수정하기</Title>

        <form onSubmit={onSubmit}>
          <Label>제목</Label>
          <Input
            name="title"
            value={form.title}
            onChange={onChange}
            required
          />

          <Label>작성자</Label>
          <Input
            name="author"
            value={form.author}
            onChange={onChange}
            required
          />

          <Label>카테고리</Label>
          <Select
            name="category"
            value={form.category}
            onChange={onChange}
          >
            <option value="자유">자유</option>
            <option value="질문">질문</option>
            <option value="정보">정보</option>
            <option value="팬아트">팬아트</option>
          </Select>

          <Label>내용</Label>
          <TextArea
            name="content"
            value={form.content}
            onChange={onChange}
            required
          />

          <SubmitButton type="submit">수정 완료</SubmitButton>
        </form>
      </PageContainer>

      <Footer />
    </>
  );
}