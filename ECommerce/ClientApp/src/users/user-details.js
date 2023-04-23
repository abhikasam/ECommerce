import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchUserCartDetailsAsync, fetchUserDetailsAsync, fetchUserFavouritesDetailsAsync, fetchUserOrderDetailsAsync } from "../store/user-slice"
import { UserCard } from "./user-card"
import ProductCard from "../products/product-card"
import { DateItem } from "../products/orders"
import Pagination from "../shared/pagination"
import DateFilter from "../shared/date-filter"



export default function UserDetails(props) {

    const history = useHistory()
    const dispatch = useDispatch()

    const state = props.location.state
    const [user] = useState(state?.user)

    const { favourites, cart,orders } = useSelector(state => state.user.selectedUser)
    const [dateRange,setDateRange]=useState('')

    useEffect(() => {
        dispatch(fetchUserFavouritesDetailsAsync({ userId: user.userId }))
        dispatch(fetchUserCartDetailsAsync({ userId: user.userId }))
        dispatch(fetchUserOrderDetailsAsync({ userId: user.userId, dateFilter: dateRange }))
    }, [user.userId, dispatch])
    
    return (
        <div className="row">
            <div className="col-2">
                <div className="row">
                    <div className="col text-center border border-primary m-2">
                        <UserCard user={user}></UserCard>
                    </div>
                </div>
            </div>
            <div className="col-10">
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
                        <div className="row pt-4">
                            <Pagination pageNumber={favourites.pageNumber}
                                totalPages={favourites.totalPages}
                                setPage={(page) => dispatch(fetchUserFavouritesDetailsAsync({ userId: user.userId, pageNumber: page }))} >
                            </Pagination>
                        </div>
                        <div className="row">
                            {user && favourites && favourites.result.map(product =>
                                <ProductCard key={product.productId} product={product}>
                                </ProductCard>
                            )}
                            {(!user || !favourites || favourites.result.length === 0) &&
                                <>
                                    <div className="col p-4 fw-bold fs-4" style={{ color: 'orange' }}>
                                        No product added to favourites.
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="tab-pane fade"
                        id="cart-tab-pane"
                        role="tabpanel"
                        aria-labelledby="cart-tab"
                        tabIndex="0">
                        <div className="row pt-4">
                            <Pagination pageNumber={cart.pageNumber}
                                totalPages={cart.totalPages}
                                setPage={(page) => dispatch(fetchUserCartDetailsAsync({ userId: user.userId, pageNumber: page }))} >
                            </Pagination>
                        </div>
                        <div className="row">
                            {user && cart && cart.result.map(product =>
                                <ProductCard key={product.productId} product={product}>
                                </ProductCard>
                            )}
                            {(!user || !cart || cart.result.length === 0) &&
                                <>
                                    <div className="col p-4 fw-bold fs-4" style={{ color: 'orange' }}>
                                        No product added to cart.
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="tab-pane fade"
                        id="order-tab-pane"
                        role="tabpanel"
                        aria-labelledby="order-tab"
                        tabIndex="0">
                        <div className="row">
                            <div className="col-10">
                                <DateFilter updateDateRange={setDateRange}></DateFilter>
                            </div>
                            <div className="col-2 text-start align-self-center">
                                <button type="button"
                                    className="btn btn-primary"
                                    onClick={() => dispatch(fetchUserOrderDetailsAsync({ userId: user.userId, dateFilter: dateRange }))}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            {user && orders && orders.datedOrderItems.map(order =>
                                <DateItem key={order.date} order={order}></DateItem>
                            )}
                            {(!user || !orders || orders.datedOrderItems.length === 0) &&
                                <>
                                    <div className="col p-4 fw-bold fs-4" style={{ color: 'orange' }}>
                                        No product found.
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
