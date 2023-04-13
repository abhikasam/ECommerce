
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classes from './list-select.module.css';

export default function ListSelect({ items, selected, updateItems }) {

    const [search, setSearch] = useState('')
    const [selectedItems,setSelectedItems]=useState([])

    useEffect(() => {
        updateItems(selectedItems)
    }, [selectedItems])

    function update(key) {
        if (selectedItems.includes(key)) {
            setSelectedItems(prev=> prev.filter(id => id !== key))
        }
        else {
            setSelectedItems(prev=>[...prev, key])
        }
    }

    return (
        <div className="multiple-selector">
            <input type="text" className={"form-control " + classes.search} onChange={(event) => setSearch(event.target.value)} />
            <ul className={"list-group " + classes.ul}>
                {items.map(item => {
                    return (
                        <ListSelectItem key={item.key}
                            item={item}
                            search={search}
                            selected={selectedItems}
                            updateItems={()=>update(item.key)}
                        ></ListSelectItem>
                    )
                })}
            </ul>
        </div>
    )
}


export const ListSelectItem = ({ item, search,updateItems }) => {

    return (
        <li className={"list-group-item " + classes.li}
            style={{ display: (item.value.toLowerCase().includes(search) ? "block" : "none") }} >
            <input className="form-check-input me-1"
                type="checkbox" value={item.key}
                id={item.key}
                onChange={updateItems} />
            <label className={"form-check-label " + classes.label} htmlFor={item.key}>{item.value}</label>
        </li>
    )
}



