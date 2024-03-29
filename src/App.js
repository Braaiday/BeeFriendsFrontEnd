import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppSpinner from "./Components/Elements/AppSpinner/AppSpinner";
import useTheme from "./Style/ThemeContext/useTheme";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { PageChatRoom } from "./Components/Pages/PageChatRoom/PageChatRoom";
import Layout from "./Components/Layout/Layout";
import PageLobby from "./Components/Pages/PageLobby/PageLobby";
import { PageNotFound } from "./Components/Pages/PageNotFound/PageNotFound";
import { configureAxios } from "./API/Api";
import { useDispatch } from "react-redux";
import { decrementRequestCount, incrementRequestCount } from "./reducers/spinnerSlice";

export const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // Configuring axios interceptors for toggling the spinner
  configureAxios(() => dispatch(incrementRequestCount()), () => dispatch(decrementRequestCount()));

  return (
    <div className={theme}>
      <AppSpinner />
      <ToastContainer />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PageLobby />} />
              <Route path="/room/:room/:id" element={<PageChatRoom />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
