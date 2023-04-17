
import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import QuantityHandler from '../shared/quantity-handler';



export default function CartQuantity({ product,updateCart }) {

    useEffect(() => { }, [product])

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
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}



