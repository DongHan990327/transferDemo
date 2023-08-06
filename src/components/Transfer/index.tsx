/*
 * @Author: 冉俊 18408248904
 * @Date: 2023-08-07 10:42:43
 * @Last Modified by:   冉俊
 * @Last Modified time: 2023-08-07 10:42:43
 */

import { useState } from 'react';
import styles from './index.less';

type Item = {
  key: string | number;
  title: string | number;
}[];
type key = (string | number)[];

interface IProps {
  dataSource: Item;
  defaultTargetKeys?: key;
}

const Transfer: React.FC<IProps> = ({
  dataSource = [],
  defaultTargetKeys = [],
}) => {
  const [selectedKeys, setSelectedKeys] = useState<key>([]);
  const [targetKeys, setTargetKeys] = useState<key>(defaultTargetKeys);

  // 创建左
  const createSuorce = () => {
    return dataSource.map((item) => {
      if (!targetKeys.includes(item.key)) {
        return (
          <div
            className={`${styles.boxItem} ${
              selectedKeys.includes(item.key) ? styles.selectedItem : ''
            }`}
            key={item.key}
            onClick={() => {
              let res = selectedKeys;

              if (selectedKeys.includes(item.key)) {
                res.splice(selectedKeys.indexOf(item.key), 1);
              } else {
                res = [...res, item.key];
              }

              setSelectedKeys([...res]);
            }}
          >
            <div className={styles.radio}>
              {selectedKeys.includes(item.key) ? '✔' : ''}
            </div>
            {item.title}
          </div>
        );
      }
    });
  };
  // 创建右
  const createTarget = () => {
    return dataSource.map((item: any) => {
      if (targetKeys.includes(item.key)) {
        return (
          <div
            className={`${styles.boxItem} ${
              selectedKeys.includes(item.key) ? styles.selectedItem : ''
            }`}
            key={item.key}
            onClick={() => {
              let res = selectedKeys;

              if (selectedKeys.includes(item.key)) {
                res.splice(selectedKeys.indexOf(item.key), 1);
              } else {
                res = [...res, item.key];
              }

              setSelectedKeys([...res]);
            }}
          >
            <div className={styles.radio}>
              {selectedKeys.includes(item.key) ? '✔' : ''}
            </div>
            {item.title}
          </div>
        );
      }
    });
  };

  // 点击箭头
  const handleChange = (direction: string) => {
    if (direction === 'l2r') {
      let leftSelected: key = [];

      selectedKeys.map((item) => {
        if (!targetKeys.includes(item)) {
          leftSelected.push(item);
        }
      });

      setTargetKeys([...targetKeys, ...leftSelected]);

      const newSelectedKeys: key = [];
      selectedKeys.map((item) => {
        if (!leftSelected.includes(item)) {
          newSelectedKeys.push(item);
        }
      });
      setSelectedKeys([...newSelectedKeys]);
    } else if ((direction = 'r2l')) {
      let rightSelected: key = [];

      selectedKeys.map((item) => {
        if (targetKeys.includes(item)) {
          rightSelected.push(item);
        }
      });

      let newTargetKeys: key = [];
      targetKeys.map((item, index) => {
        if (!rightSelected.includes(item)) {
          newTargetKeys.push(item);
        }
      });

      setTargetKeys([...newTargetKeys]);

      let newSelectedKeys: key = [];
      selectedKeys.map((item, index) => {
        if (!rightSelected.includes(item)) {
          newSelectedKeys.push(item);
        }
      });
      setSelectedKeys([...newSelectedKeys]);
    }
  };

  // 检测是否全选
  const checkAll = (type: string) => {
    if (type === 'source') {
      const leftSource = dataSource
        .filter((item) => !targetKeys.includes(item.key))
        .map((item) => item.key);
      const leftSelected: key = [];
      selectedKeys.map((item) => {
        if (!targetKeys.includes(item)) {
          leftSelected.push(item);
        }
      });

      return (
        leftSource.length > 0 &&
        leftSelected.length > 0 &&
        leftSource.length === leftSelected.length &&
        leftSource.filter((t) => !leftSelected.includes(t)).length === 0
      );
    } else if (type === 'target') {
      const rightSource = targetKeys;
      const rightSelected: key = [];
      selectedKeys.map((item) => {
        if (targetKeys.includes(item)) {
          rightSelected.push(item);
        }
      });

      return (
        rightSource.length > 0 &&
        rightSelected.length > 0 &&
        rightSource.length === rightSelected.length &&
        rightSource.filter((t) => !rightSelected.includes(t)).length === 0
      );
    }
  };

  // 全选/全不选
  const switchAll = (type: string) => {
    if (type === 'source') {
      const isAll = checkAll('source');
      if (isAll) {
        const leftSelected: key = [];
        selectedKeys.map((item) => {
          if (!targetKeys.includes(item)) {
            leftSelected.push(item);
          }
        });
        const newSelectedKeys = selectedKeys.filter(
          (item) => !leftSelected.includes(item),
        );

        setSelectedKeys([...newSelectedKeys]);
      } else {
        const leftSource = dataSource
          .filter((item) => !targetKeys.includes(item.key))
          .map((item) => item.key);

        const newSelectedKeys = [...new Set([...leftSource, ...selectedKeys])];

        setSelectedKeys([...newSelectedKeys]);
      }
    } else if (type === 'target') {
      const isAll = checkAll('target');
      if (isAll) {
        const rightSelected: key = [];
        selectedKeys.map((item) => {
          if (targetKeys.includes(item)) {
            rightSelected.push(item);
          }
        });
        const newSelectedKeys = selectedKeys.filter(
          (item) => !rightSelected.includes(item),
        );

        setSelectedKeys([...newSelectedKeys]);
      } else {
        const rightSource = targetKeys;

        const newSelectedKeys = [...new Set([...rightSource, ...selectedKeys])];

        setSelectedKeys([...newSelectedKeys]);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.boxHeader}>
          <div
            className={styles.radio}
            onClick={() => {
              switchAll('source');
            }}
          >
            {checkAll('source') ? '✔' : ''}
          </div>
          {dataSource.length - targetKeys.length}项
          <div className={styles.boxTitle}>source</div>
        </div>
        <div className={styles.boxContent}>{createSuorce()}</div>
      </div>
      <div className={styles.arrow}>
        <div
          onClick={() => {
            handleChange('l2r');
          }}
        >
          {'>'}
        </div>
        <div
          onClick={() => {
            handleChange('r2l');
          }}
        >
          {'<'}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxHeader}>
          <div
            className={styles.radio}
            onClick={() => {
              switchAll('target');
            }}
          >
            {checkAll('target') ? '✔' : ''}
          </div>
          {targetKeys.length}项<div className={styles.boxTitle}>target</div>
        </div>
        <div className={styles.boxContent}>{createTarget()}</div>
      </div>
    </div>
  );
};

export default Transfer;
