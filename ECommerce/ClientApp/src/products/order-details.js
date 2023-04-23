import { Fragment, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import QuantityHandler from "../shared/quantity-handler"
import { useDispatch, useSelector } from "react-redux"
import { productActions } from "../store/product-slice"
import { cartActions, getCartAsync } from "../store/cart-slice"
import { orderActions, placeOrderAsync } from "../store/order-slice"
import ProductCard from "./product-card"



export default function OrderDetails(props) {

    const history = useHistory()
    const dispatch = useDispatch()

    const state = props.location.state
    const [products] = useState(state?.products)

    if (!products) {
        history.push('/notfound')
    }

    useEffect(() => {
        dispatch(orderActions.clearStatus())
    })

    function totalQuantity() {
        return products.reduce((acc, cum) => acc + cum.quantity, 0)
    }

    function totalPrice() {
        return products.reduce((acc, cum) => acc + (cum.quantity * cum.finalPrice), 0)
    }


    return (
        <div className="">
            <div className="row fs-3 fw-bold text-success">
                <div className="col-3">
                    Total Quantity : {totalQuantity()}
                </div>
                <div className="col-4 text-end">
                    Total Price :
                </div>
                <div className="col-2">
                    <i className="fa fa-inr fs-4" aria-hidden="true"></i>
                    {totalPrice()}
                </div>
            </div>
            <div className="row product-details">
                {products.map(product =>
                    <ProductCard key={product.productId + "_" + product.sizeName}
                        product={product}
                        showOrderedQuantity={true}
                    >
                    </ProductCard>
                )}
            </div>
        </div>
    )
}

