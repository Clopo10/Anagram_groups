import { Filter, Search, Palette } from "lucide-react";

export default function Navbar({ mode, setMode }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#de845a] border-b-4 border-black">
      {/*Left: Logo*/}
      <div className="flex-1">
        <h1 className="hidden sm:block text-3xl font-black text-[#ba321c] tracking-widest drop-shadow-sm">
          ANAGRAMS
        </h1>
      </div>

      {/*Middle: The toggle switch*/}
      <div className="flex items-center justify-center gap-3 flex-none">
        <Filter
          strokeWidth={3}
          className={`w-6 h-6 hidden sm:block transition-colors ${mode === "SORT" ? "text-[#ba321c]" : "text-[#de845a]"}`}
        />

        <div className="flex bg-transparent border-2 border-black rounded-full overflow-clip font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          <button
            onClick={() => setMode("SORT")}
            className={`px-4 sm:px-6 py-1 transition-colors ${mode === "SORT" ? "bg-[#ba321c] text-[#de845a] text-2xl" : "text-black text-2xl hover:bg-black/10"}`}
          >
            SORT
          </button>

          {/*Diagonal separator*/}
          <div className="w-0.5 bg-black"></div>

          <button
            onClick={() => setMode("SEARCH")}
            className={`px-4 sm:px-6 py-1 transition-colors ${mode === "SEARCH" ? "bg-[#ba321c] text-[#de845a] text-2xl" : "text-black text-2xl hover:bg-black/10"}`}
          >
            SEARCH
          </button>
        </div>

        <Search
          strokeWidth={3}
          className={`w-6 h-6 hidden sm:block transition-colors ${mode === "SEARCH" ? "text-[#ba321c]" : "text-[#de845a]"}`}
        />
      </div>

      {/* Right: Theme Toggle*/}
      <div className="flex-1 flex justify-end">
        <button
          className="p-2 border-2 border-transparent hover:border-black rounded-full transition-all hover:bg-black/5"
          title="Change Theme"
        >
          <Palette strokeWidth={2.5} className="w-6 h-6 text-black" />
        </button>
      </div>
    </nav>
  );
}
