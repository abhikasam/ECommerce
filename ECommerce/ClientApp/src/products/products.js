import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../store/product-actions"
import ProductCard from "./product-card"
import classes from './products.module.css';
import ProductFilters from "./product-filters";
import Pagination from "../shared/pagination";
import { productActions } from "../store/product-slice";
import { productFilterActions } from "../store/product-filter-slice";


export default function Products() {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)
    const { totalPages, pageNumber } = useSelector(state => state.productFilter)
    const productFilters = useSelector(state => state.productFilter)
    
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch, pageNumber])

    function updatePageFilters() {
        dispatch(getProducts(productFilters))
    }

    function loadPage(page) {
        dispatch(productFilterActions.updatePageNumber(page))
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

