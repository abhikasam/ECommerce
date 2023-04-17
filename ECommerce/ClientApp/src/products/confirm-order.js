import { Fragment, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import QuantityHandler from "../shared/quantity-handler"
import { useDispatch, useSelector } from "react-redux"
import { productActions } from "../store/product-slice"
import { cartActions, getCartAsync } from "../store/cart-slice"
import { orderActions, placeOrderAsync } from "../store/order-slice"



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

    useEffect(() => {
        setSelectedProducts((prev) => {
            let currentProductIds = prev.map(i => i.productId)
            return products.filter(i => currentProductIds.includes(i.productId))
        })
    }, [products, setSelectedProducts])

    function updateCartQuantity(quantity, productId) {
        dispatch(cartActions.updateCartQuantity({ quantity, productId }))
    }

    function totalQuantity() {
        return selectedProducts.reduce((acc, cum) => acc + cum.cartItem.quantity, 0)
    }

    function totalPrice() {
        return selectedProducts.reduce((acc, cum) => acc + (cum.cartItem.quantity * cum.finalPrice), 0)
    }

    function updateSelected(product) {
        if (selectedProducts.map(i => i.productId).includes(product.productId)) {
            setSelectedProducts(prev => {
                return prev.filter(i => i.productId != product.productId)
            })
        }
        else {
            setSelectedProducts(prev => [...prev, product])
        }
    }

    function placeOrder() {
        let orderItems = selectedProducts.filter(i => i.cartItem.quantity>0).map(i => {
            return {
                productId: i.productId,
                quantity: i.cartItem.quantity
            }
        })

        dispatch(placeOrderAsync(orderItems))

    }

    return (
        <div>
            {status.message.length > 0 &&
                <div className={"row rowpad5px align-items-center "} >
                    <div className="col-8">
                        <div className={status.alertClass + " alert"} style={{ whiteSpace: "pre-wrap" }}>
                            <div className={status.textClass}>{status.message}</div>
                        </div>
                    </div>
                </div>
            }
            <div className="row product-details">
                <div className="col" style={{ maxHeight: '40em', overflowY: 'auto' }}>
                    {products.map(product =>
                        <Fragment key={product.productId}>
                            <OrderItem product={product}

                                updateCartQuantity={(quantity) => updateCartQuantity(quantity, product.productId)}
                                updateSelected={() => updateSelected(product)}
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



const OrderItem = ({ product, updateCartQuantity,updateSelected }) => {

    function updateQuantity(quantity) {
        updateCartQuantity(quantity)
    }

    function getDiscountColor() {
        if (product.discount >= 50)
            return 'green';
        else if (product.discount >= 15 && product.discount < 50)
            return 'blue';
        else return 'red';
    }

    const [selected, setSelected] = useState(false)

    return (
        <div className="row m-2 p-2 border" style={{ background: (selected ? 'gainsboro' : 'white') }}>
            <div className="col-1 p-5">
                <input type="checkbox"
                    className="form-control-check"
                    onChange={() => {
                        setSelected(prev => !prev)
                        updateSelected()
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
            {selected &&
                <>
                    <div className="col-2">
                        <QuantityHandler initialQuantity={product.cartItem.quantity}
                            maxQuantity={product.quantity}
                            updateQuantity={updateQuantity}
                        ></QuantityHandler>
                    </div>
                    <div className="col-2 fw-bold fs-5 pt-5 text-center">
                        ₹{product.cartItem.quantity * product.finalPrice}
                    </div>
                </>
            }

            {!selected &&
                <div className="col-4 pt-5 ms-5 text-danger">
                    Please select the checkbox to consider this item to place order.
                </div>
            }

        </div>
    )
}



