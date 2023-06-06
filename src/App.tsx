// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Trending from "./Pages/Trending";
import Movies from "./Pages/Movies";
import TV from "./Pages/TV";
import Search from "./Pages/Search";
import Error from "./Pages/Error";
import Navbar from "./components/Navbar";
import Others from "./Pages/Others";
const App = () => {
  const routes = [
    {
      path: "/",
      element: <Trending />,
    },
    {
      path: "/movies",
      element: <Movies />,
    },
    {
      path: "/tv",
      element: <TV />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/others",
      element: <Others />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ];

  return (
    <div>
<BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
};

export default App;




