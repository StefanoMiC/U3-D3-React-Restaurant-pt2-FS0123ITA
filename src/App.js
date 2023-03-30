import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import TopBar from "./components/TopBar";

function App() {
  return (
    <>
      <TopBar brand="React Restaurant" claim="Best pasta in town!" />
      <ReservationList />
      <ReservationForm />
      <Home />
    </>
  );
}

export default App;
