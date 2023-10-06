import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Pages/Layout/Layout";
import PageChatRoom from "./Components/Pages/PageChatRoom/PageChatRoom";
import PageHome from "./Components/Pages/PageHome/PageHome";
import AppSpinner from "./Components/Elements/AppSpinner/AppSpinner";
import { useDispatch } from "react-redux";
import { setUser } from "./reducers/userSlice";
import { useEffect } from "react";
import useTheme from "./Style/ThemeContext/useTheme";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
    <div className={`${theme} w-100 h-100`}>
      <AppSpinner />
      <ToastContainer />
      <div className="App w-100 h-100 p-3">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PageHome />} />
              <Route path="/room/:room/:id" element={<PageChatRoom />} />
            </Route>
            <Route path="*" element={<div>No Match</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
