import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useCommunity } from "../context/CommunityContext";
import { useState } from "react";

/* ======================
      Styled Components
======================= */

const PageContainer = styled.div`
  max-width: 900px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  background: #f4f7fc;
  border: 2px solid #d8e2f1;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
`;

const InfoItem = styled.p`
  margin: 6px 0;
  font-size: 15px;
  color: #444;
`;

const ContentBox = styled.div`
  background: white;
  border: 2px solid #e3e8ef;
  border-radius: 12px;
  padding: 24px;
  min-height: 200px;
  line-height: 1.6;
  font-size: 17px;
  color: #333;
  white-space: pre-line;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: white;

  ${({ typecolor }) =>
    typecolor === "edit"
      ? `
        background: #003976;
        &:hover { background-color: #002d63; }
      `
      : typecolor === "delete"
      ? `
        background: #c53030;
        &:hover { background-color: #9b2c2c; }
      `
      : ""}
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #e63946;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

/* ======================
      댓글 스타일
======================= */

const CommentSection = styled.div`
  margin-top: 40px;
`;

const CommentTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 16px;
`;

const CommentBox = styled.div`
  background: #f8faff;
  border: 2px solid #e1e6ef;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 14px;
`;

const CommentAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #003976;
`;

const CommentContent = styled.div`
  font-size: 15px;
  color: #333;
  margin-top: 6px;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 6px;
`;

const DeleteCommentButton = styled.button`
  float: right;
  background: none;
  border: none;
  color: #c53030;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 12px;
  border: 2px solid #d0d7e2;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 15px;
  resize: none;
`;

const CommentSubmit = styled.button`
  background-color: #003976;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #002d63;
  }
`;

/* ======================
        Component
======================= */

export default function PetitionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ⭐ 전역 community 상태 불러오기
  const { posts, comments, dispatch } = useCommunity();

  // ⭐ 글 찾기 (READ)
  const post = posts.find((p) => p.id === Number(id));

  // 글이 없는 경우
  if (!post) {
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

  // ⭐ 해당 글의 댓글만 필터링
  const postComments = comments.filter((c) => c.postId === Number(id));

  // 댓글 작성용 로컬 상태
  const [text, setText] = useState("");

  // 댓글 추가
  const addComment = () => {
    if (!text.trim()) return;

    const newComment = {
      id: comments.length ? comments[comments.length - 1].id + 1 : 1,
      postId: Number(id),
      author: "익명 팬",
      content: text,
      date: new Date().toISOString().slice(0, 10),
    };

    dispatch({ type: "CREATE_COMMENT", comment: newComment });
    setText("");
  };

  // 댓글 삭제
  const deleteComment = (commentId) => {
    dispatch({ type: "DELETE_COMMENT", id: commentId });
  };

  // 좋아요 증가
  const likePost = () => {
    dispatch({ type: "LIKE_POST", id: post.id });
  };

  // 게시글 삭제
  const deletePost = () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      dispatch({ type: "DELETE_POST", id: post.id });
      navigate("/petition");
    }
  };

  return (
    <>
      <Header />

      <PageContainer>
        <Title>{post.title}</Title>

        <InfoBox>
          <InfoItem><strong>작성자:</strong> {post.author}</InfoItem>
          <InfoItem><strong>날짜:</strong> {post.date}</InfoItem>
          <InfoItem><strong>카테고리:</strong> {post.category}</InfoItem>
        </InfoBox>

        <ContentBox>{post.content}</ContentBox>

        <ButtonRow>
          <LikeButton onClick={likePost}>❤️ {post.likes}</LikeButton>

          <ActionButton
            typecolor="edit"
            onClick={() => navigate(`/petition/edit/${id}`)}
          >
            수정
          </ActionButton>

          <ActionButton typecolor="delete" onClick={deletePost}>
            삭제
          </ActionButton>
        </ButtonRow>

        {/* ⭐ 댓글 섹션 */}
        <CommentSection>
          <CommentTitle>댓글</CommentTitle>

          {postComments.map((c) => (
            <CommentBox key={c.id}>
              <DeleteCommentButton onClick={() => deleteComment(c.id)}>
                삭제
              </DeleteCommentButton>

              <CommentAuthor>{c.author}</CommentAuthor>
              <CommentContent>{c.content}</CommentContent>
              <CommentDate>{c.date}</CommentDate>
            </CommentBox>
          ))}

          <CommentInput
            placeholder="댓글을 입력하세요…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <CommentSubmit onClick={addComment}>댓글 작성</CommentSubmit>
        </CommentSection>
      </PageContainer>

      <Footer />
    </>
  );
}