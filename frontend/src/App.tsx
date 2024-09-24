import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-6xl font-bold mb-[30px] text-white">Taker Notes</h1>

      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 text-center">
        Click me
      </button>
    </>
  );
}

export default App;
