import { useState } from "react";
import Navbar from "./components/Navbar";
import RequestPanel from "./components/RequestPanel";
import ResultPanel from "./components/ResultPanel";

export default function App() {
  // Memory for toggle switch
  const [mode, setMode] = useState("SORT");

  // Memory for textbox
  const [input, setInput] = useState("");

  // Function for the button
  const handleSubmit = () => {
    console.log(`Sending ${input} to the backend in ${mode} mode!`);
  };

  return (
    <div className="h-screen flex flex-col bg-[#eba68a] font-sans selection:bg-[#ba321c] selection:text-white">
      <Navbar mode={mode} setMode={setMode} />

      {/* Workspace Area */}
      <main className="flex-1 flex flex-col-reverse md:flex-row overflow-hidden">
        {/* Left Column: Results Area */}
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-hidden">
          <ResultPanel
            results={[["eat", "tea", "ate"], ["bat", "tab"], ["carrot"]]}
          />
        </div>

        {/* The desktop divider line */}
        <div className="hidden md:block w-1 bg-black"></div>
        {/* The desktop divider line */}
        <div className="block md:hidden h-1 w-full bg-black"></div>

        {/* Right Column: Request Area */}
        <div className="flex-1 p-6 md:p-12 flex flex-col overflow-hidden">
          <RequestPanel
            mode={mode}
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
}
