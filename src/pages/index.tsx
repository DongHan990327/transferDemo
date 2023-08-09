import Transfer from "./Transfer"
export default () => {

    return <Transfer
        dataSource={Array.from({ length: 20 }).map((_, i) => ({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
        }))}
        titles={["SRC", "DST"]}
        onSelectChange={(src, dst) => {
            console.log(src, dst);

        }}
        render={
            function (record) {
                return record.title
            }
        }
    />
}