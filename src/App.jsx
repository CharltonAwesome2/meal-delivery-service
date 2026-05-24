// src/App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Home from "@pages/Home";
import Menu from "@pages/Menu";
import Order from "@pages/Order";
import About from "@pages/About";
import Contact from "@pages/Contact";
import NotFound from "@pages/NotFound";
import "./index.css";

function App() {
  return (
    // <Router basename="/meal-delivery-service">
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;