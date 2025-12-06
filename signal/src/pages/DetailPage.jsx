import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useState } from "react";

/* ======================
      Styled Components
======================= */

const PageContainer = styled.div`
  max-width: 800px;
  margin: 40px auto 80px;
  padding: 0 16px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #003976;
  margin-bottom: 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  ${({ color }) =>
    color === "edit"
      ? `
        background-color: #003976;
        color: white;
        &:hover { background-color: #002d63; }
      `
      : `
        background-color: #c53030;
        color: white;
        &:hover { background-color: #9b2c2c; }
      `}
`;

const InfoCard = styled.div`
  background: #f4f7fc;
  border: 2px solid #d8e2f1;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
`;

const InfoItem = styled.p`
  margin: 6px 0;
  font-size: 16px;
  color: #444;
`;

const ContentArea = styled.div`
  background: white;
  border: 2px solid #e3e8ef;
  border-radius: 12px;
  padding: 24px;
  min-height: 300px;
  line-height: 1.6;
  font-size: 17px;
  color: #333;
  white-space: pre-line;
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
  margin-bottom: 4px;
`;

const CommentContent = styled.div`
  font-size: 15px;
  color: #333;
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
    color: #a32424;
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

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 🔵 전역 상태
  const { posts, comments, dispatch } = usePosts();

  // 해당 게시글 찾기
  const post = posts.find((p) => p.id === Number(id));

  // 삭제된 글 또는 잘못된 URL 접근 처리
  if (!post) {
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

  // 🔵 해당 글의 댓글 필터링
  const postComments = comments.filter((c) => c.postId === Number(id));

  // 작성 중인 댓글
  const [commentText, setCommentText] = useState("");

  // 댓글 작성
  const submitComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length ? comments[comments.length - 1].id + 1 : 1,
      postId: Number(id),
      author: "익명 팬",
      content: commentText,
      date: new Date().toISOString().slice(0, 10),
    };

    dispatch({ type: "CREATE_COMMENT", comment: newComment });
    setCommentText("");
  };

  // 댓글 삭제
  const deleteComment = (commentId) => {
    dispatch({ type: "DELETE_COMMENT", id: commentId });
  };

  // 게시글 삭제
  const deletePost = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch({ type: "DELETE", id: post.id });
      navigate("/lab");
    }
  };

  return (
    <>
      <Header />

      <PageContainer>
        <TitleRow>
          <PageTitle>사건 분석 보고서</PageTitle>

          <ButtonRow>
            <ActionButton color="edit" onClick={() => navigate(`/lab/edit/${id}`)}>
              수정
            </ActionButton>

            <ActionButton color="delete" onClick={deletePost}>
              삭제
            </ActionButton>
          </ButtonRow>
        </TitleRow>

        <InfoCard>
          <InfoItem><strong>제목:</strong> {post.title}</InfoItem>
          <InfoItem><strong>작성자:</strong> {post.author}</InfoItem>
          <InfoItem><strong>작성일:</strong> {post.date}</InfoItem>
        </InfoCard>

        <ContentArea>{post.content}</ContentArea>

        {/* ======================
              댓글 영역
        ====================== */}
        <CommentSection>
          <CommentTitle>댓글</CommentTitle>

          {/* 댓글 리스트 */}
          {postComments.map((comment) => (
            <CommentBox key={comment.id}>
              <DeleteCommentButton onClick={() => deleteComment(comment.id)}>
                삭제
              </DeleteCommentButton>

              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentContent>{comment.content}</CommentContent>
              <CommentDate>{comment.date}</CommentDate>
            </CommentBox>
          ))}

          {/* 댓글 입력 */}
          <CommentInput
            placeholder="댓글을 입력하세요…"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <CommentSubmit onClick={submitComment}>
            댓글 작성
          </CommentSubmit>
        </CommentSection>
      </PageContainer>

      <Footer />
    </>
  );
}