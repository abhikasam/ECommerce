import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import ProductCard from "./product-card"
import Pagination from "../shared/pagination"
import { cartActions, getCartAsync } from "../store/cart-slice";
import { useHistory } from "react-router-dom";
import Status from "../data/status";


export default function Cart() {

    const dispatch = useDispatch()
    const history=useHistory()
    const { products,status } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartAsync({ }))
    }, [dispatch])

    function navigateOrderPage() {
        history.push('/confirm-order')      
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        {products.result.length!==0 && 
                            <div className="col-2">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={navigateOrderPage}
                                >Go To Order Page
                                </button>
                            </div>
                        }
                        <div className="col text-end">
                            <Pagination pageNumber={products.pageNumber}
                                totalPages={products.totalPages}
                                setPage={(page) => dispatch(getCartAsync(page))} ></Pagination>
                        </div>
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
                                    Cart is empty.
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
     )
}

