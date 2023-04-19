import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "./product-card"
import classes from './products.module.css';
import Pagination from "../shared/pagination";
import { getProductsAsync, updateFiltersAsync } from "../store/product-slice";
import ProductFilters from "./product-filters";
import { useState } from "react";
import { statusActions } from "../store/status-slice";
import { getFavouritesAsync } from "../store/favourite-slice";
import { getCartAsync } from "../store/cart-slice";
import Status from "../shared/status";


export default function Products() {

    const dispatch = useDispatch()
    const { products, totalPages, filters: productFilters, status } = useSelector(state => state.product)
    const { pageNumber } = productFilters
    const [filters, setFilters] = useState(productFilters)
    const [search, setSearch] = useState(filters.search)

    useEffect(() => {
        dispatch(getFavouritesAsync())
        dispatch(getCartAsync())
    }, [dispatch])

    useEffect(() => {
        const productsData = dispatch(getProductsAsync(filters))
        dispatch(updateFiltersAsync(productsData))
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

    function searchProducts() {
        setFilters(prev => {
            return {
                ...prev,
                search:search
            }
        })
    }

    return (
        <>
            <div className="row">
                <div className="col-2">
                    <ProductFilters
                        initialFilters={filters}
                        onUpdate={updatePageFilters}
                    ></ProductFilters>
                </div>
                <div className="col-10">
                    <div className="row">
                        <div className="col-6">
                            <input type="search"
                                className="form-control"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </div>
                        <div className="col-1">
                            <button type="button"
                                className="btn btn-danger"
                                onClick={searchProducts}
                            >
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                        <Pagination pageNumber={pageNumber} totalPages={totalPages} setPage={loadPage} ></Pagination>
                    </div>
                    <Status status={status}></Status>
                    <div className="row">
                        {
                            products.map(product =>
                                <ProductCard key={product.productId} product={product}></ProductCard>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

