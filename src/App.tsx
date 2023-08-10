import React, { useState, useEffect, useCallback } from "react";
import TreeShuttleBox from "./treeShuttleBox/TreeShuttleBox";
import treeData_ from "./mock/big-tree.json";

function App() {
  const [treeData, settreeData] = useState<any[]>([]);
  const [defaultArr, setdefaultArr] = useState<any[]>([]);
  useEffect(() => {
    settreeData(treeData_);
    let defaultArr = [
      "1233361700401",
      "8908033790301",
      "9606481720401",
      "7705876490301"
    ];
    setdefaultArr(defaultArr);
  }, []);
  const handleChange = useCallback((finallyValue: string[]) => {
    console.log("handleChange -> finallyValue", finallyValue);
  }, []);

  return (
    <div>
      <h1>树结构穿梭框</h1>
      <TreeShuttleBox defaultValue={defaultArr} handleChange={handleChange}>
        <TreeShuttleBox.TreeShuttleBoxLeft treeData={treeData} />
        <TreeShuttleBox.TreeShuttleButton />
        <TreeShuttleBox.TreeShuttleBoxRight />
      </TreeShuttleBox>
    </div>
  );
}

export default App;
