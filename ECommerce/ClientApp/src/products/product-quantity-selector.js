import { useState } from "react"
import { useEffect } from "react"
import classes from './product-quantity-selector.module.css';

export default function ProductQuantitySelector({ selected, sizeMappings, individualCategory, setProductQuantites }) {

    useEffect(() => { }, [sizeMappings, individualCategory])

    const [selectedSizes, setSelectedSizes] = useState(selected)

    useEffect(() => {
        setSelectedSizes(selected)
    }, [selected, setSelectedSizes])
    
    function updateProductQuantities(pq) {
        setProductQuantites([...selected,pq])
    }

    function removeProductQuantity(sizeId) {
        setProductQuantites(selected.filter(i => i.sizeId !== sizeId))
    }

    return (
        <ul className="list-group">
            {sizeMappings.filter(sm => sm.parentId === individualCategory).map(sizeMapping =>
                <ProductQuantity key={sizeMapping.childId}
                    sizeMapping={sizeMapping}
                    selected={selectedSizes.map(i => i.sizeId).includes(sizeMapping.childId)}
                    quantity={selectedSizes.find(i => i.sizeId === sizeMapping.childId)?.quantity} updateProductQuantities={updateProductQuantities}
                    removeProductQuantity={removeProductQuantity}
                ></ProductQuantity>
            )}
        </ul>
    )
}


export const ProductQuantity = ({ sizeMapping, selected, quantity, updateProductQuantities, removeProductQuantity }) => {

    const [checked, setChecked] = useState(selected)
    const [edit,setEdit]=useState(false)
    const [productQuantity, setProductQuantity] = useState({
        sizeId: sizeMapping.childId,
        quantity: quantity
    })

    function isQuantityValid(value) {
        var numValidator = /^[1-9][0-9]*$/
        return numValidator.test(value)
    }

    const [quantityValid, setQuantityValid] = useState(isQuantityValid(productQuantity.quantity))

    function handleProductQuantity(value) {
        setChecked(prev=>!prev)
        if (!value) {
            removeProductQuantity(sizeMapping.childId)
        }
    }

    function saveProductQuantity() {
        updateProductQuantities({
            sizeId: productQuantity.sizeId, quantity: parseInt(productQuantity.quantity)
        })
        setEdit(false)
    }

    function quantityChangeHandler(value) {
        setProductQuantity(prev => {
            return {
                ...prev, quantity: value
            }
        })
        setQuantityValid(isQuantityValid(value))
    }

    return (
        <li className={"list-group-item " + classes.li}>
            <div className="row align-items-baseline">
                <div className="col-1 p-2">
                    <input type="checkbox"
                        className="form-check-input"
                        value={checked}
                        checked={checked}
                        onChange={(event) => handleProductQuantity(event.target.value)}
                    />
                </div>
                <div className="col-1">
                    {sizeMapping.childName}
                </div>
                {checked &&
                    <>
                        <div className="col-3">
                        <input type="text"
                            className="form-control"
                            disabled={!edit}
                            value={productQuantity.quantity}
                            onChange={(event) => quantityChangeHandler(event.target.value)}
                        />
                        {edit && !quantityValid && 
                            <span className="text-danger">
                                invalid.
                            </span>
                        }
                    </div>
                    {!edit && 
                        <div className="col-1">
                            <i className="fa fa-pencil-square-o fs-5"
                                style={{ cursor: 'pointer' }}
                                aria-hidden="true"
                                onClick={()=>setEdit(true) }
                            ></i>
                        </div>
                    }
                    {
                        edit &&
                        <div className="col-1 fs-4">
                                <button className="fa fa-check border-0 btn-default"
                                    style={{ cursor: 'pointer' }}
                                    aria-hidden="true"
                                    disabled={!quantityValid}
                                    onClick={() => saveProductQuantity()}
                                ></button>
                        </div>
                    }
                    </>
                }
            </div>
        </li>
    )
}
