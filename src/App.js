import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Pages/Layout/Layout";
import PageChatRoom from "./Components/Pages/PageChatRoom/PageChatRoom";
import PageHome from "./Components/Pages/PageHome/PageHome";
import "./App.scss";
import AppSpinner from "./Components/Elements/AppSpinner/AppSpinner";
import { useDispatch } from "react-redux";
import { setUser } from "./reducers/userSlice";
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    let name = localStorage.getItem('name')
    if (name) {
      dispatch(setUser(name));
    }
  }, [])
  return (
    <div className="App">
      <div className="light">
        <AppSpinner/>
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
