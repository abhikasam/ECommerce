import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../store/product-actions"
import ProductCard from "./product-card"
import classes from './products.module.css';
import ProductFilters from "./product-filters";


export default function Products() {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)
    const productFilters = useSelector(state => state.productFilter)
    
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    function updatePageFilters() {
        dispatch(getProducts(productFilters))
    }
    
    return (
        <div className="row">
            <div className="col-2">
                <ProductFilters
                    onUpdate={updatePageFilters}
                ></ProductFilters>
            </div>
            <div className="col-10">
                <div className="row">
                    {
                        products.map(product =>
                            <ProductCard key={product.productId} product={product}></ProductCard>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

