import Home from "../components/Banner";
import Picture from "../components/Apod";
import Mars from "../components/Mars";
import Register from "./Register";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="App">
      <Home />
      <Picture />
      <Mars />
      <Register />
      <Footer />
    </div>
  );
};

export default HomePage;
