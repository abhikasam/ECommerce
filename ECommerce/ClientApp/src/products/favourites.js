
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ProductCard from "./product-card"
import Pagination from "../shared/pagination"
import { favouriteActions, getFavouritesAsync } from "../store/favourite-slice"


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
                <div className="col">
                    <div className="row">
                        <Pagination pageNumber={pageNumber}
                            totalPages={totalPages}
                            setPage={loadPage} ></Pagination>
                    </div>
                    {status.isLoading &&
                        <div className={"row rowpad5px align-items-center "} >
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
        </>
    )
}


