import { useState } from 'react'
import './App.css'

interface RecordType {
  key: string;
  title: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

function App() {
  const [left, setLeft] = useState<RecordType[]>([...mockData])
  const [right, setRight] = useState<RecordType[]>([])

  const [leftSelected, setLeftSelected] = useState<RecordType[]>([])
  const [rightSelected, setRightSelected] = useState<RecordType[]>([])

  const toRight = () => {
    setRight([...leftSelected, ...right])
    setLeft(left.filter(item => !leftSelected.includes(item)))
    setLeftSelected([])
  }

  const toLeft = () => {
    setLeft([...left, ...rightSelected])
    setRight(right.filter(item => !rightSelected.includes(item)))
    setRightSelected([])
  }

  const selectDataLeft = (item: RecordType) => {
    if (leftSelected.includes(item)) {
      setLeftSelected(leftSelected.filter(i => i !== item))
    } else {
      setLeftSelected([...leftSelected, item])
    }
  }

  const selectDataRight = (item: RecordType) => {
    if (rightSelected.includes(item)) {
      setRightSelected(rightSelected.filter(i => i !== item))
    } else {
      setRightSelected([...rightSelected, item])
    }
  }

  return (
    <div className='App'>
      <div className="left">
        <h3>Left</h3>
        <ul>
          {left.map((item, index) => (
            <li className='data' key={item.key} onClick={() => selectDataLeft(item)}>
              <input type="checkbox" readOnly checked={leftSelected.includes(item)} />
              <label htmlFor="">{item.title}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="center">
        <button
          onClick={() => toLeft()}
        >
          to left
        </button>
        <button
          onClick={() => toRight()}
        >
          to right
        </button>
      </div>
      <div className="right">
        <h3>Right</h3>
        <ul>
          {right.map((item, index) => (
            <li className='data' key={item.key} onClick={() => selectDataRight(item)}>
              <input type="checkbox" readOnly checked={rightSelected.includes(item)} />
              <label htmlFor="">{item.title}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
