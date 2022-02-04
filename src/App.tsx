import React, { useEffect, useState } from 'react';
import { LoginPage } from './pages/Login.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Home } from './pages/Home.page';
import { AssettoPage } from './pages/Assetto.page';
import { getUser } from './firebase/firebase';
import { AdminPage } from './pages/Admin.page';

function App() {
  // Hooks for the admin page interface
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(()=>{
    getUser().then(res =>{
      setIsAdmin(res?.admin ?? false);
    })
  }, []);

  const userId = useAuth();
  // If the user is not logged in, show the login page
  if(!userId) return <LoginPage />;

  // If the user is logged in access the routes
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
          <Route path="assetto" element={<AssettoPage/>}/>
          {isAdmin && <Route path="admin" element={<AdminPage/>}/>}
        </Route>
        <Route path="*" element={<div>Not found</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
