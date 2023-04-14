import { useState } from "react"
import { useEffect } from "react"
import classes from './product-quantity-selector.module.css';

export default function ProductQuantitySelector({ selected,sizeMappings, individualCategory, setProductQuantites }) {

    useEffect(() => { }, [sizeMappings, individualCategory])

    const [selectedOptions, setSelectedOptions] = useState(selected.map(i => {
        return {
            sizeId:i.sizeId,quantity:i.quantity
        }
    }))

    useEffect(() => {
        setProductQuantites(selectedOptions)
        console.log(selectedOptions)
    }, [selectedOptions])

    function addMapping(mapping) {
        setSelectedOptions(prev => {
            return [...prev, mapping]
        })
    }

    function removeMapping(sizeId) {
        setSelectedOptions(prev => {
            return prev.filter(i => i.sizeId !== sizeId)
        })
    }

    return (
        <ul className="list-group">
            {sizeMappings.filter(sm => sm.parentId === individualCategory).map(sizeMapping =>
                <ProductQuantityRow key={sizeMapping.key}
                    id={sizeMapping.childId}
                    name={sizeMapping.childName}
                    addMapping={addMapping}
                    selected={selectedOptions.map(i => i.sizeId).includes(sizeMapping.childId)}
                    quantity={selectedOptions.find(i => i.sizeId === sizeMapping.childId)?.quantity}
                    removeMapping={removeMapping}
                ></ProductQuantityRow>
            )}
        </ul>
    )
}


export const ProductQuantityRow = ({ selected,quantity, id, name, addMapping, removeMapping }) => {

    const [form, setForm] = useState({
        selected: selected,
        quantity: quantity,
        sizeId: id,
        addDisable: true,
        hideClear: !selected
    })

    function mappingSelectedHandler(event) {
        setForm(prev => {
            return {
                ...prev,
                selected: event.target.checked,
                hideClear: true,
                addDisable: true,
                quantity:''
            }
        })

        if (!event.target.checked) {
            removeMapping(form.sizeId)
        }

    }

    function quantityChangeHandler(event) {
        var numValidator = /^[1-9][0-9]*$/
        setForm(prev => {
            return {
                ...prev,
                quantity: event.target.value,
                addDisable: !numValidator.test(event.target.value)
            }
        })
    }


    function submitMapping(event) {
        addMapping({ sizeId: form.sizeId, quantity: parseInt(form.quantity) })
        setForm(prev => {
            return {
                ...prev,
                addDisable: true,
                hideClear: false
            }
        })
    }

    function removeMappingHandler(event) {
        setForm(prev => {
            return {
                ...prev,
                quantity: '',
                selected: false,
                addDisable: true,
                hideClear: true
            }
        })
        removeMapping(form.sizeId)
    }

    return (
        <li className={"list-group-item " + classes.li}>
            <div className="row align-items-center">
                <div className="col-1">
                    <input className="form-check-input me-1"
                        type="checkbox"
                        value={id}
                        checked={form.selected}
                        onChange={mappingSelectedHandler}
                        htmlFor="sizeMapping"
                    />
                </div>
                <div className="col-2">
                    <label className={"form-check-label " + classes.label} htmlFor="sizeMapping">{name}</label>
                </div>
                {
                    form.selected &&
                    <>
                        <div className="col-3">
                            <input type="text"
                                className="form-control"
                                value={form.quantity}
                                onChange={quantityChangeHandler}
                                disabled={!form.hideClear}
                                required />
                        </div>
                        <div className="col-2 m-2">
                            <input type="button" value="Add" disabled={form.addDisable} className="btn btn-secondary" onClick={(event) => submitMapping(event)} />
                        </div>
                        {!form.hideClear &&
                            <div className="col-2 m-2">
                                <input type="button" value="Clear" className="btn btn-secondary" onClick={(event) => removeMappingHandler(event)} />
                            </div>}
                    </>
                }
            </div>
        </li>
    )
}

