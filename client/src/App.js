import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { ThemeProvider } from "@emotion/react";

function App() {

  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/profile/:userId" element={<ProfilePage/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
