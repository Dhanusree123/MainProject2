import { BrowserRouter, Route, Routes } from "react-router-dom";
import SlidesToScrollPage from "./pages/SlidesToScroll";
import SlidesPerViewPage from "./pages/SlidesPerViewPage";
import AutoScrollPage from "./pages/AutoScrollPage";
import AutoPlayPage from "./pages/AutoPlayPage";
import DefaultInfinitePage from "./pages/DefaultInfinitePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/slides-to-scroll" element={<SlidesToScrollPage />} />
          <Route path="/slides-per-view" element={<SlidesPerViewPage />} />
          <Route path="/auto-scroll" element={<AutoScrollPage />} />
          <Route path="/auto-play" element={<AutoPlayPage />} />
          <Route path="/default" element={<DefaultInfinitePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
