import { SunDim } from "lucide-react";

export default function ResultPanel({ results = [], processingTime }) {
  // Empty state
  if (results.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full text-black/50 space-y-6">
        {/* The Sun Animation Container */}
        <div className="relative flex items-center justify-center w-full h-24 overflow-hidden">
          <SunDim
            strokeWidth={1.5}
            className="w-30 h-30 text-[#6a3f3b]/50 animate-[spin_3s_linear_infinite]"
          />
        </div>

        <p className="font-black text-lg md:text-xl tracking-widest uppercase text-center px-4">
          No anagrams to show yet...
        </p>
      </div>
    );
  }

  // Populated state
  return (
    <div className="flex-1 overflow-y-auto pr-2 pt-2 space-y-4 pb-4">
      {results.map((group, index) => (
        <div
          key={group[0]}
          className="w-full p-5 sm:p-6 bg-[#6a3f3b] text-white rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all cursor-default"
        >
          <div className="flex items-start gap-3 md:gap-4 font-black text-lg md:text-xl tracking-wide">
            {/* The Number */}
            <span className="text-[#de845a] drop-shadow-sm min-w-6">
              {index + 1}
            </span>

            {/* The Grouped Words */}
            <span className="leading-relaxed">{group.join(", ")}</span>
          </div>
        </div>
      ))}

      {/* Processing Time */}
      {processingTime !== null && (
        <div className="text-right pr-2 pt-4 font-black text-black/40 text-sm tracking-widest uppercase">
          Processed in {processingTime} ms.
        </div>
      )}
    </div>
  );
}
