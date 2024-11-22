import { useSelector } from "react-redux";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import TopNiches from "../components/TopNiches";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
function Home() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Hero />
      <TopNiches />
      <HowItWorks />
    </>
  );
}

export default Home;
