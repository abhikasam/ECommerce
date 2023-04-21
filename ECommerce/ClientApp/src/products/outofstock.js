import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import ReactDom from 'react-dom';
import ProductCard from "./product-card"
import Pagination from "../shared/pagination"
import { cartActions, getCartAsync } from "../store/cart-slice";
import { useHistory } from "react-router-dom";
import Status from "../shared/status";
import { fetchOutOfStockProductsAsync, outofstockActions, updateQuantitiesAsync } from "../store/outofstock-slice";
import QuantityHandler from "../shared/quantity-handler";


export default function OutOfStock() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { products, pageNumber, totalPages, status } = useSelector(state => state.outofstock)

    const [quantityChanger, setQuantityChanger] = useState({
        show: false,
        product: {}
    })

    useEffect(() => {
        dispatch(fetchOutOfStockProductsAsync())
    }, [dispatch, pageNumber])

    function loadPage(page) {
        dispatch(outofstockActions.updatePageNumber(page))
    }



    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col text-end">
                            <Pagination pageNumber={pageNumber}
                                totalPages={totalPages}
                                setPage={loadPage} ></Pagination>
                        </div>
                    </div>
                    <Status status={status}></Status>
                    <div className="row">
                        {products.length !== 0 &&
                            products.map(product =>
                                <ProductCard
                                    key={product.productId}
                                    product={product}
                                    showQuantityUpdater={true}
                                    qantityUpdateHandler={() => {
                                        setQuantityChanger({
                                            show: true,
                                            product: product
                                        })
                                    }}
                                ></ProductCard>
                            )
                        }

                        {products.length === 0 &&
                            <>
                                <div className="col fs-4 text-warning fw-bold">
                                    No product is out of stock.
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <ProductQuantityIncreaser product={quantityChanger.product}></ProductQuantityIncreaser>
        </>
    )
}


const ProductQuantityIncreaser = ({ product }) => {

    const dispatch = useDispatch()
    const [sizeQuantities, setSizeQuantities] = useState(
        (product && product.productQuantities) ? product.productQuantities.map(i => {
            return {
                productId: product.productId,
                sizeId: i.sizeId,
                quantity: 0
            }
        }) : []
    )

    function updateSizeQuantities(sizeQuantity) {
        setSizeQuantities(prev => {
            let index = sizeQuantities.findIndex(i => i.sizeId === sizeQuantity.sizeId)
            let newSizeQuantities = [...prev]
            if (index !== -1) {
                newSizeQuantities[index].quantity = sizeQuantity.quantity
            }
            else {
                newSizeQuantities.push(sizeQuantity)
            }
            return newSizeQuantities
        })
    }

    function updateSizeQuantitiesToDb() {
        dispatch(updateQuantitiesAsync(sizeQuantities))
    }

    return ReactDom.createPortal(
        <div className="modal" id="quantityChanger" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cart Quantity</h5>
                        <button type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-3" style={{ width: '9em' }}>
                                {product.photo &&
                                    <img src={"data:image/*;base64," + product.photo}
                                        style={{ height: '8em', width: '9em' }}
                                        alt={product.description}>
                                    </img>}
                            </div>

                            <div className="col-7 text-center">
                                <QuantityChanger
                                    product={product}
                                    updateQuantities={updateSizeQuantities}
                                    isOutOfStock={true}
                                >
                                </QuantityChanger>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >Close</button>
                        <button type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={updateSizeQuantitiesToDb}
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}

export const QuantityChanger = ({ product, updateQuantities, isOutOfStock }) => {

    return (
        <>
            {product && product.productQuantities && product.productQuantities.map(productQuantity =>
                <div key={productQuantity.productQuantityId} className="row align-items-center">
                    <div className="col-3">
                        <span>{productQuantity.sizeName}</span>
                    </div>
                    <div className="col-9">
                        <QuantityHandler initialQuantity={0}
                            maxQuantity={isOutOfStock ? 5 : productQuantity.quantity}
                            updateQuantity={(value) => updateQuantities({
                                productId: product.productId,
                                sizeId: productQuantity.sizeId,
                                quantity: value
                            })}
                        ></QuantityHandler>
                    </div>
                </div>
            )}</>
    )
}
