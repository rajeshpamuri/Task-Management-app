import './App.css';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme/darktheme';
import Navbar from './Page/Navbar/Navbar';
import "./Page/Navbar/Navbar.css"
import Auth from './Page/Auth/Auth';
import Home from './Page/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './ReduxToolkit/AuthSlice';
import { useEffect } from 'react';
import { fetchTasks } from './ReduxToolkit/TaskSlice';

function App() {
  const dispatch = useDispatch();
  const { task, auth } = useSelector(store => store);
  
  // Get token from Redux state or localStorage
  const token = auth.jwt || localStorage.getItem("jwt");

  useEffect(() => {
    // Only fetch protected data if a token actually exists
    if (token) {
      dispatch(fetchTasks(token));
      dispatch(getUserProfile(token));
    }
  }, [token, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
}

export default App;