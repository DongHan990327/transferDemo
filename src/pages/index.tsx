import React, { useState } from 'react';

interface Item {
  id: number;
  text: string;
  description:string
}

/**
 * @description: mock假数据
 */
const mockData: Item[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  text: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const TransferComponent: React.FC = () => {
  const [sourceList, setSourceList] = useState<Item[]>(mockData); //源列表
  const [targetList, setTargetList] = useState<Item[]>([]); //目标列表
  const [selectedSourceItems, setSelectedSourceItems] = useState<number[]>([]); // 被选中的源列表项目的 ID
  const [selectedTargetItems, setSelectedTargetItems] = useState<number[]>([]); // 被选中的目标列表项目的 ID

  /**
   * 处理选中源列表项目的函数
   * @param {number} itemId - 要选中的项目的 ID
   * @returns {void}
   */
  const handleSelectSourceItem = (itemId: number) => {
    setSelectedSourceItems((prevSelected) => [...prevSelected, itemId]);
  };

  /**
   * @description: 取消选中源列表项函数
   * @param {number} itemId - 要选中的项目的 ID
   * @returns {void}
   */
  const handleDeselectSourceItem = (itemId: number) => {
    setSelectedSourceItems((prevSelected) =>
      prevSelected.filter((id) => id !== itemId)
    );
  };

  /**
   * @description: 处理选中目标列表项目
   * @param {number} itemId - 要选中的项目的 ID
   * @returns {void}
   */
  const handleSelectTargetItem = (itemId: number) => {
    setSelectedTargetItems((prevSelected) => [...prevSelected, itemId]);
  };

  /**
   * @description: 取消选中目标列表项函数
   *  @param {number} itemId - 要选中的项目的 ID
   * @returns {void}
   */
  const handleDeselectTargetItem = (itemId: number) => {
    setSelectedTargetItems((prevSelected) =>
      prevSelected.filter((id) => id !== itemId)
    );
  };

  /**
   * 将选中的源列表项目传送到目标列表
   */
  const handleTransferToTarget = () => {
    const selectedSourceItemsData = sourceList.filter((item) =>
      selectedSourceItems.includes(item.id)
    );

    const updatedSourceList = sourceList.filter(
      (item) => !selectedSourceItems.includes(item.id)
    );

    const updatedTargetList = [...targetList, ...selectedSourceItemsData];

    const sortedUpdatedTargetList = updatedTargetList.sort(
      (a, b) => a.id - b.id
    );

    setTargetList(sortedUpdatedTargetList);
    setSourceList(updatedSourceList);

    setSelectedSourceItems([]);
  };

  /**
   * 将选中的目标列表项目传送到源列表
   */
  const handleTransferToSource = () => {
    const selectedTargetItemsData = targetList.filter((item) =>
      selectedTargetItems.includes(item.id)
    );

    const updatedTargetList = targetList.filter(
      (item) => !selectedTargetItems.includes(item.id)
    );

    const updatedSourceList = [...sourceList, ...selectedTargetItemsData];
    const sortedUpdatedSourceList = updatedSourceList.sort(
      (a, b) => a.id - b.id
    );

    setSourceList(sortedUpdatedSourceList);
    setTargetList(updatedTargetList);

    setSelectedTargetItems([]);
  };

  return (
    <div>
      <div>
        <h2>Source List</h2>
        <ul>
          {sourceList.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedSourceItems.includes(item.id)}
                  onChange={() =>
                    selectedSourceItems.includes(item.id)
                      ? handleDeselectSourceItem(item.id)
                      : handleSelectSourceItem(item.id)
                  }
                />
                {item.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleTransferToTarget}>Transfer to Target</button>
        <button onClick={handleTransferToSource}>Transfer to Source</button>
      </div>
      <div>
        <h2>Target List</h2>
        <ul>
          {targetList.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedTargetItems.includes(item.id)}
                  onChange={() =>
                    selectedTargetItems.includes(item.id)
                      ? handleDeselectTargetItem(item.id)
                      : handleSelectTargetItem(item.id)
                  }
                />
                {item.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransferComponent;
