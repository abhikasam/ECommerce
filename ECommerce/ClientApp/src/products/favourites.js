
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ProductCard from "./product-card"
import Pagination from "../shared/pagination"
import { favouriteActions, getFavouritesAsync } from "../store/favourite-slice"
import Status from "../data/status"


export default function Favourites() {

    const dispatch = useDispatch()
    const { products, status } = useSelector(state => state.favourite)
    const { pageNumber } = products;

    useEffect(() => {
        dispatch(getFavouritesAsync())
    }, [dispatch])

    return (
        <>
            <div className="row">
                <Pagination pageNumber={pageNumber}
                    totalPages={products.totalPages}
                    setPage={(page) => dispatch(getFavouritesAsync(page))}
                ></Pagination>
            </div>
            <Status status={status}></Status>
            <div className="row">
                {products.result.length !== 0 &&
                    products.result.map(product =>
                        <ProductCard key={product.productId} product={product}></ProductCard>
                    )
                }

                {products.result.length === 0 &&
                    <>
                    <div className="col fs-4 text-warning fw-bold">
                        Favourites are empty.
                    </div>
                    </>
                }
            </div>
        </>
    )
}


