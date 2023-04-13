import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../store/product-actions"
import ProductCard from "./product-card"
import classes from './products.module.css';
import Pagination from "../shared/pagination";
import { productActions } from "../store/product-slice";
import ProductFilters from "./product-filters";
import { updateFavourites } from "../store/favourite-actions";
import { useState } from "react";


export default function Products() {

    const dispatch = useDispatch()
    const { products, totalPages, filters: productFilters } = useSelector(state => state.product)
    const { pageNumber } = productFilters

    const [filters, setFilters] = useState({})

    useEffect(() => {
        dispatch(updateFavourites())
    }, [dispatch])

    useEffect(() => {
        dispatch(getProducts(filters))
    }, [dispatch, filters])

    function updatePageFilters(filters) {
        setFilters(filters)
    }

    function loadPage(page) {
        setFilters(prev => {
            return {
                ...prev,
                pageNumber: page
            }
        })        
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
                    <Pagination pageNumber={pageNumber} totalPages={totalPages} setPage={loadPage} ></Pagination>
                </div>
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

