import { createContext, useContext, useReducer } from "react";

/* ============================
       초기 게시글 데이터
============================ */

const initialCommunityPosts = [
  {
    id: 101,
    title: "드라마 떡밥 회의해요!",
    author: "팬A",
    category: "자유",
    date: "2026-07-01",
    content: "요즘 드라마 떡밥 너무 많지 않나요?\n같이 정리해봐요!",
    likes: 12,
  },
  {
    id: 102,
    title: "2화 의상 정보 아시는 분?",
    author: "팬B",
    category: "질문",
    date: "2026-07-02",
    content: "2화에서 주인공이 입었던 검은 코트 브랜드 아시는 분 있나요?",
    likes: 3,
  },
  {
    id: 103,
    title: "비하인드 촬영 장소 공유합니다",
    author: "팬C",
    category: "정보",
    date: "2026-07-02",
    content: "촬영 장소 공유드려요!",
    likes: 8,
  },
];

/* ============================
          초기 댓글 데이터
============================ */

const initialCommunityComments = [
  { id: 1, postId: 101, author: "팬D", content: "우와 정리 좋아요!", date: "2025-02-03" },
  { id: 2, postId: 101, author: "팬E", content: "저도 그렇게 생각해요!", date: "2025-02-04" },
];

/* ============================
            Reducer
============================ */

function communityReducer(state, action) {
  switch (action.type) {
    /* ------- 게시글 CRUD ------- */

    case "CREATE_POST":
      return {
        ...state,
        posts: [...state.posts, action.post],
      };

    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.post.id ? action.post : post
        ),
      };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
        comments: state.comments.filter((c) => c.postId !== action.id),
      };

    /* ------- 좋아요 기능 ------- */
    case "LIKE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.id ? { ...post, likes: post.likes + 1 } : post
        ),
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

const CommunityContext = createContext();

/* ============================
       Provider Component
============================ */

export function CommunityProvider({ children }) {
  const [state, dispatch] = useReducer(communityReducer, {
    posts: initialCommunityPosts,
    comments: initialCommunityComments,
  });

  return (
    <CommunityContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommunityContext.Provider>
  );
}

/* ============================
            Hook
============================ */

export function useCommunity() {
  return useContext(CommunityContext);
}