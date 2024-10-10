import React, { useState } from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";
import { ReplyContext } from "./context/context";
const App: React.FC = () => {
  const [number, setNumber] = useState<number | undefined>(0);
  return (
    <ReplyContext.Provider value={{ number, setNumber }}>
      <div className="flex h-screen">
        <Sidebar />
        <Body />
      </div>
    </ReplyContext.Provider>
  );
};

export default App;
