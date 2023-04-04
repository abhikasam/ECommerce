import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../store/product-actions"

export default function Products() {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            {
                products.map(product =>
                    <div key={product.productId}>{product.productId} {product.brandName}</div>
                )
            }
        </>
    )
}

