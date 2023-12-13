import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "theme";

function App() {

  const mode = useSelector((state) => state.isDarkMode)  ? "dark" : "light"
  const isLogedIn = Boolean(useSelector((state) => state.token))

  const theme = useMemo(
    () => createTheme(themeSettings(mode)),
    [mode]
  )

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={isLogedIn ? <Home /> : <Login /> } />
        <Route path="/:id" element={ isLogedIn ? <Profile /> : <Login />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
