import { useState } from "react";
import Navbar from "./components/Navbar";

export default function App() {
  // Keeps track of whether the user is in SORT or SEARCH mode
  const [mode, setMode] = useState("SORT");

  return (
    <div className="min-h-screen bg-[#eba68a] font-sans selection:bg-[#ba321c] selection:text-white">
      <Navbar mode={mode} setMode={setMode} />

      <main className="p-4 md:p-8 grow">
        <div className="h-[60vh] border-4 border-black border-dashed rounded-xl flex items-center justify-center text-black/50 font-black text-2xl tracking-widest">
          WORKSPACE AREA
        </div>
      </main>
    </div>
  );
}
