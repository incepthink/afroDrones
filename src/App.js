import React, { useState, useEffect } from "react";
import "./App.css";
import bg1 from "./assests/bg1.png";
import { Minting, Navbar, Welcome } from "./components";

const App = () => {
  const [mint, setMint] = useState(false);

  const today = new Date();

  useEffect(() => {
    if (
      (today.getDate() > 26 && today.getMonth() < 2) ||
      (today.getDate() < 25 && today.getMonth() > 1)
    ) {
      setMint(true);
    }
  }, []);

  return (
    <main>
      <div className="app-container">
        {" "}
        <img src={bg1} alt="background" />{" "}
      </div>
      <div className="app-wrapper">
        <Navbar />

        {/* {mint ? */}
        <Minting />
        {/* <Welcome/> */}
        {/* } */}
      </div>
      <footer>
        <a target="_blank" href="https://twitter.com/OwoAnietie">
          By Owo Anietie
        </a>
      </footer>
    </main>
  );
};

export default App;
