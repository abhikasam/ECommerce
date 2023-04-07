
import { useState } from "react"
import { useDispatch } from "react-redux"
import classes from './list-select.module.css';

export default function ListSelect(props) {

    const dispatch = useDispatch()
    const [filteredItems, setFilteredItems] = useState(props.items)

    const filterItems = (event) => {
        setFilteredItems(props.items.filter(item => item.value.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
        <>
            <input type="text" className={"form-control " + classes.search} onChange={(event) => filterItems(event)} />
            <ul className={"list-group " + classes.ul}>
                {filteredItems.map(item => {
                    return (
                        <li className={"list-group-item " + classes.li} key={item.key}>
                            <input className="form-check-input me-1"
                                type="checkbox" value={item.key}
                                id={item.key}
                                onChange={(event) => { props.updateItems(event.target.value) } } />
                            <label className={"form-check-label " + classes.label} htmlFor={item.key}>{item.value}</label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}


