import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 🔵 전역 상태에서 posts 접근
  const { posts, dispatch } = usePosts();

  // 🔎 현재 수정할 글 찾기
  const origin = posts.find((p) => p.id === Number(id));

  // 글이 없는 id로 만약 강제로 접근한 경우
  if (!origin) {
    return (
      <>
        <Header />
        <PageContainer>
          <h2>해당 게시글을 찾을 수 없습니다.</h2>
        </PageContainer>
        <Footer />
      </>
    );
  }

  // 📝 수정 폼 상태
  const [form, setForm] = useState({
    title: origin.title,
    author: origin.author,
    content: origin.content,
  });

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedPost = {
      ...origin,
      title: form.title,
      author: form.author,
      content: form.content,
    };

    // 🔥 전역 UPDATE 적용
    dispatch({ type: "UPDATE", post: updatedPost });

    // 수정 후 상세 페이지로 이동
    navigate(`/lab/${id}`);
  };

  return (
    <>
      <Header />

      <PageContainer>
        <Title>분석 보고서 수정</Title>

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