import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBrands } from "../store/brand-actions"
import classes from './brand-select.module.css';


export default function BrandSelect() {

    const dispatch = useDispatch()
    const { brands } = useSelector(state => state.brand)
    const [filteredItems, setFilteredItems] = useState(brands)

    const [selected, setSelected] = useState([])

    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])

    const updatedSelected = (event) => {
        if (event.target.checked) {
            setSelected(prev => {
                let updated = [...prev]
                updated.push(event.target.value)
                return updated;
            })
        }
        else {
            setSelected(prev =>
                prev.filter(i => i !== event.target.value))
        }
    }

    const filterBrands = (event) => {
        setFilteredItems(brands.filter(brand => brand.value.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
        <>
            <input type="text" className={"form-control " + classes.search} onChange={(event) => filterBrands(event)} />
            <ul className={"list-group " + classes.ul}>
                {filteredItems.map(brand => {
                    return (
                        <li className={"list-group-item " + classes.li} key={brand.key}>
                            <input className="form-check-input me-1"
                                type="checkbox" value={brand.key}
                                id={brand.key}
                                onChange={updatedSelected} />
                            <label className={"form-check-label " + classes.label} htmlFor={brand.key}>{brand.value}</label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

