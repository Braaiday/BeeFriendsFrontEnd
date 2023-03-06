import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Pages/Layout/Layout";
import PageChatRoom from "./Components/Pages/PageChatRoom/PageChatRoom";
import PageHome from "./Components/Pages/PageHome/PageHome";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="light">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PageHome />} />
              <Route path="/room" element={<PageChatRoom />} />
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
