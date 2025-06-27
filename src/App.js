import React, { useState } from "react";
import SplashScreen from "./SplashScreen";
import ExportCo from "./ExportCo";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleContinue = () => {
    setShowSplash(false);
  };

  return (
    <div className="App">
      {showSplash ? <SplashScreen onContinue={handleContinue} /> : <ExportCo />}
    </div>
  );
}

export default App;
