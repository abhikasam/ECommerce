import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchUserDetailsAsync } from "../store/auth-slice"
import { UserCard } from "./user-card"
import ProductCard from "../products/product-card"
import { DateItem } from "../products/orders"



export default function UserDetails(props) {

    const history = useHistory()
    const dispatch = useDispatch()

    const state = props.location.state
    const [userId] = useState(state?.userId)
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log(userId)
        const response = dispatch(fetchUserDetailsAsync(userId))
        response.then(result => {
            setUser(result.payload.data)
        })
    }, [userId, dispatch])


    return (
        <div className="row">
            <div className="col text-center">
                <div className="row">
                    <UserCard user={user}></UserCard>
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
                        <div className="row">
                            {user && user.favourites && user.favourites.map(product =>
                                <ProductCard key={product.productId} product={product}>
                                </ProductCard>
                            )}
                            {(!user || !user.favourites || user.favourites.length===0) &&
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
                        {user && user.carts && user.carts.map(product =>
                            <ProductCard key={product.productId} product={product}>
                            </ProductCard>
                        )}
                        {(!user || !user.carts || user.carts.length===0) &&
                            <>
                                <div className="col p-4 fw-bold fs-4" style={{ color: 'orange' }}>
                                    No product added to cart.
                                </div>
                            </>
                        }
                    </div>
                    <div className="tab-pane fade"
                        id="order-tab-pane"
                        role="tabpanel"
                        aria-labelledby="order-tab"
                        tabIndex="0">
                        {user && user.orders && user.orders.map(order =>
                            <DateItem key={order.date} order={order}></DateItem>
                        )}
                        {(!user || !user.orders || user.orders.length === 0) &&
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
    )
}
