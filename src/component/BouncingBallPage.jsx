export default function BouncingBall() {
  return (
    <>
      <div className="absolute top-90 left-1/9 animate-bounce">
        <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-blue-500/50 z-12"></div>
      </div>
      <div className="absolute top-2/4 left-1/4 animate-bounce">
        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 z-12"></div>
      </div>
      <div className="absolute top-30 left-200 animate-bounce">
        <div className="w-4 h-4  bg-green-400 rounded-full shadow-lg shadow-blue-500/50 z-12"></div>
      </div>
      <div className="absolute top-1/3 right-1/9 animate-bounce delay-300">
        <div className="w-4 h-4 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50 z-12"></div>
      </div>
      <div className="absolute bottom-1/12 right-140 animate-bounce delay-300">
        <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-sky-500/50 z-12"></div>
      </div>
      <div className="absolute top-2/12 right-2/7 animate-bounce delay-300">
        <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg shadow-sky-500/50 z-12"></div>
      </div>
      <div className="absolute bottom-1/4 right-1/16 animate-bounce delay-700">
        <div className="w-4 h-4  bg-yellow-400 rounded-full shadow-lg shadow-indigo-500/50 z-12"></div>
      </div>
      <div className="absolute top-1/9 left-1/29 animate-bounce delay-700">
        <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 z-12"></div>
      </div>
      <div className="absolute bottom-1/5 left-1/6 animate-bounce delay-700">
        <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg shadow-indigo-500/50 z-12"></div>
      </div>
    </>
  );
}
