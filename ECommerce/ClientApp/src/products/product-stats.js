import { Fragment, useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductAsync } from "../store/product-slice"
import { getUsersAddedFavourites } from "../store/favourite-slice"
import ProductCard from "./product-card"
import { UserCard } from "../users/user-card";
import Pagination from "../shared/pagination"
import { getUsersAddedToCart } from "../store/cart-slice"
import { fetchProductOrdersAsync } from "../store/order-slice"
import { DateItem } from "./orders"

export default function ProductStats(props) {
    const dispatch = useDispatch()

    const state = props.location.state
    const [product] = useState(state?.product)
    const [dateRange, setDateRange] = useState('')
    const { favourites: userFavourites,carts:userCarts,orders } = useSelector(state => state.product.selectedProduct)

    useEffect(() => {
        dispatch(getUsersAddedFavourites({ productId: product.productId }))
        dispatch(getUsersAddedToCart({ productId: product.productId }))
        dispatch(fetchProductOrdersAsync({ dateFilter: dateRange, productId: product.productId }))
    }, [dispatch, product.productId])

    return (
        <>
            <div className="row">
                <div className="col-3">
                    {product && <ProductCard product={product}></ProductCard>}
                </div>
                <div className="col-9">
                    <div className="row">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active"
                                    id="fav-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#fav-tab-pane"
                                    type="button" role="tab"
                                    aria-controls="fav-tab-pane"
                                    aria-selected="true">Favourites</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link"
                                    id="cart-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#cart-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="cart-tab-pane"
                                    aria-selected="false">Cart</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="order-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#order-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="order-tab-pane"
                                    aria-selected="false">Orders</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active"
                                id="fav-tab-pane"
                                role="tabpanel"
                                aria-labelledby="fav-tab"
                                tabIndex="0">
                                <div className="row pt-3">
                                    <Pagination pageNumber={userFavourites.pageNumber}
                                        totalPages={userFavourites.totalPages}
                                        setPage={(page) => dispatch(getUsersAddedFavourites({ productId: product.productId, pageNumber: page }))} >
                                    </Pagination>
                                </div>
                                <div className="row">
                                    {userFavourites && product && userFavourites.result.map(user =>
                                        <div key={user.userId} className="col-2 border border-primary m-2">
                                            <UserCard key={user.userId} user={user}></UserCard>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="tab-pane fade"
                                id="cart-tab-pane"
                                role="tabpanel"
                                aria-labelledby="cart-tab"
                                tabIndex="0">
                                <div className="row pt-3">
                                    <Pagination pageNumber={userCarts.pageNumber}
                                        totalPages={userCarts.totalPages}
                                        setPage={(page) => dispatch(getUsersAddedToCart({ productId: product.productId, pageNumber: page }))} >
                                    </Pagination>
                                </div>
                                <div className="row">
                                    {userCarts && product && userCarts.result.map(user =>
                                        <div key={user.userId} className="col-2 border border-primary m-2">
                                            <UserCard key={user.userId} user={user}></UserCard>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="tab-pane fade"
                                id="order-tab-pane"
                                role="tabpanel"
                                aria-labelledby="order-tab"
                                tabIndex="0">
                                <div className="row mt-4 align-items-center">
                                    <div className="col-2 text-end">
                                        <label className="fw-bold">Range :</label>
                                    </div>
                                    <div className="col-3">
                                        <select className="form-control"
                                            value={dateRange}
                                            onChange={(event) => setDateRange(event.target.value)}
                                        >
                                            <option value="30">Last 30 days</option>
                                            <option value="90">Last 90 days</option>
                                            <option value="180">Last 180 days</option>
                                            <option value="365">Last 365 days</option>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <button type="button"
                                            className="btn btn-primary"
                                            onClick={() => dispatch(fetchProductOrdersAsync({ dateFilter: dateRange, productId: product.productId }))}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    {product && orders && orders.map(order =>
                                        <DateItem key={order.date} order={order}></DateItem>
                                    )}
                                    {(!product || !orders || orders.length === 0) &&
                                        <>
                                            <div className="col p-4 fw-bold fs-4" style={{ color: 'orange' }}>
                                                No product added to cart.
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
