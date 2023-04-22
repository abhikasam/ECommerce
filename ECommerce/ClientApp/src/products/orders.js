import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrdersAsync } from "../store/order-slice"
import { getProductAsync } from "../store/product-slice"
import { useHistory } from "react-router-dom"
import { fetchUsersAsync } from "../store/auth-slice"
import ListSelect from "../shared/list-select"



export default function Orders() {

    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.order)
    const [users,setUsers]=useState([])

    useEffect(() => {
        dispatch(fetchOrdersAsync({ dateFilter: null, selectedUsers:[] }))        
    }, [dispatch])

    useEffect(() => {
        const response = dispatch(fetchUsersAsync())
        response.then((result) => {
            let userResults = result.payload.data
            setUsers(userResults.map(user => {
                return {
                    key:user.userId,value : user.fullName +"   " +user.email +" "
                }
            }))
        })

    }, [dispatch])


    function applyFilters(dateFilter, selectedUsers) {
        dispatch(fetchOrdersAsync({ dateFilter, selectedUsers }))
    }

    return (
        <>
            <div className="row">
                <div className="col-2">
                    <OrderListFilter applyFilters={applyFilters} users={users}></OrderListFilter>
                </div>
                <div className="col-10">
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="col">
                            {orders.length!==0 &&
                                orders.map(order =>
                                <DateItem key={order.date} order={order}></DateItem>
                            )}

                            {orders.length === 0 &&
                                <>
                                    <div className="col pt-5 mt-4 fs-4 text-warning fw-bold">
                                        Orders are empty.
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const OrderListFilter = ({ applyFilters,users }) => {

    const { user }=useSelector(state=>state.auth)

    const [dateFilter, setDateFilter]=useState('30')
    const [selectedUsers,setSelectedUsers]=useState([])

    useEffect(() => {
        console.log(selectedUsers)
    }, [selectedUsers])

    function updateSelected(value) {
        if (selectedUsers.includes(value)) {
            setSelectedUsers(prev => prev.filter(i => i!== value))
        }
        else {
            setSelectedUsers(prev=> [...prev,value])
        }
    }

    return (
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col-6">
                        <button type="button"
                            className="btn btn-primary"
                            onClick={() => applyFilters(dateFilter, selectedUsers)}
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
                {user.isAdmin && 
                    <div className="row">
                        <div className="col">
                            <label>Users :</label>
                            <ListSelect
                                showSearch={true}
                                items={users}
                                type="user"
                                selected={[]}
                                updateItems={updateSelected}
                            />
                        </div>
                    </div>
                }
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
                        <ProductItem key={orderInstance.instanceId + instanceProduct.productId + instanceProduct.sizeName} product={instanceProduct}></ProductItem>
                    )
                }
            </div>
        </div>
    )
}


export const ProductItem = ({ product }) => {

    const dispatch = useDispatch()
    const history=useHistory()
    
    return (
        <div className="row m-2 p-2 border"
        >
            <div className="col">
                <div className="row">
                    <div className="col-1" style={{ alignSelf:'center' }}>
                        {product.photo && 
                            <img
                                style={{ height: '4em', width: '5em' }}
                                src={"data:image/*;base64," + product.photo}
                                alt={product.description}
                            >
                            </img>
                        }
                        {
                            !product.photo && 
                            <div className="text-center">
                                <i className="fa fa-picture-o" style={{ color: 'silver', fontSize: '3em' }} aria-hidden="true"></i>
                            </div>
                        }

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
                        </span> <span style={{ color: 'red' }}>( {product.sizeName} - {product.quantity})</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


