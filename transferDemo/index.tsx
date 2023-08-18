import React, { Key, useEffect, useMemo, useState } from "react"
import style from "./index.module.less"
import { Button, Modal, Popconfirm, Space, Tree, TreeDataNode } from "antd"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { filter, flow, identity, includes, isEmpty, prop, size } from "lodash/fp"
import { useMemoizedFn } from "ahooks"

const allData:TreeDataNode[] = [
    {
        title: "分组一",
        key:"1",
        children: [
            {
                title: "张三",
                key:"1-1",
            },
            {
                title: "李斯",
                key:"1-2",
            },
            {
                title: "王二麻子",
                key:"1-3",
            }
        ]
    },
]

type TreeToMapConfig = {
    idKey?: string;
    childrenKey?: string;
    needPath?: boolean;
};

export const treeToMap = (config?: TreeToMapConfig) => {
    const {
      idKey = "id",
      childrenKey = "id",
      needPath,
    } = config || {};
  
    const iterator =
      (result: Record<string, any> = {}) =>
      (node: any[], path: string[] | undefined) => {
        if (isEmpty(node)) {
          return result;
        }
  
        // eslint-disable-next-line
        for (let key in node) {
          const item = node[key];
          const id = item?.[idKey];
          const breadCrumb = needPath ? [...(path || []), id] : undefined;
          iterator(result)(item?.[childrenKey], breadCrumb);
          result[id] = flow(
            breadCrumb ? {
                ...item,
                ...breadCrumb,
              } : identity,
            !isEmpty(item?.[childrenKey]) ? {
                ...item,
                isLeaf:false,
              } : {
                ...item,
                isLeaf:true,
              }
          )(item);
        }

        return result;
      };
  
    return (tree:any) => iterator()(tree, []);
  };

type RowKey = string;

type BaseContentProp = {
    title: string;
    value: RowKey[];
    onSelect?: (rowKeys: RowKey[]) => void;
    defaultTreeSelectedKey?: string;
}

type ModalContentProp= BaseContentProp & {
  closeModal: () => void;
  open: boolean;
};

const  ModalContent = ({
    title,
    defaultTreeSelectedKey,
    value,
    onSelect,
    closeModal,
    open,
  }:ModalContentProp)=>{

    const [treeSelectedKeys, setTreeSelectedKeys] = useState<Key[]>(
        defaultTreeSelectedKey ? [defaultTreeSelectedKey] : ["1"]
    );
    const [selectIds, setSelectIds] = useState<RowKey[]>([]);

    const selectedDataSize = useMemo(() => size(selectIds), [selectIds]);
    const allDataSize = useMemo(() => size(allData), []);

    const onClearSelected = useMemoizedFn(() => {
        setSelectIds([]);
      });

    const handleSure = useMemoizedFn(() => {
        closeModal();
        onSelect?.(selectIds);
    });

    const onCheck = useMemoizedFn((checked:any) => {
        setSelectIds(checked);
    })

    const allDataMap = useMemo(()=>treeToMap({needPath: true})(allData),[])

    const onDel = useMemoizedFn((val:RowKey) => {
        if(!val) return false;
        const valData = prop(val)(allDataMap)
        let delData:string[] = []
        if(valData?.isLeaf){ //判断是否是叶子节点，是的话只删除自己，不是叶子结点，连父节点一起删除
            delData = [val]
        }else{
            delData = valData?.path
        }
        const newData = filter((key:string)=> !includes(key)(delData))(selectIds);
        setSelectIds(newData)
    })

    useEffect(() => {
        setSelectIds(value || []);
      }, [value]);

    

    const selectList = useMemo(()=> flow(
        filter((key:string)=> !!prop(`${key}.isLeaf`)(allDataMap) )
    )(selectIds),[selectIds,allDataMap])

    return (
        <Modal
        title={title}
        open={open}
        width={980}
        onCancel={closeModal}
        onOk={handleSure}
      >
        <div className={style.ModalContainer}>
            <div className={style.Content}>
                <div className={style.TreeWrap}>
                  <Tree
                      className={style.Tree}
                      checkable
                      treeData={allData}
                      defaultExpandAll
                      onSelect={(selectedKeys: Key[]) =>
                        setTreeSelectedKeys(selectedKeys)
                      }
                      selectedKeys={treeSelectedKeys}
                      onCheck={onCheck}
                      checkedKeys={selectIds}
                  />
                </div>
                <div className={style.SelectedPanel}>
                    <div className={style.Header}>
                      <Space>
                          <h4>被选择个数</h4>
                          <p>
                          (
                          <span className={style.SelectSize}>{selectedDataSize}</span>
                          /<span>{allDataSize}</span>)
                          </p>
                      </Space>
                      <Popconfirm
                          title="确认是否清楚"
                          onConfirm={onClearSelected}
                          okText="确定"
                          cancelText="取消"
                          placement="bottom"
                      >
                          <Button size="small" type="default">
                          清除
                          </Button>
                      </Popconfirm>
                    </div>
                    <div className={style.SelectedWrap}>
                        {selectList?.map((key:string, index:number) => {
                        const data = allDataMap?.[key];
                        return (
                            <div key={index} className={style.ListItem}>
                                <span>{data?.title} </span>
                                <span onClick={()=>onDel(key)}>
                                    <CloseOutlined/>
                                </span>
                            </div>
                        );
                        })}
                    </div>
                </div>
          </div>
        </div>
    </Modal>
    )
}

type SelectTreeNodeModalProps = BaseContentProp & {
    btnText?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

const useModal = () => {
    const [visible, changeVisible] = useState(false);
    return {
        visible,
        openModal: () => changeVisible(true),
        closeModal: () => changeVisible(false),
    };
}

function SelectTreeNodeModal({
    children,
    btnText,
    disabled,
    icon,
    ...resetProps
  }: SelectTreeNodeModalProps) {
    const { visible, openModal, closeModal } = useModal();
  
    return (
      <>
        {children || (
          <Button
            onClick={openModal}
            disabled={disabled}
            icon={icon || <PlusOutlined />}
          >
            {btnText}
          </Button>
        )}
        {visible && (
          <ModalContent closeModal={closeModal} open={visible} {...resetProps} />
        )}
      </>
    );
  }

  export default SelectTreeNodeModal