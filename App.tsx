import React, {useState} from 'react';
import './App.css';

type Item = {
	id: number;
	title: string;
}
const TransferBox = () => {
	const [leftItems, setLeftItems] = useState<Item[]>([
		{id: 1, title: 'Item 1'},
		{id: 2, title: 'Item 2'},
		{id: 3, title: 'Item 3'},
		{id: 4, title: 'Item 4'},
		{id: 5, title: 'Item 5'},
	]);

	const [rightItems, setRightItems] = useState<Item[]>([]);

	const AddItem = (item: any) => {
		setRightItems([...rightItems, item]);
		setLeftItems(leftItems.filter((leftItem) => leftItem.id !== item.id));
	};

	const RemoveItem = (item: any) => {
		setLeftItems([...leftItems, item]);
		setRightItems(rightItems.filter((rightItem) => rightItem.id !== item.id));
	};

	return (
		<div className="transfer-box">
			<div className="transfer-panel">
				<h2>可选项</h2>
				<ul>
					{leftItems.length !== 0 ? leftItems.map((item) => (
						<li key={item.id}>
							{item.title}
							<button onClick={() => AddItem(item)}>添加</button>
						</li>
					)) : <li>暂无数据</li>}
				</ul>
			</div>
			<div className="transfer-panel">
				<h2>已选项</h2>
				<ul>
					{rightItems.length !== 0 ? rightItems.map((item) => (
						<li key={item.id}>
							{item.title}
							<button onClick={() => RemoveItem(item)}>移除</button>
						</li>
					)) : <li>暂无数据</li>}
				</ul>
			</div>
		</div>
	);
};

export default TransferBox;
