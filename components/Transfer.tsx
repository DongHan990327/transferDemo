import React, { type ReactElement, useEffect, useState, useMemo } from "react";
import styles from './transfer.module.css';

interface RecordType {
  key: string;
  title: string;
  desc?: string;
  selected: boolean;
}

interface IProps {
  dataSource: RecordType[];
  onChange: (nextTargetKeys: string[], direction: string, moveKeys: string[]) => void;
  onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  leftTitle: string;
  rightTitle: string;
}

export default function Transfer(props: IProps): ReactElement {
  const {
    dataSource, onChange, onSelectChange, leftTitle, rightTitle
  } = props;

  const [leftItems, setLeftItems] = useState<RecordType[]>([]);
  const [rightItems, setRightItems] = useState<RecordType[]>([]);
  const [isSelectLeftAll, setIsSelectLeftAll] = useState<boolean>(false);
  const [isSelectRightAll, setIsSelectRightAll] = useState<boolean>(false);

  const leftSelectCount = useMemo(() => {
    let count = 0;
    leftItems.forEach(item => {
      count += item.selected ? 1 : 0;
    })
    return count;
  }, [leftItems])

  const rightSelectCount = useMemo(() => {
    let count = 0;
    rightItems.forEach(item => {
      count += item.selected ? 1 : 0;
    })
    return count;
  }, [rightItems])

  // 选中所有
  const selectAll = (leftOrRight: string): void => {

    const job = (selected: boolean) => {
      return (preItems: RecordType[]) => {
        const ret = preItems.map(item => ({...item, selected}));
        return ret;
      }
    }

    if(leftOrRight === 'left') {
      if(isSelectLeftAll) {
        setIsSelectLeftAll(false);
        setLeftItems(job(false));
      } else {
        setIsSelectLeftAll(true);
        setLeftItems(job(true));
      }
    } else {
      if(isSelectRightAll) {
        setIsSelectRightAll(false);
        setRightItems(job(false));
      } else {
        setIsSelectRightAll(true);
        setRightItems(job(true));
      }
    }
    
  }

  // 选中单个的项
  const selectItem = (item: RecordType, leftOrRight: string): void => {
    item.selected = !item.selected;
    if(leftOrRight === 'left') {
      setLeftItems([...leftItems]);
    } else {
      setRightItems([...rightItems]);
    }
  }

  //转移
  const trans = (direction: string): void => {
    if(direction === 'toRight') {
      if(leftSelectCount <= 0) return;
      setRightItems((preRightItems) => {
        return [...preRightItems, ...(leftItems.filter(item => item.selected))];
      })
      setLeftItems((preLeftItems) => preLeftItems.filter(item => !item.selected));
    } else {
      if(rightSelectCount <= 0) return;
      setLeftItems((preLeftItems) => {
        return [...preLeftItems, ...(rightItems.filter(item => item.selected))];
      })
      setRightItems(preRightItems => preRightItems.filter(item => !item.selected));
    }
  }

  useEffect(() => {
    setLeftItems(dataSource.map(item => ({
      ...item,
      selected: false || item.selected, 
    })));
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.left_title}>
          <div style={{display: 'flex'}}>
            <input type="checkbox" checked={isSelectLeftAll} onChange={() => selectAll('left')} />
            <div>{leftSelectCount>0 ? `${leftSelectCount}/` : ''}{ leftItems.length }项</div>
          </div>
          <div>{ leftTitle }</div>
        </div>

        <div className={styles.left_content}>
          <ul>
            {leftItems.map(item => (
              <li key={item.key} className={styles.left_content_item}>
                <input type="checkbox" checked={item.selected || false} onChange={() => selectItem(item, 'left')} />
                <div className={styles.item_title}>
                  {item.title}
                </div>
              </li>)
            )}
          </ul>
        </div>
      </div>
      <div className={styles.mid}>
        <div className={styles.dayu} style={{
          cursor: leftSelectCount<=0 ? 'not-allowed':'pointer'
        }} onClick={() => trans('toRight')}>＞</div>
        <div className={styles.xiaoyu}style={{
          cursor: rightSelectCount<=0 ? 'not-allowed':'pointer'
        }} onClick={() => trans('toLeft')}>＜</div>
      </div>
      <div className={styles.right}>
        <div className={styles.right_title}>
          <div style={{display: 'flex'}}>
            <input type="checkbox" checked={isSelectRightAll} onChange={() => selectAll('right')} />
            <div>{rightSelectCount>0 ? `${rightSelectCount}/` : ''}{ rightItems.length }项</div>
          </div>
          <div>{ rightTitle }</div>
        </div>

        <div className={styles.right_content}>
          <ul>
            {rightItems.map(item => (
              <li key={item.key} className={styles.right_content_item}>
                <input type="checkbox" checked={item.selected || false} onChange={() => selectItem(item, 'left')} />
                <div className={styles.item_title}>
                  {item.title}
                </div>
              </li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}