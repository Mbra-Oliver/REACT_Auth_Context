import "./App.css";
import { useState } from "react";
import { authContext } from "./helpers/authContext";
import Navigation from "./pages/Navigation/Navigation";

function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(undefined);

  return (
    <authContext.Provider value={{ logged, setLogged, user, setUser }}>
      <div className="App">
        <Navigation />
      </div>
    </authContext.Provider>
  );
}

export default App;
