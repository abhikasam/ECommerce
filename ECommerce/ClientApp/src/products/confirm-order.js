import { Fragment, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import QuantityHandler from "../shared/quantity-handler"
import { useDispatch, useSelector } from "react-redux"
import { productActions } from "../store/product-slice"
import { cartActions, getCartAsync } from "../store/cart-slice"
import { orderActions, placeOrderAsync } from "../store/order-slice"
import Status from "../shared/status"
import { QuantityChanger } from "./outofstock"



export default function ConfirmOrder(props) {

    const dispatch = useDispatch()
    const history = useHistory()

    const { products } = useSelector(state => state.cart)
    const { status } = useSelector(state => state.order)

    const [selectedProducts, setSelectedProducts] = useState([])

    useEffect(() => {
        dispatch(orderActions.clearStatus())
    })

    useEffect(() => {
        dispatch(getCartAsync())
    }, [dispatch])

    function totalQuantity() {
        return selectedProducts.reduce((acc, cum) => acc + cum.quantity, 0)
    }

    function totalPrice() {
        return selectedProducts.reduce((acc, cum) => acc + (cum.quantity * cum.finalPrice), 0)
    }

    function updateSelected(orderItem) {
        let sizeQuantities = orderItem.sizeQuantities.map(i => {
            return {
                sizeId: i.sizeId,
                quantity: i.quantity,
                productId: orderItem.productId,
                finalPrice: orderItem.finalPrice
            }
        })
        if (orderItem.selected) {
            setSelectedProducts(prev => {
                let remainingProducts = prev.filter(i => i.productId !== orderItem.productId)
                return [...remainingProducts, ...sizeQuantities]
            })
        }
        else {
            setSelectedProducts(prev => prev.filter(i => i.productId !== orderItem.productId))
        }
    }

    function placeOrder() {
        let orderItems = selectedProducts.filter(i => i.quantity > 0)
        const response = dispatch(placeOrderAsync(orderItems))
        response.then(result => {
            setSelectedProducts([])
        })
    }

    return (
        <div>
            <Status status={status}></Status>
            <div className="row product-details">
                <div className="col" style={{ maxHeight: '40em', overflowY: 'auto' }}>
                    {products.map(product =>
                        <Fragment key={product.productId}>
                            <OrderItem product={product} key={product.productId}
                                updateSelected={updateSelected}
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
                        <div className="col-3 text-center">
                            <button
                                type="button"
                                className="btn btn-danger"
                                disabled={totalQuantity() === 0}
                                onClick={placeOrder}
                            >Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const OrderItem = ({ product, updateSelected }) => {


    function getDiscountColor() {
        if (product.discount >= 50)
            return 'green';
        else if (product.discount >= 15 && product.discount < 50)
            return 'blue';
        else return 'red';
    }

    const [orderItem, setOrderItem] = useState({
        selected: false,
        productId: product.productId,
        sizeQuantities: product.productQuantities.map(i => {
            return {
                sizeId: i.sizeId, quantity: 0
            }
        }),
        finalPrice: product.finalPrice
    })


    function getFinalPrice() {
        return orderItem.sizeQuantities.reduce((acc, cum) => acc + cum.quantity, 0) * product.finalPrice
    }

    useEffect(() => {
        updateSelected(orderItem)
    }, [orderItem])

    function updateQuantity(sizeQuantity) {
        setOrderItem(prev => {
            let index = prev.sizeQuantities.findIndex(i => i.sizeId === sizeQuantity.sizeId)
            let sizeQuantities = prev.sizeQuantities;
            sizeQuantities[index].quantity = sizeQuantity.quantity
            return {
                ...prev,
                sizeQuantities
            }
        })
    }

    return (
        <div className="row m-2 p-2 border" style={{ background: (orderItem.selected ? 'gainsboro' : 'white') }}>
            <div className="col-1 p-5">
                <input type="checkbox"
                    className="form-control-check"
                    onChange={() => {
                        setOrderItem(prev => {
                            return { ...prev, selected: !prev.selected }
                        })
                    }}
                />
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
            {orderItem.selected &&
                <>
                    <div className="col-2">
                        <div className="row">
                            <div className="col">
                                <QuantityChanger
                                    product={product}
                                    updateQuantities={updateQuantity}
                                    isOutOfStock={false}
                                >
                                </QuantityChanger>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 fw-bold fs-5 pt-5 text-center">
                        ₹{getFinalPrice()}
                    </div>
                </>
            }

            {!orderItem.selected &&
                <div className="col-4 pt-5 ms-5 text-danger">
                    Please select the checkbox to consider this item to place order.
                </div>
            }

        </div>
    )
}


export const ProductQuantityUpdater = ({ productQuantity, updateQuantity }) => {


    return (
        <div className="row align-items-center">
            <div className="col-3">
                <span>{productQuantity.sizeName}</span>
            </div>
            <div className="col-9">
                <QuantityHandler initialQuantity={0}
                    maxQuantity={productQuantity.quantity}
                    updateQuantity={updateQuantity}
                ></QuantityHandler>
            </div>
        </div>
    )
}


