
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';



export default function CartQuantity({ product,updateCart }) {

    useEffect(() => { }, [product])

    const intitialQantity = product.isInCart ? product.cartItem.quantity : 0
    const [quantity, setQuantity] = useState(intitialQantity)

    return ReactDom.createPortal(
        <div className="modal" id={"cartCounter" + product.productId} tabIndex="-1">
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
                            <div className="col-3" style={{ width:'9em' }}>
                                {product.photo &&
                                    <img src={"data:image/*;base64," + product.photo}
                                        style={{ height: '8em', width:'9em' }}
                                        alt={product.description}>
                                    </img>}
                            </div>

                            <div className="col-7 text-center">
                                <div className="m-5 fs-4">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => setQuantity(prev => prev - 1)}
                                        disabled={quantity<=0}
                                    >
                                        <i className="fa fa-minus"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                    <span className="ms-3 me-3" >{quantity}</span>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        disabled={quantity >= product.quantity}
                                    >
                                        <i className="fa fa-plus"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </div>
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
                            onClick={() => {
                                updateCart(quantity)
                            }}
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}



