import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Pages/Layout/Layout";
import PageChatRoom from "./Components/Pages/PageChatRoom/PageChatRoom";
import PageHome from "./Components/Pages/PageHome/PageHome";
import AppSpinner from "./Components/Elements/AppSpinner/AppSpinner";
import { useDispatch } from "react-redux";
import { setUser } from "./reducers/userSlice";
import { useEffect } from "react";
import useTheme from "./Style/ThemeContext/useTheme";
import ThemeChanger from "./Style/ThemeContext/ThemeChanger";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let name = localStorage.getItem('name')
    if (name) {
      dispatch(setUser(name));
    }
  }, []);

  const { theme } = useTheme();

  return (
    <div className={theme}>
      <div className="App">
        <ThemeChanger />
        <AppSpinner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PageHome />} />
              <Route path="/room/:id" element={<PageChatRoom />} />
            </Route>
            <Route path="*" element={<div>No Match</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
