import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import MainPage from "./views/MainPage";
import './styles/style.css';
import LocationState from "./context/LocationState";
import WorkshopState from "./context/WorkshopState";
import WorkshopPage from "./views/WorkshopPage";
import Footer from "./components/Footer";
import "./i18n";
import ReservationPage from "./views/ReservationPage";
import { useWindowSize } from "./hooks/useWindowSize";

function App() {

  const { isDesktop, isTablet } = useWindowSize();

  return (
    <LocationState>
      <WorkshopState>
        <BrowserRouter>
        <div className="App">
          <TopBar />
          <div className={ (isDesktop || isTablet) ? "content-desktop" : "content"}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/workshops/:id" element={<WorkshopPage />} />
              <Route path="/reservations/:reservationUuid" element={<ReservationPage />} />
              {/* Redirect all unknown routes to "/" */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
        </BrowserRouter>
      </WorkshopState>
    </LocationState>
  );
}

export default App;
