import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../store/product-actions"
import ProductCard from "./product-card"
import classes from './products.module.css';
import Pagination from "../shared/pagination";
import { productActions } from "../store/product-slice";
import ProductFilters from "./product-filters";
import { updateFavourites } from "../store/favourite-actions";


export default function Products() {

    const dispatch = useDispatch()
    const { products, totalPages, pageNumber } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(updateFavourites())
    }, [dispatch])

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch, pageNumber])

    function updatePageFilters() {
        dispatch(getProducts())
    }

    function loadPage(page) {
        dispatch(productActions.updatePageNumber(page))
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

