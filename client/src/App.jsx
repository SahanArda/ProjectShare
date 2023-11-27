import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/homePage.jsx";
import LoginPage from "./pages/loginPage/loginPage.jsx";
import ProfilePage from "./pages/profilePage/profilePage.jsx";
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

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            {/* <Route path="*" element={<Error404 />} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
