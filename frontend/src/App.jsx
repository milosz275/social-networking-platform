import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Chat from './pages/chat/Chat';
import Terms from './pages/terms/Terms';
import Debug from './pages/debug/Debug';
import ErrorPage from './pages/error/ErrorPage';
import Admin from './pages/admin/Admin';
import Main from './pages/main/Main';
import './App.css';
import "@fontsource/jetbrains-mono";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/400-italic.css";
import * as urls from './urls';

// prevent ctrl + save
document.addEventListener("keydown", function (e) {
  if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
  }
}, false);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={urls.ROOT_URL} element={<Home />} />
          <Route path={urls.LOGIN_URL} element={<Login />} />
          <Route path={urls.REGISTER_URL} element={<Register />} />
          <Route path={urls.CHAT_URL} element={<Chat />} />
          <Route path={urls.TERMS_URL} element={<Terms />} />
          <Route path={urls.DEBUG_URL} element={<Debug />} />
          <Route path={urls.MAIN_URL} element={<Main />} />
          <Route path={urls.ADMIN_URL} element={<Admin />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
