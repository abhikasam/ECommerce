
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classes from './list-select.module.css';

export default function ListSelect({ items,type, selected, updateItems,showSearch,style }) {

    const [search, setSearch] = useState('')

    return (
        <div className="multiple-selector">
            {showSearch && 
                <input type="text" className={"form-control " + classes.search} onChange={(event) => setSearch(event.target.value)} />
            }
            <ul className={"list-group " + classes.ul} style={style}>
                {items.map(item => {
                    return (
                        <ListSelectItem
                            key={item.key}
                            item={item}
                            type={type}
                            search={search}
                            selected={selected.includes(item.key)}
                            updateItems={() => updateItems(item.key)}
                        ></ListSelectItem>
                    )
                })}
            </ul>
        </div>
    )
}


export const ListSelectItem = ({ item, type, search, selected, updateItems}) => {

    useEffect(() => {
        if (selected) {
            document.getElementById(type+"-" + item.key).checked = true
        }
    },[selected,type,item.key])

    return (
        <li className={"list-group-item " + classes.li}
            style={{ display: (item.value.toLowerCase().includes(search) ? "block" : "none") }} >
            <input className="form-check-input me-1" 
                type="checkbox" value={item.key}
                id={type + "-" + item.key}
                onChange={updateItems} />
            <label className={"form-check-label text-break " + classes.label} htmlFor={item.key}>{item.value}</label>
        </li>
    )
}



