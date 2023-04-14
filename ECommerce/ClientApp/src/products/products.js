import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "./product-card"
import classes from './products.module.css';
import Pagination from "../shared/pagination";
import { getProductsAsync } from "../store/product-slice";
import ProductFilters from "./product-filters";
import { useState } from "react";
import { statusActions } from "../store/status-slice";
import { updateFilters } from "../store/product-actions";
import { getFavouritesAsync } from "../store/favourite-slice";


export default function Products() {

    const dispatch = useDispatch()
    const { products, totalPages, filters: productFilters,status } = useSelector(state => state.product)
    const { pageNumber } = productFilters

    const [filters, setFilters] = useState(productFilters)

    useEffect(() => {
        dispatch(getFavouritesAsync())
    }, [dispatch])

    useEffect(() => {
        const productsData = dispatch(getProductsAsync(filters))
        dispatch(updateFilters(productsData))
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
                    initialFilters={filters}
                    onUpdate={updatePageFilters}
                ></ProductFilters>
            </div>
            <div className="col-10">
                <div className="row">
                    <Pagination pageNumber={pageNumber} totalPages={totalPages} setPage={loadPage} ></Pagination>
                </div>
                {status.isLoading &&
                    <div className={"row rowpad5px align-items-center " + classes.alertbar} >
                        <div className="col-8">
                            <div className={status.alertClass + " alert"} style={{ whiteSpace: "pre-wrap" }}>
                                <div className={status.textClass}>{status.message}</div>
                            </div>
                        </div>
                    </div>
                }
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

