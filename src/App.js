import "./App.css";
import "animate.css/animate.min.css";
import AppRouter from "./componets/AppRouter";
import Navbar from "./componets/Navbar";

function App() {
  return (
    <>
        {/* <h1 className="animate__animated animate__fadeInLeft animate__delay-faster ">An animated element</h1>*/}

      <Navbar/>
      <AppRouter/>
    </>
  );
}

export default App;
