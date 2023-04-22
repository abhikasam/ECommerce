import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getProductAsync } from "../store/product-slice"
import { getUsersAddedFavourites } from "../store/favourite-slice"
import ProductCard from "./product-card"
import { UserCard } from "../users/user-card"


export default function ProductFavourites(props) {

    const dispatch = useDispatch()

    const state = props.location.state
    const [productId] = useState(state?.productId)
    const [users, setUsers] = useState([])
    const [product, setProduct] = useState()

    useEffect(() => {
        const response = dispatch(getUsersAddedFavourites(productId))
        response.then(result => {
            console.log(result)
            setUsers(result.payload.data.userDetails)
            setProduct(result.payload.data.product)
        })
    }, [dispatch, productId])

    return (
        <>
            <div className="row">
                <div className="col-3">
                    {product && <ProductCard product={product}></ProductCard>}
                </div>
                <div className="col-9">
                    <div className="row">
                        {users && product && users.map(user =>
                            <UserCard key={user.userId} user={user}></UserCard>
                        )}
                    </div>
            </div>
        </div>
        </>
    )
}
