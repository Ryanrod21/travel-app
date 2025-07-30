export default function SearchBall() {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 animate-bounce">
        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
      </div>
      <div className="absolute bottom-1/4 right-1/13 animate-bounce">
        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
      </div>
      <div className="absolute top-1/3 right-1/3 animate-bounce delay-300">
        <div className="w-4 h-4 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50"></div>
      </div>
      <div className="absolute top-1/13 left-1/13 animate-bounce delay-300">
        <div className="w-4 h-4 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50"></div>
      </div>
      <div className="absolute top-1/8 right-1/6 animate-bounce delay-700">
        <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
      </div>
      <div className="absolute bottom-1/2 left-1/16 animate-bounce delay-700">
        <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
      </div>
      <div className="absolute top-2/3 left-[26%] animate-bounce delay-200">
        <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
      </div>
      <div className="absolute top-[40%] right-[20%] animate-bounce delay-200">
        <div className="w-4 h-4 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-bounce delay-[450ms]">
        <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
      </div>
      <div className="absolute top-1/2 left-[19%] animate-bounce delay-[450ms]">
        <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
      </div>
      <div className="absolute bottom-[10%] right-[30%] animate-bounce delay-[600ms]">
        <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
      </div>
      <div className="absolute bottom-[20%] left-[10%] animate-bounce delay-[600ms]">
        <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
      </div>
    </>
  );
}
