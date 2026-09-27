import { useState } from "react";
import Navbar from "./components/Navbar";
import RequestPanel from "./components/RequestPanel";
import ResultPanel from "./components/ResultPanel";

export default function App() {
  // Memory for toggle switch
  const [mode, setMode] = useState("SORT");

  // Memory for textbox
  const [input, setInput] = useState("");

  //Memory for backend response
  const [results, setResults] = useState([]);
  const [processingTime, setProcessingTime] = useState(null);

  // Function for the button
  const handleSubmit = async () => {
    if (!input.trim()) return;

    if (mode === "SORT") {
      try {
        // Convert textbox string into clean array for Pydantic
        const wordsArray = input
          .split(",")
          .map((word) => word.trim())
          .filter((word) => word.length > 0);

        if (wordsArray.length === 0) return;

        // Send the payload
        const response = await fetch("http://localhost:8000/api/anagrams", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ words: wordsArray }),
        });

        const data = await response.json();

        // Catch FastAPI validation errors
        if (!response.ok) {
          console.error("Backend error: ", data.detail);
          alert(Array.isArray(data.detail) ? data.detail[0].msg : data.detail);
          return;
        }

        // Save the grouped results to React's memory
        setResults(data.groups);
        setProcessingTime(data.processing_time_ms);
      } catch (error) {
        console.error("Network error: ", error);
        alert("Could not connect to the backend server!");
      }
    } else {
      try {
        // Grab just the first word in case the user typed commas by habit
        const singleWord = input.split(",")[0].trim();
        if (!singleWord) return;

        // Send the GET request (Data goes directly in the URL)
        const response = await fetch(
          `http://localhost:8000/api/anagrams/${singleWord}`,
        );

        const data = await response.json();

        // Catch FastAPI errors
        if (!response.ok) {
          console.error("Backend error: ", data.detail);
          alert(data.detail);
          return;
        }

        // Wrap the single group array inside another array so it matches SORT's data structure
        setResults([data.group]);
        setProcessingTime(data.processing_time_ms);
      } catch (error) {
        console.error("Network error: ", error);
        alert("Could not connect to the backend server!");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#eba68a] font-sans selection:bg-[#ba321c] selection:text-white">
      <Navbar
        mode={mode}
        setMode={setMode}
        setResults={setResults}
        setProcessingTime={setProcessingTime}
      />

      {/* Workspace Area */}
      <main className="flex-1 flex flex-col-reverse md:flex-row overflow-hidden">
        {/* Left Column: Results Area */}
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-hidden">
          <ResultPanel results={results} processingTime={processingTime} />
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
