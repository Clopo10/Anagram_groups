export default function RequestPanel({ mode, input, setInput, onSubmit }) {
  return (
    <div className="flex flex-col h-full w-full">
      <label className="text-black font-extrabold text-lg mb-2 tracking-wide">
        Input a list of words:
      </label>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="eg. eat, tea, bat, carrot, ..."
        className="grow w-full bg-[#6a3f3b] text-white p-6 rounded-lg border-4 border-black outline-none focus:ring-4 focus:ring-black/20 resize-none font-medium placeholder-white/60 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all mb-8"
        spellCheck="false"
      />

      <button
        onClick={onSubmit}
        className="w-full max-w-sm mx-auto bg-[#ba321c] text-white font-black text-2xl py-4 rounded-xl border-4 border-black hover:bg-[#8f2413] hover:translate-y-1 hover:shadow-[0px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] tracking-widest"
      >
        {mode}
      </button>
    </div>
  );
}
