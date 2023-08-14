import { useState, FC, useCallback, ChangeEvent } from "react";
import styles from './trans.module.scss'

export type DataItem = {
  id: number
  label: string
  value: number | string
}
export type PropType = {
  leftData: DataItem[]
  rightData: DataItem[],
  children?: Record<string, any>
}

const Transfer: FC<PropType> = (props) => {
  const [leftData, setLeftData] = useState(props.leftData)
  const [rightData, setRightData] = useState(props.rightData)
  const [left, setLeft] = useState<DataItem[]>([])
  const [right, setRight] = useState<DataItem[]>([])

  const pushDataToRight = () => {
    const chooseIds = left.map(li => li.id)
    const leftItems = leftData.filter(li => !chooseIds.includes(li.id))
    setRightData([...left, ...rightData])
    setLeftData(leftItems)
    setLeft([])
  }
  const pushDataToLeft = () => {
    const chooseIds = right.map(li => li.id)
    const rightItems = rightData.filter(li => !chooseIds.includes(li.id))
    setLeftData([...right, ...leftData])
    setRightData(rightItems)
    setRight([])
  }
  function leftChange(e: ChangeEvent<HTMLInputElement>, li: DataItem, type: string) {
    const dataSource = type === 'left' ? left : right
    const val = Number(e.target.value)
    const items = dataSource.filter(item => item.id === val)
    if (items.length === 0) {
      type === 'left' ? setLeft([li, ...dataSource]) : setRight([li, ...dataSource])
    } else {
      const newArr = dataSource.filter(item => item.id !== val)
      type === 'left' ? setLeft(newArr) : setRight(newArr)
    }
  }

  return <div className={styles.transferWrapper}>
    <div className={styles.leftBox}>
      {leftData.map(li => <div key={li.id} className={styles.liItem}>
        <input value={li.id} type="checkbox" onChange={e => leftChange(e, li, 'left')} />
        <span>{li.label}</span>
      </div>)}
    </div>
    <div className={styles.controlBtnBox}>
      <button disabled={left.length <= 0} onClick={pushDataToRight}>{'>'}</button>
      <button disabled={right.length <= 0} onClick={pushDataToLeft}>{'<'}</button>
    </div>
    <div className={styles.rightBox}>
      {rightData.map(li => <div key={li.id} className={styles.liItem}>
        <input value={li.id} type="checkbox" onChange={e => leftChange(e, li, 'right')} />
        <span>{li.label}</span>
      </div>)}
    </div>
  </div>
}

export default Transfer
