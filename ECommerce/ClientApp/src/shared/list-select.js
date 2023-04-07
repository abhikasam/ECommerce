
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import classes from './list-select.module.css';

export default function ListSelect(props) {

    const [filteredItems, setFilteredItems] = useState(props.items)
    const [selected, setSelected] = useState([])

    useEffect(() => {
        props.updateItems(selected)
    }, [selected])

    useEffect(() => {
        setFilteredItems(props.items)
    }, [props.items])

    const selectedChangeEvent = (event) => {
        if (event.target.checked) {
            setSelected(prev => {
                return [...prev, event.target.value];
            })
        }
        else {
            setSelected(prev => {
                return prev.filter(id => id !== event.target.value)
            })
        }
    }

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
                                onChange={(event) => { selectedChangeEvent(event) } } />
                            <label className={"form-check-label " + classes.label} htmlFor={item.key}>{item.value}</label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}


