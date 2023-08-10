/**
 * @author 何杨
 * @filename transferDemo.tsx
 * @date 2023-08-10 Thursday
 * @description 穿梭框组件
 */
import { useSetState } from 'ahooks'
import React from 'react'
import TransferComponet from './TransferComponet'

//穿梭框定义对象
export interface TransferListOB {
    title: string//标题
    key: string//唯一标识
}


let llist: TransferListOB[] = [1, 2, 3, 4, 5, 6, 7].map((num: number) => ({ title: '左边穿梭框' + num, key: '1' + num }))
let rlis2: TransferListOB[] = [8, 9, 10, 11, 12].map((num: number) => ({ title: '右边穿梭框' + num, key: '1' + num }))

type TsState = {
    rightList: TransferListOB[],//右边的穿梭框
    leftList: TransferListOB[],//左边穿梭框
}

const TransferDemo: React.FC = () => {
    const [{ rightList, leftList }, setState] = useSetState<TsState>({
        rightList: rlis2,
        leftList: llist,
    })
    return (
        <TransferComponet
            rightList={rightList}
            leftList={leftList}
            change={(obj) => { setState(obj) }}
        />
    )
}

export default TransferDemo