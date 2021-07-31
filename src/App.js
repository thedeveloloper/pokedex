import React from "react";

import "semantic-ui-css/semantic.min.css";

import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
