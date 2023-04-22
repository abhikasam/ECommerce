﻿
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ProductCard from "./product-card"
import Pagination from "../shared/pagination"
import { favouriteActions, getFavouritesAsync } from "../store/favourite-slice"
import Status from "../data/status"


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
                {products.length!==0 &&
                    products.map(product =>
                        <ProductCard key={product.productId} product={product}></ProductCard>
                    )
                }

                {products.length===0 &&
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


