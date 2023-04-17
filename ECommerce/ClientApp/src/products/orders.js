import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrdersAsync } from "../store/order-slice"
import { getProductAsync } from "../store/product-slice"
import { useHistory } from "react-router-dom"



export default function Orders() {

    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.order)
    
    useEffect(() => {
        dispatch(fetchOrdersAsync())
    }, [dispatch])

    function applyFilters(dateFilter) {
        dispatch(fetchOrdersAsync(dateFilter))
    }

    return (
        <>
            <div className="row">
                <div className="col-2">
                    <OrderListFilter applyFilters={applyFilters}></OrderListFilter>
                </div>
                <div className="col-10">
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="col">
                            {orders.map(order =>
                                <DateItem key={order.date} order={order}></DateItem>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const OrderListFilter = ({ applyFilters }) => {

    const [dateFilter, setDateFilter]=useState('30')

    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col-6">
                        <button type="button"
                            className="btn btn-primary"
                            onClick={() => applyFilters(dateFilter)}
                        >Update</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Order with in :</label>
                        <select className="form-control"
                            value={dateFilter}
                            onChange={(event) => setDateFilter(event.target.value)}
                        >
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                            <option value="180">Last 180 days</option>
                            <option value="365">Last 365 days</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const DateItem = ({ order }) => {

    return (
        <div className="row">
            <div className="col">
                <div className="row border m-2 p-2 fs-5 fw-bold fst-italic" style={{ background:'orange',color:'white' }} >
                    {order.date}
                </div>
                <div className="row">
                    <div className="col">
                        {order.orderInstances.map(instance =>
                            <OrderInstanceItem key={instance.instanceId} orderInstance={instance}></OrderInstanceItem>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export const OrderInstanceItem = ({ orderInstance }) => {

    const history=useHistory()
    const { user } = useSelector(state => state.auth)

    function showOrderSummary() {
        history.push('/order-details', {
            products: orderInstance.products
        })
    }

    return (
        <div className="row m-2 p-2 border border-primary">
            <div className="col"
                onClick={showOrderSummary}
            >
                {
                    user.isAdmin && 
                    <div className="row"
                        >
                        <div className="col">
                            {orderInstance.userName}
                        </div>
                    </div>
                }
                {
                    orderInstance.products.map(instanceProduct =>
                        <ProductItem key={instanceProduct.productId} product={instanceProduct}></ProductItem>
                    )
                }
            </div>
        </div>
    )
}


export const ProductItem = ({ product }) => {

    const dispatch = useDispatch()
    const history=useHistory()

    function getProduct() {
        history.push('/product-details', {
            product: product
        })
    }
    
    return (
        <div className="row m-2 p-2 border"
            onClick={getProduct}
        >
            <div className="col">
                <div className="row">
                    <div className="col-1">
                        <img
                            style={{ height: '4em', width:'5em' }}
                            src={"data:image/*;base64," + product.photo}
                            alt={product.description}
                        >
                        </img>
                    </div>
                    <div className="col-5">
                        <div className="row">
                            <div className="col fst-italic fw-bold fs-6">
                                {product.description}
                            </div>
                        </div>
                        <div className="row m-2 p-2" style={{ color: 'lightgray' }}>
                            <div className="col-6">
                                {product.categoryName}
                            </div>
                            <div className="col-6">
                                {product.individualCategoryName}
                            </div>
                        </div>
                    </div>
                    <div className="col-2 fs-6 text-center m-4">
                        {product.brandName}
                    </div>
                    <div className="col-2 text-center m-4">
                        <span className="fw-bold" style={{ color: 'green' }}>
                            ₹{product.finalPrice}
                        </span> <span style={{ color: 'red' }}>({product.quantity})</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


