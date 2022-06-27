import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Layouts/Navbar/Navbar';
import './App.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LoginPage from './Pages/Login/LoginPage';
import Profile from './Pages/Profile/Profile';

export const App = () => {
  const [user, setUser] = useState('null');

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser('null');
      }
      console.log(user);
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route
            path={`/profile/${user}`}
            element={user !== 'null' ? <Profile user={user} /> : <Navigate to="/login" replace />}
          />
          <Route path="/" element={user === 'null' ? <Navigate to="/login" /> : <Navigate to={`/profile/${user}`} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};
