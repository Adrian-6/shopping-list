import LineItem from "./LineItem"

const ItemList = ({ items, handleCheck, handleDelete }) => {

    return (
        <ul>
            {items.map((item) => (
                <LineItem handleCheck={handleCheck} handleDelete={handleDelete} item={item}/>
            )
            )}
        </ul>
    )
}
export default ItemList