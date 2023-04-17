import { useEffect } from "react"
import { useState } from "react"


export default function QuantityHandler({style,initialQuantity,maxQuantity,updateQuantity }){

    const [quantity, setQuantity] = useState(initialQuantity)

    useEffect(() => {
        setQuantity(quantity)
    }, [initialQuantity, setQuantity])

    useEffect(() => {
        updateQuantity(quantity)
    }, [quantity])

    return (
        <div className="row" style={style}>
            <div className="m-5 fs-4">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setQuantity(prev => prev - 1)}
                    disabled={quantity <= 0}
                >
                    <i className="fa fa-minus"
                        aria-hidden="true"
                    ></i>
                </button>
                <span className="ms-3 me-3" >{quantity}</span>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setQuantity(prev => prev + 1)}
                    disabled={quantity >= maxQuantity}
                >
                    <i className="fa fa-plus"
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
        </div>
    )
}
