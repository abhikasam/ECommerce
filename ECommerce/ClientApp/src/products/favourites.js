
import { useDispatch, useSelector } from "react-redux"
import { updateFavourites } from "../store/favourite-actions"
import { useEffect } from "react"
import ProductCard from "./product-card"
import Pagination from "../shared/pagination"
import { favouriteActions } from "../store/favourite-slice"


export default function Favourites() {

    const dispatch = useDispatch()
    const { products, pageNumber, totalPages } = useSelector(state => state.favourite)

    useEffect(() => {
        dispatch(updateFavourites())
    }, [dispatch, pageNumber])

    function loadPage(page) {
        dispatch(favouriteActions.updatePageNumber(page))
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <Pagination pageNumber={pageNumber}
                            totalPages={totalPages}
                            setPage={loadPage} ></Pagination>
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
        </>
    )
}


