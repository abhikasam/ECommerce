
import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import classes from './list-select.module.css';

export default function ListSelect({ items, updateItems }) {

    const [selected, setSelected] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        updateItems(selected)
    }, [selected, updateItems])

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

    return (
        <>
            <input type="text" className={"form-control " + classes.search} onChange={(event) => setSearch(event.target.value)} />
            <ul className={"list-group " + classes.ul}>
                {items.map(item => {
                    return (
                        <li className={"list-group-item " + classes.li} key={item.key}
                            style={{ display: (item.value.toLowerCase().includes(search) ? "block" : "none") }} >
                            <input className="form-check-input me-1"
                                type="checkbox" value={item.key}
                                id={item.key}
                                onChange={(event) => { selectedChangeEvent(event) }} />
                            <label className={"form-check-label " + classes.label} htmlFor={item.key}>{item.value}</label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}


