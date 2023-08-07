import React, { useState } from "react";
import "./App.css";
import TransferComp from "./components/TransferComp";

interface RecordType {
  key: string;
  title: string;
}

const initinalLeft: RecordType[] = Array.from({ length: 4 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
}));

const initinalRight: RecordType[] = Array.from({ length: 3 }).map((_, i) => ({
  key: (i + 4).toString(),
  title: `content${i + 5}`,
}));

function App() {
  const [leftData, setLeftData] = useState(initinalLeft);
  const [rightData, setRightData] = useState(initinalRight);
  const onChangeData = (leftPanel: RecordType[], rightPanel: RecordType[]) => {
    setLeftData([...leftPanel]);
    setRightData([...rightPanel]);
  };
  return (
    <div className="App">
      <TransferComp
        leftPanel={leftData}
        rightPanel={rightData}
        onChange={onChangeData}
      />
    </div>
  );
}

export default App;
