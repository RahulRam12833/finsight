import "./Hero.css";
import { Link } from "react-router-dom";

//interface Props {}

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen">
      <div className="container mx-auto flex min-h-screen items-center justify-center p-8">
        <div className="flex max-w-3xl flex-col items-center space-y-10 text-center">
          <h1 className="text-5xl font-bold text-indigo-950 lg:text-7xl">
            Financial data with no news.
          </h1>

          <p className="max-w-2xl text-2xl font-bold text-indigo-950">
            Search relevant financial documents without fear mongering and fake
            news.
          </p>

          <Link
            to="/search"
            className="rounded-xl bg-blue-700 px-10 py-5 text-2xl font-bold text-white hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
