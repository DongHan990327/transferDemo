import { useState } from "react";

interface RecordType {
  key: string;
  title: string;
}

interface TransferProps {
  leftPanel: RecordType[];
  rightPanel: RecordType[];
  onChange: (leftPanel: RecordType[], rightPanel: RecordType[]) => void;
}

function TransferComp(props: TransferProps) {
  const { leftPanel, rightPanel, onChange } = props;

  const [leftSelected, setLeftSelected] = useState<string[]>([]);
  const [rightSelected, setRightSelected] = useState<string[]>([]);

  const moveLeft = () => {
    const [updatedRightItems, updatedLeftItems] = moveItems(
      rightPanel,
      leftPanel,
      rightSelected
    );
    onChange(updatedLeftItems, updatedRightItems);
    setLeftSelected([]);
    setRightSelected([]);
  };

  const moveRight = () => {
    const [updatedLeftItems, updatedRightItems] = moveItems(
      leftPanel,
      rightPanel,
      leftSelected
    );
    onChange(updatedLeftItems, updatedRightItems);
    setLeftSelected([]);
    setRightSelected([]);
  };

  const moveItems = (
    source: RecordType[],
    target: RecordType[],
    ids: string[]
  ) => {
    const moveItems = source.filter((item) => ids.includes(item.key));
    const updateSource = source.filter((item) => !ids.includes(item.key));
    const updateTarget = [...target, ...moveItems];
    return [updateSource, updateTarget];
  };

  const selectChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const checked = e.target.checked;
    if (leftPanel.some((t) => t.key === key)) {
      if (checked) {
        setLeftSelected([...leftSelected, key]);
      } else {
        setLeftSelected(leftSelected.filter((id) => id !== key));
      }
    } else {
      if (checked) {
        setRightSelected([...rightSelected, key]);
      } else {
        setRightSelected(rightSelected.filter((id) => id !== key));
      }
    }
  };

  return (
    <div style={{ width: "100%", height: 500, display: "flex" }}>
      <div style={{ border: "1px solid #eee", padding: 20 }}>
        {leftPanel.map((item) => (
          <div key={item.key}>
            <input
              type="checkbox"
              checked={leftSelected.includes(item.key)}
              onChange={(e) => selectChange(e, item.key)}
            />
            {item.title}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 20px 0 20px",
          justifyContent: "center",
        }}
      >
        <button disabled={!leftSelected.length} onClick={moveRight}>{`>`}</button>
        <button disabled={!rightSelected.length} onClick={moveLeft}>{`<`}</button>
      </div>
      <div style={{ border: "1px solid #eee", padding: 20 }}>
        {rightPanel.map((item) => (
          <div key={item.key}>
            <input
              type="checkbox"
              checked={rightSelected.includes(item.key)}
              onChange={(e) => selectChange(e, item.key)}
            />
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransferComp;
