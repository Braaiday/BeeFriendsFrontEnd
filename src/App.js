import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppSpinner from "./Components/Elements/AppSpinner/AppSpinner";
import useTheme from "./Style/ThemeContext/useTheme";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { PageChatRoom } from "./Components/Pages/PageChatRoom/PageChatRoom";
import Layout from "./Components/Layout/Layout";
import PageLobby from "./Components/Pages/PageHome/PageLobby";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} w-100 h-100`}>
      <AppSpinner />
      <ToastContainer />
      <div className="App w-100 h-100 p-3">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PageLobby />} />
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
