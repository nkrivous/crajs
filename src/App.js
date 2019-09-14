import React, { useState, useEffect } from "react";
import Header from "components/Header";

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
    </div>
  );
}

export default App;
