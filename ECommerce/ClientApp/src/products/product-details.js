import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import classes from './product-details.module.css'
import NoPhoto from '../images/no-image.png';
import { useEffect } from "react";


export default function ProductDetails(props) {

    const history = useHistory()
    const dispatch=useDispatch()

    const state = props.location.state
    const [product] = useState(state?.product)

    if (!product) {
        history.push('/notfound')
    }

    const { isAuthenticated, user } = useSelector(state => state.auth)

    function getDiscountColor() {
        if (product.discount >= 50)
            return 'green';
        else if (product.discount >= 15 && product.discount < 50)
            return 'blue';
        else return 'red';
    }

    function openEditPage() {
        history.push('/product-edit', {
            product: product
        })
    }

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <img src={"data:image/png;base64," + product.photo} alt={product.description} className={classes.photo}></img>
                </div>
                <div className="col-9">

                    {
                        isAuthenticated && user.isAdmin && 
                        <div className="row">
                            <div className="col-3">
                                <button type="button" className="btn btn-primary" onClick={openEditPage}>Edit</button>
                            </div>
                        </div>
                    }

                    <div className={"row " + classes.row}>
                        <div className={"col " + classes.description}>
                            {product.description}
                        </div>
                    </div>
                    <div className={"row "+classes.row}>
                        <div className="col-2">
                            <label className={classes.label}>Brand</label>
                        </div>
                        <div className={"col-4 " + classes.detail}>
                            {product.brandName}
                        </div>
                    </div>
                    <div className={"row "+classes.row}>
                        <div className="col-2">
                            <label className={classes.label} >Category</label>
                        </div>
                        <div className={"col-4 " + classes.detail}>
                            {product.categoryName}
                        </div>
                        <div className="col-2">
                            <label className={classes.label} >Individual Category</label>
                        </div>
                        <div className={"col-4 " + classes.detail}>
                            {product.individualCategoryName}
                        </div>
                    </div>
                    <div className={"row align-items-center "+classes.row}>
                        <div className="col-2">
                            <label className={classes.label} > Original Price</label>
                        </div>
                        <div className={"col-1 " + classes.originalPrice}>
                            ₹{product.originalPrice}
                        </div>
                        <div className={"col-1 " + classes.discount} style={{ color: getDiscountColor() }} >
                            -{product.discount}%
                        </div>
                        <div className="col-1">
                            <label className={classes.label} > Final Price</label>
                        </div>
                        <div className={"col-2 " + classes.finalPrice}>
                            ₹{product.finalPrice}
                        </div>
                    </div>
                    <div className={"row "+classes.row}>
                        <div className="col-2">
                            <label className={classes.label}>Size Options</label>
                        </div>
                        <div className="col-4">
                            <ul className="list-group">
                                {product.productQuantities.map(mapping =>
                                    <li className={"list-group-item "+classes.listGroupItem } key={mapping.sizeId}>
                                        <div className="row">
                                            <div className="col-1 text-end">
                                                {mapping.sizeName}
                                            </div>
                                            <div className="col-2 text-center">
                                                {mapping.quantity}
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={"row "+classes.row}>
                        <div className="col-2">
                            <label className={classes.label}>Rating</label>
                        </div>
                        <div className="col-4">
                            {product.rating} ({product.reviews})
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


