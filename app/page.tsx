import Hero1 from "./components/ui/hero1";
import Hero2 from "./components/ui/hero2";
import Hero3 from "./components/ui/hero3";
// import Squares from "./react-bits/Squares/Squares";
import Balatro from "./react-bits/Balatro/Balatro";

export default function Home() {
  return (
    <div className="relative w-full h-fit overflow-hidden">
      {/* Squares Background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero1 />
        <Hero2 />
        <Hero3 />
      </div>
    </div>
  );
}
