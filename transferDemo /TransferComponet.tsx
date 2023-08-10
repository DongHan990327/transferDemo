/**
 * @author 何杨
 * @filename TransferComponet.tsx
 * @date 2023-08-10 Thursday
 * @description 穿梭框组件
 */

import { useSetState } from 'ahooks'
import React from 'react'
import { TransferListOB } from './transferPage'


export interface ChangeTransferFnOB {
    rightList: TransferListOB[],//右边的穿梭框
    leftList: TransferListOB[],//左边穿梭框
}

type TransferComponetProps = {
    rightList: TransferListOB[],//右边的穿梭框
    leftList: TransferListOB[],//左边穿梭框
    change: (obj: ChangeTransferFnOB) => void
}


type TsState = {

}

const TransferComponet: React.FC<TransferComponetProps> = ({ rightList, leftList, change }) => {
    const [{ }, setState] = useSetState<TsState>({

    })

    /**
     * @author 何杨
     * @date 2023-08-10 Thursday
     * @function 更改穿梭框
     * @param {item:当点击前对象, name:当前事件对象所在的数组名称} 
     */
    const changeTransfer = (item: TransferListOB, name: 'leftList' | 'rightList') => {
        let newRlist = { rightList, leftList }
        switch (name) {
            case 'leftList':
                newRlist.leftList = leftList.filter((x: TransferListOB) => x.key !== item.key)
                rightList.push(item)
                newRlist.rightList = rightList
                break;
            case 'rightList':
                newRlist.rightList = rightList.filter((x: TransferListOB) => x.key !== item.key)
                leftList.push(item)
                newRlist.leftList = leftList
                break;
        }
        change(newRlist)
    }

    return (
        <div style={{ display: 'flex' }}>
            <ul style={{padding:"20px 40px", border:"1px solid #ccc", borderRadius:6, background:"#fff"}}>
                <h3>左边穿梭框</h3>
                {
                    leftList.map((item: TransferListOB) => (
                        <li style={{ cursor: 'pointer', padding: '10px' }} key={item.key} onClick={() => changeTransfer(item, 'leftList')}>{item.title}</li>
                    ))
                }
            </ul>
            <div style={{ width: '30px' }}></div>
            <ul style={{padding:'20px 40px', border:"1px solid #ccc", borderRadius:6, background:"#fff"}}>
                <h3>右边穿梭框</h3>
                {
                    rightList.map((item: TransferListOB) => (
                        <li style={{ cursor: 'pointer', padding: '10px' }} key={item.key} onClick={() => changeTransfer(item, 'rightList')}>{item.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TransferComponet