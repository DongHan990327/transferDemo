
import { useEffect, useState } from "react"
import _styles from "./Transfer.less"
import { Button } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
interface IDataSource {
    key: string | number,
    title: string | JSX.Element,
    description: string | JSX.Element
}

interface ITansferView {
    title: ITansfer["titles"][number],
    data: ITansfer["dataSource"]
    checkKey: Array<IDataSource["key"]>
    setCheckKey: Function
    render: ITansfer["render"]
}
const TansferView = (props: ITansferView) => {
    const { title = "", data = [], checkKey, setCheckKey, render } = props
    const [checkboxAllStatus, setCheckboxAllStatus] = useState<boolean>()
    const checkAllOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxAllStatus(e.target.checked)
        if (e.target.checked) {
            setCheckKey(data.map(item => item.key))
            return
        }
        setCheckKey([])
    }
    const checkOnChange = (status: boolean, item: IDataSource) => {
        if (status) {
            setCheckKey((v: ITansferView["checkKey"]) => v.concat([item.key]))
            setCheckboxAllStatus(checkKey.length + 1 === data.length)
            return
        }
        setCheckboxAllStatus(false)
        setCheckKey((v: ITansferView["checkKey"]) => v.filter(vItem => vItem != item.key))
    }

    return <div className={_styles["transfer-box"]}>
        <div className={_styles["transfer-box-titleBody"]}>
            <div className={_styles["transfer-box-titleBody-left"]}>
                <input
                    type="checkbox"
                    onChange={
                        checkAllOnChange
                    }
                    checked={checkboxAllStatus && !!checkKey.length}
                />
                <span className={_styles["transfer-box-titleBody-left-sum"]}>{checkKey.length ? `${checkKey.length}/` : ""}{data.length}项</span>
            </div>
            <div className={_styles["transfer-box-titleBody-right"]}>
                {title}
            </div>
        </div>
        <div className={_styles["transfer-box-content"]}>
            {
                data.map(item => <div className={_styles["transfer-box-conten-item"]} key={item.key}>
                    <input type="checkbox" checked={checkKey.includes(item.key)} onChange={(e) => checkOnChange(e.target.checked, item)} />
                    <span className={_styles["transfer-box-content-item-text"]}> {render(item)}</span>
                </div>)
            }

        </div>
    </div>
}
interface ITansfer {
    dataSource: Array<IDataSource>,
    titles: [string | JSX.Element, string | JSX.Element]
    onSelectChange: (src: Array<IDataSource["key"]>, dst: Array<IDataSource["key"]>) => void//选中项发生改变时的回调函数
    render: (record: IDataSource) => JSX.Element | number | string
}
export default (props: ITansfer) => {
    const { onSelectChange, render, titles, dataSource } = props

    const [srcData, setSrcData] = useState<ITansfer["dataSource"]>(dataSource)
    const [dstData, setDstData] = useState<ITansfer["dataSource"]>([])
    const [srcCheckKey, setSrcCheckKey] = useState<Array<IDataSource["key"]>>([])
    const [dstCheckKey, setDstCheckKey] = useState<Array<IDataSource["key"]>>([])
    const srcToDst = () => {
        setSrcCheckKey([])
        setSrcData(v => v.filter(v => !srcCheckKey.includes(v.key)))
        setDstData(dstData => dstData.concat(srcData.filter(v => srcCheckKey.includes(v.key))))
    }
    const dstToSrc = () => {
        setDstCheckKey([])
        setDstData(v => v.filter(v => !dstCheckKey.includes(v.key)))
        setSrcData(srcData => srcData.concat(dstData.filter(v => dstCheckKey.includes(v.key))))

    }
    useEffect(() => {
        onSelectChange(srcCheckKey, dstCheckKey)
    }, [srcCheckKey,
        dstCheckKey
    ])
    return <main className={_styles["transfer"]}>
        <TansferView
            title={titles[0]}
            data={srcData}
            checkKey={srcCheckKey}
            setCheckKey={setSrcCheckKey}
            render={render}
        />
        <div>
            <Button disabled={!srcCheckKey.length} onClick={srcToDst}>
                <RightOutlined />
            </Button>
            <br />
            <Button disabled={!dstCheckKey.length} onClick={dstToSrc}>
                <LeftOutlined />
            </Button>
        </div>
        <TansferView
            title={titles[1]}
            data={dstData}
            checkKey={dstCheckKey}
            setCheckKey={setDstCheckKey}
            render={render}

        />
    </main>
}