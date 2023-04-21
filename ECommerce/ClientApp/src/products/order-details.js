import { Fragment, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import QuantityHandler from "../shared/quantity-handler"
import { useDispatch, useSelector } from "react-redux"
import { productActions } from "../store/product-slice"
import { cartActions, getCartAsync } from "../store/cart-slice"
import { orderActions, placeOrderAsync } from "../store/order-slice"



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
        <div>
            <div className="row product-details">
                <div className="col" style={{ maxHeight: '40em', overflowY: 'auto' }}>
                    {products.map(product =>
                        <Fragment key={product.productId+"_" + product.sizeName}>
                            <OrderItem product={product}
                            />
                        </Fragment>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="row total-details p-2 border">
                        <div className="col-6 text-center fw-bold fs-6">Total</div>
                        <div className="col-2 text-center fw-bold fs-4">
                            {totalQuantity()}
                        </div>
                        <div className="col-1 text-end fw-bold fs-4">
                            ₹{totalPrice()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderItem = ({ product }) => {

    function getDiscountColor() {
        if (product.discount >= 50)
            return 'green';
        else if (product.discount >= 15 && product.discount < 50)
            return 'blue';
        else return 'red';
    }

    return (
        <div className={"row m-2 p-2 border "}>
            <div className="col-1 p-5">
            </div>
            <div className="col-2">
                <img
                    src={"data:image/*;base64," + product.photo}
                    alt={product.description}
                    style={{ height: '8em', width: '10em' }}
                >
                </img>
            </div>
            <div className="col-3">
                <div className="row fw-bold fs-6 fst-italic">
                    {product.description}
                </div>
                <div className="row mt-2 font-monospace" style={{ color: '#fd7e14' }}>
                    {product.brandName}
                </div>
                <div className="row mt-2" style={{ fontSize: 'smaller' }} >
                    <div className="col-6">
                        {product.categoryName}
                    </div>
                    <div className="col-6">
                        {product.individualCategoryName}
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        ₹{product.originalPrice}
                    </div>
                    <div className="col-2 text-center" style={{ color: getDiscountColor() }} >
                        {product.discount}%
                    </div>
                    <div className="col-2 fw-bold text-center">
                        ₹{product.finalPrice}
                    </div>
                </div>
            </div>
            <div className="col-2">
                <div className="mt-5 fw-bold fs-5 text-center">
                    {product.quantity} ( {product.sizeName} ) 
                </div>
            </div>
            <div className="col-2 fw-bold fs-5 pt-5 text-center">
                ₹{product.quantity * product.finalPrice}
            </div>
        </div>
    )
}

