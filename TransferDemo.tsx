import Transfer from "./components/Transfer";

export default () => {
  const leftData = [
    { id: 1, label: '元素1', value: 1 },
    { id: 2, label: '元素2', value: 2 },
    { id: 3, label: '元素3', value: 3 },
  ]
  const rightData = [
    { id: 4, label: '元素4', value: 4 },
    { id: 5, label: '元素5', value: 5 },
    { id: 6, label: '元素6', value: 6 },
  ]

  return <>
    <Transfer leftData={leftData} rightData={rightData} />
  </>
}
