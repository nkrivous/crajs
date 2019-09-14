import React, { useState, useEffect } from "react";

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
  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
