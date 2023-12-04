import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage.jsx";
import HomePage from "./pages/homePage/homePage.jsx";
import LoginPage from "./pages/loginPage/loginPage.jsx";
import ProfilePage from "./pages/profilePage/profilePage.jsx";
import Error404 from "./pages/error404/error404.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme"; // themeSettings is the custom theme created by me in theme.js

function App() {
  // useSelector is a hook that is used to access the state in the redux store for example here we are accessing the mode state which is the theme light or dark
  const mode = useSelector((state) => state.mode);
  // useMemo here is used to ensure that the theme is only rendered once the mode changes and not every time the component re-renders
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // This is going to be used to check if the token exists for the user and if it does then the user is authorized to access the home page
  // By adding this to the routes such as the homePage it will ensure non-authorized users cannot access the page
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/login" />} 
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
