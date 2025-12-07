import { createContext, useContext, useReducer } from "react";

/* ============================
        초기 데이터
============================ */

const initialPosts = [
  {
    id: 1,
    title: "2기 1화 - 첫 화에서 나온 단서 정리",
    author: "팬A",
    date: "2026-07-03",
    content: "1화 단서 관련 분석 내용...",
  },
  {
    id: 2,
    title: "주인공이 2화에서 한 행동의 의미 분석",
    author: "팬B",
    date: "2026-07-05",
    content: "2화의 행동 의미 분석 내용...",
  },
  {
    id: 3,
    title: "3화 예상 시나리오",
    author: "팬C",
    date: "2026-07-07",
    content: "앞으로의 시나리오 정리 내용...",
  },
];

// ⭐ 초기 댓글 데이터
const initialComments = [
  {
    id: 1,
    postId: 1,
    author: "팬D",
    content: "완전 공감해요!",
    date: "2025-01-10",
  },
  {
    id: 2,
    postId: 1,
    author: "팬E",
    content: "이 장면 진짜 복선 맞습니다.",
    date: "2025-01-11",
  },
];

/* ============================
            Reducer
============================ */

function postsReducer(state, action) {
  switch (action.type) {
    /* ------- 게시글 CRUD ------- */

    case "CREATE":
      return {
        ...state,
        posts: [...state.posts, action.post],
      };

    case "UPDATE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.post.id ? action.post : post
        ),
      };

    case "DELETE":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
        comments: state.comments.filter((c) => c.postId !== action.id), // 글 삭제 → 댓글도 삭제
      };

    /* ------- 댓글 CRUD ------- */

    case "CREATE_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.id),
      };

    default:
      return state;
  }
}

/* ============================
            Context
============================ */

const PostsContext = createContext();

/* ============================
         Provider Component
============================ */

export function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: initialPosts,
    comments: initialComments,
  });

  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
}

/* ============================
              Hook
============================ */

export function usePosts() {
  return useContext(PostsContext);
}