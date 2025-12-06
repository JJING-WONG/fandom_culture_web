import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";

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

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
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

export default function WritePage() {
  const navigate = useNavigate();
  const { posts, dispatch } = usePosts();

  const [form, setForm] = useState({
    title: "",
    author: "",
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

    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1, // ID 자동 증가
      title: form.title,
      author: form.author,
      content: form.content,
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    };

    // 전역 상태에 글 추가
    dispatch({ type: "CREATE", post: newPost });

    // 생성된 글 상세 페이지로 이동
    navigate(`/lab/${newPost.id}`);
  };

  return (
    <>
      <Header />

      <PageContainer>
        <Title>새 분석 보고서 작성</Title>

        <form onSubmit={onSubmit}>
          <Label>제목</Label>
          <Input
            name="title"
            placeholder="예) 3화에서 등장한 복선 정리"
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

          <Label>내용</Label>
          <TextArea
            name="content"
            placeholder="드라마 속 장면 분석을 자유롭게 작성해주세요."
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