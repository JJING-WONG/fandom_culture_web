// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PostsProvider } from "./context/PostsContext";
import { CommunityProvider } from "./context/CommunityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PostsProvider>
        <CommunityProvider>
          <App />
        </CommunityProvider>
      </PostsProvider>
    </BrowserRouter>
  </React.StrictMode>
);