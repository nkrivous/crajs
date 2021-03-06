import Header from "components/Header";
import { RendersMapObject } from "components/RendersMapObject";
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
      <RendersMapObject />
    </div>
  );
}

export default App;
