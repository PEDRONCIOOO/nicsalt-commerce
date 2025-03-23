import Hero1 from "./components/ui/hero1";
import Hero2 from "./components/ui/hero2";
import Squares from "./react-bits/Squares/Squares";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Squares Background */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="gray"
          hoverFillColor="#222"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero1 />
        <Hero2 />
      </div>
    </div>
  );
}