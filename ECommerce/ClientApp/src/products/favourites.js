
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ProductCard from "./product-card"
import Pagination from "../shared/pagination"
import { favouriteActions, getFavouritesAsync } from "../store/favourite-slice"
import Status from "../shared/status"


export default function Favourites() {

    const dispatch = useDispatch()
    const { products, pageNumber, totalPages, status } = useSelector(state => state.favourite)

    useEffect(() => {
        dispatch(getFavouritesAsync())
    }, [dispatch, pageNumber])

    function loadPage(page) {
        dispatch(favouriteActions.updatePageNumber(page))
    }

    return (
        <>
            <div className="row">
                <Pagination pageNumber={pageNumber}
                    totalPages={totalPages}
                    setPage={loadPage} ></Pagination>
            </div>
            <Status status={status}></Status>
            <div className="row">
                {
                    products.map(product =>
                        <ProductCard key={product.productId} product={product}></ProductCard>
                    )
                }
            </div>

        </>
    )
}


