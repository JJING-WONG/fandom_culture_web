import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function PetitionWritePage() {
  const navigate = useNavigate();

  // ⭐ 전역 커뮤니티 context 사용
  const { posts, dispatch } = useCommunity();

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "자유",
    content: "",
  });

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // 새 글 ID 자동 증가
    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const newPost = {
      id: newId,
      title: form.title,
      author: form.author,
      category: form.category,
      content: form.content,
      date: new Date().toISOString().slice(0, 10),
      likes: 0,
    };

    // ⭐ 전역 CREATE 적용
    dispatch({ type: "CREATE_POST", post: newPost });

    // 등록 완료 후 상세 페이지 이동
    navigate(`/petition/${newId}`);
  };

  return (
    <>
      <Header />

      <PageContainer>
        <Title>새 글 작성</Title>

        <form onSubmit={onSubmit}>
          <Label>제목</Label>
          <Input
            name="title"
            placeholder="글 제목을 입력하세요"
            value={form.title}
            onChange={onChange}
            required
          />

          <Label>작성자</Label>
          <Input
            name="author"
            placeholder="닉네임 입력"
            value={form.author}
            onChange={onChange}
            required
          />

          <Label>카테고리</Label>
          <Select name="category" value={form.category} onChange={onChange}>
            <option value="자유">자유</option>
            <option value="질문">질문</option>
            <option value="정보">정보</option>
            <option value="팬아트">팬아트</option>
          </Select>

          <Label>내용</Label>
          <TextArea
            name="content"
            placeholder="자유롭게 내용을 작성해주세요."
            value={form.content}
            onChange={onChange}
            required
          />

          <SubmitButton type="submit">등록하기</SubmitButton>
        </form>
      </PageContainer>

      <Footer />
    </>
  );
}