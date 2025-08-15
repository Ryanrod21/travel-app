export default function BouncingBall() {
  return (
    <>
      <div className="absolute top-[10%] left-[10%] animate-bounce z-0">
        <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-blue-500/50"></div>
      </div>
      <div className="absolute top-[50%] left-[25%] animate-bounce z-0">
        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
      </div>
      <div className="absolute top-[30%] left-[80%] animate-bounce z-0">
        <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-blue-500/50"></div>
      </div>
      <div className="absolute top-[33%] right-[10%] animate-bounce delay-300 z-0">
        <div className="w-4 h-4 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50"></div>
      </div>
      <div className="absolute bottom-[8%] right-[35%] animate-bounce delay-300 z-0">
        <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-sky-500/50"></div>
      </div>
      <div className="absolute top-[17%] right-[28%] animate-bounce delay-300 z-0">
        <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg shadow-sky-500/50"></div>
      </div>
      <div className="absolute bottom-[25%] right-[6%] animate-bounce delay-700 z-0">
        <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-indigo-500/50"></div>
      </div>
      <div className="absolute top-[11%] left-[3%] animate-bounce delay-700 z-0">
        <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
      </div>
      <div className="absolute bottom-[20%] left-[16%] animate-bounce delay-700 z-0">
        <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg shadow-indigo-500/50"></div>
      </div>
    </>
  );
}
