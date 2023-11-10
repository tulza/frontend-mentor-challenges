import { Fragment, useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div id="qr-block">
        <img src="images\image-qr-code.png" />
        <p id="qr-bold">Improve your front-end skills by building projects</p>
        <p>
          Scan the QR code to visit Frontend Mentor and take your coding skills
          to the next level
        </p>
      </div>

      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        .<br /> Coded by <a href="#">Tulza</a>.
      </div>
    </>
  );
}

export default App;
