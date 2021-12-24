import React from 'react';
import { LoginPage } from './pages/Login.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Home } from './pages/Home.page';

function App() {
  // Returns 
  const userId = useAuth();
  // If the user is not logged in, show the login page
  if(!userId) return <LoginPage />;

  // If the user is logged in access the routes
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
