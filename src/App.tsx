import React, { useState } from 'react';
import './App.css';

/**
 * 以下代码提供了一个简单穿梭框的功能实现，但是还可以在以下几个方面继续优化迭代：
 * 1、最小化 DOM 更新：可以使用 map 函数生成 JSX 元素数组，然后一次性渲染所有项目，而不是单独渲染每个项目
 * 2、当根据先前状态更新状态时，使用 setState 的形式来避免状态更新过时的问题。
 * 3、利用 React 的 React.memo 来记忆渲染的组件，这可以防止不必要的重新渲染
 * 4、确保每个渲染 item 都有唯一的 key prop，这有助于 React 有效地跟踪虚拟 DOM 中的变化。
 * 5、节流&抖动：可以使用 Lodash 等库来实现节流
 */
interface Item {
  id: number;
}

function App() {
  const initData: Item[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const [store, setStore] = useState<{
    left: Item[];
    right: Item[];
  }>({
    left: initData,
    right: [],
  });

  const [lTemp, setLTemp] = useState<Item[]>([]);
  const [rTemp, setRTemp] = useState<Item[]>([]);

  const toggleItem = (item: Item, type: 'left' | 'right') => {
    if (type === 'left') {
      setLTemp(prevTemp =>
        prevTemp.includes(item) ? prevTemp.filter(i => i.id !== item.id) : [...prevTemp, item]
      );
    } else if (type === 'right') {
      setRTemp(prevTemp =>
        prevTemp.includes(item) ? prevTemp.filter(i => i.id !== item.id) : [...prevTemp, item]
      );
    }
  };

  const moveTo = (type: 'left' | 'right') => {
    if (type === 'right') {
      setStore(prevStore => ({
        left: prevStore.left.filter(item => !lTemp.includes(item)),
        right: [...prevStore.right, ...lTemp],
      }));
      setLTemp([]);
    } else if (type === 'left') {
      setStore(prevStore => ({
        left: [...prevStore.left, ...rTemp],
        right: prevStore.right.filter(item => !rTemp.includes(item)),
      }));
      setRTemp([]);
    }
  };

  return (
    <div className="App">
      <main>
        <section id="session1">
          {store.left.map(item => (
            <div key={item.id}>
              <input
                type="checkbox"
                id={item.id.toString()}
                onClick={() => toggleItem(item, 'left')}
              />
              <label htmlFor={item.id.toString()}>{item.id}</label>
            </div>
          ))}
        </section>
        <section id="lr">
          <button id="btn-right" onClick={() => moveTo('right')}>
            right &gt;
          </button>
          <button id="btn-left" onClick={() => moveTo('left')}>
            &lt; left
          </button>
        </section>
        <section id="session3">
          {store.right.map(item => (
            <div key={item.id}>
              <input
                type="checkbox"
                id={item.id.toString()}
                onClick={() => toggleItem(item, 'right')}
              />
              <label htmlFor={item.id.toString()}>{item.id}</label>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
