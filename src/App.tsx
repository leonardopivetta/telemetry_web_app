import React from 'react';
import { LoginPage } from './pages/Login.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<LoginPage/>} />
          <Route index element={<LoginPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
