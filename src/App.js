import Header from "components/Header";
import { ModelMap } from "components/ModelMap";
import React, { useEffect, useState } from "react";

const apiUrl = "/api/problems/all/";

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(apiUrl)
      .then(data => data.json())
      .then(data => {
        setData(data);
      });
  }, []);
  return (
    <div className="App">
      <Header />
      <ModelMap />
    </div>
  );
}

export default App;
