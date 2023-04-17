import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Pages/Home/Home"));
const Users = lazy(() => import("./Pages/Users/Users"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tweets" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {/* <Users /> */}
    </div>
  );
}

export default App;
