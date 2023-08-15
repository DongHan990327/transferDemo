import React, { useMemo, useState, useCallback } from "react";
import './transfer.css';

export interface TransferDataProps {
	id: string;
	name: string;
}

// 随机生成一个包含id, name的长度为10的数组
const transferMockData: TransferDataProps[] = Array.from({ length: 10 }, (_, index) => ({
	id: `${index}`,
	name: `name${index}`,
}));

//数组去重
const unique = (arr: string[]) => {
	return Array.from(new Set(arr));
};

export default React.memo(() => {
	const [leftSelectedData, setLeftSelectedData] = useState<string[]>([]);
	const [rightSelectedData, setRightSelectedData] = useState<string[]>([]);
	const [rightOriginData, setRightOriginData] = useState<string[]>([]);
	const isChecked = (id: string, data: string[]) => {
		if (data.find((item) => item === id)) return true;
		return false;
	};
	const handleLeftChange = useCallback((id: string) => {
		if (isChecked(id, leftSelectedData)) {
			setLeftSelectedData((prev) => prev.filter((item) => item !== id));
		} else {
			setLeftSelectedData((prev) => [...prev, id]);
		}
	}, [leftSelectedData]);
	const handleRightChange = useCallback((id: string) => {
		if (isChecked(id, rightSelectedData)) {
			setRightSelectedData((prev) => prev.filter((item) => item !== id));
		} else {
			setRightSelectedData((prev) => [...prev, id]);
		}
	}, [rightSelectedData]);
	const onTransferToRight = useCallback(() => {
		setRightOriginData((prev) => [...prev, ...leftSelectedData]);
		setLeftSelectedData([]);
	}, [leftSelectedData]);
	const onTransferToLeft = useCallback(() => {
		setRightOriginData((prev) => prev.filter((item) => !isChecked(item, rightSelectedData)));
		setRightSelectedData([]);
	}, [rightSelectedData]);
	const rightData = useMemo(() => transferMockData.filter((item) => isChecked(item.id, rightOriginData)), [rightOriginData]);
	return (
		<div className='Wrapper'>
			<div className="Content">
				{transferMockData.map((item) => {
					return (
						<div key={item.id}>
							<input type='checkbox'
								disabled={isChecked(item.id, rightOriginData)}
								checked={isChecked(item.id, unique([...leftSelectedData, ...rightOriginData]))} onChange={() => handleLeftChange(item.id)} />
							<span>{item.name}</span>
						</div>
					);
				})}
			</div>
			<div className="BtnContainer">
				<button
					disabled={leftSelectedData?.length === 0}
					onClick={onTransferToRight}>》</button>
				<button
					disabled={rightSelectedData?.length === 0}
					onClick={onTransferToLeft}>《</button>
			</div>
			<div className="Content">
				{
					rightData?.length > 0 ?<>{rightData.map((item) => {
						return (
							<div key={item.id}>
								<input type='checkbox' checked={isChecked(item.id, rightSelectedData)} onChange={() => handleRightChange(item.id)} />
								<span>{item.name}</span>
							</div>
						);
					})}</>:<span className="Empty">暂无数据</span>
				}
			</div>
		</div>
	)

})
