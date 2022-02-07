import React, { useState } from 'react';
import { LoginPage } from './pages/Login.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Home } from './pages/Home.page';
import { AssettoPage } from './pages/Assetto.page';
import { getUser } from './firebase/firebase';
import { AdminPage } from './pages/Admin.page';
import { SingleUserPage } from './pages/SingleUser.page';
import { CreateUserPage } from './pages/CreateUser.page';

function App() {
  // Hooks for the admin page interface
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to be called to check if the user is admin
  const callbackAdmin = () => {
    getUser().then(res => {
      setIsAdmin(res?.customClaims.admin ?? false);
    })
  }

  const userId = useAuth(callbackAdmin);
  // If the user is not logged in, show the login page
  if (!userId) return <LoginPage />;

  // If the user is logged in access the routes
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="assetto" element={<AssettoPage />} />
          {
            isAdmin && <Route>
              <Route path="admin" element={<AdminPage />}/>
              <Route path="admin/showUser/:uid" element={<SingleUserPage />}/>
              <Route path="admin/createUser" element={<CreateUserPage/>}/>
            </Route>
          }
        </Route>
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
