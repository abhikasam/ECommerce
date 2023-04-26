import { useDispatch, useSelector } from 'react-redux';
import classes from './product-card.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { updateProductCartAsync } from '../store/cart-slice';
import CartQuantity from './cart-quantity';
import { addFavouriteAsync, removeFavouriteAsync } from '../store/favourite-slice';
import { productActions } from '../store/product-slice';


export default function ProductCard({ product, qantityUpdateHandler, showOrderedQuantity = false }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => state.auth)

    function getDiscountColor() {
        if (product.discount >= 50)
            return 'green';
        else if (product.discount >= 15 && product.discount < 50)
            return 'orange';
        else return 'red';
    }

    function getQuantityColor() {
        if (product.quantity >= 10)
            return 'green';
        else if (product.quantity >= 5 && product.quantity < 10)
            return 'orange';
        else return 'red';
    }

    const openProductDetails = () => {
        history.push('/product-details', {
            product: product
        })
    }

    const openProductStats = () => {
        history.push('/product-stats', {
            product: product
        })
    }

    function addProductToCart() {
        const response = dispatch(updateProductCartAsync(product.productId))
        response.then(result => {
            if (result.payload.statusCode === 1) {
                dispatch(productActions.addCart(product.productId))
            }
        })
    }

    function removeProductFromCart() {
        const response = dispatch(updateProductCartAsync(product.productId))
        response.then(result => {
            if (result.payload.statusCode === 1) {
                dispatch(productActions.removeCart(product.productId))
            }
        })
    }


    function addProductToFavourites() {
        const response = dispatch(addFavouriteAsync(product.productId))
        response.then(result => {
            if (result.payload.statusCode === 1) {
                dispatch(productActions.addFavourite(product.productId))
            }
        })
    }

    function removeProductFromFavourites() {
        const response = dispatch(removeFavouriteAsync(product.productId))
        response.then(result => {
            if (result.payload.statusCode === 1) {
                dispatch(productActions.removeFavourite(product.productId))
            }
        })
    }

    return (
        <div className={"col " + classes.card}>
            <div
                onClick={openProductDetails} style={{ cursor: 'pointer' }}>
                {product.photo &&
                    <img src={"data:image/*;base64," + product.photo} alt={product.description} className={classes.photo}>
                    </img>}
                {!product.photo &&
                    <>
                        <div className="text-center" style={{ padding: '3em' }}>
                            <i className="fa fa-picture-o" style={{ color: 'silver', fontSize: '7em' }} aria-hidden="true"></i>
                        </div>
                    </>
                }
                <div className={classes.details}>
                    <div className={"row " + classes.price} >
                        <div className={"col-4 " + classes.originalPrice}>
                            ₹{product.originalPrice}
                        </div>
                        <div className={"col-1 " + classes.discount} style={{ color: getDiscountColor() }} >
                            {product.discount}%
                        </div>
                        <div className={"col " + classes.finalPrice}>
                            ₹{product.finalPrice}
                        </div>
                    </div>
                    <div className={classes.description}>
                        {product.description}
                    </div>
                    <div className={classes.brand}>
                        {product.brandName}
                    </div>
                    <div className="row">
                        <div className={"col-6 " + classes.category}>
                            {product.categoryName}
                        </div>
                        <div className={"col-6 " + classes.individualCategory}>
                            {product.individualCategoryName}
                        </div>
                    </div>
                </div>
            </div>
            {
                showOrderedQuantity &&
                <div className="row">
                    <div className="col-6 text-center fw-bold text-danger align-self-center">
                        <span className="">
                            {product.sizeName}
                        </span>
                        <span className="m-1">
                            ( {product.quantity} )
                        </span>
                    </div>
                    <div className="col-6 text-center text-success align-self-center">
                        <i className="fa fa-inr fs-4" aria-hidden="true"></i>
                        <span className="ms-1 fs-3 fw-bold">{product.quantity * product.finalPrice}</span>
                    </div>
                </div>
            }
            {
                !showOrderedQuantity &&
                <div className={"row align-items-center " + classes.icons}>
                    {
                        !user.isAdmin &&
                        <>
                            <div className="col-6 text-center">
                                {product.isInCart &&
                                    <span className="p1 fa-stack fa-1x">
                                        <i className="p2 fa fa-circle fa-stack-2x"></i>
                                        <i className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse" style={{ cursor: 'pointer' }}
                                            onClick={removeProductFromCart}
                                        ></i>
                                    </span>
                                }

                                {!product.isInCart &&
                                    <i className={"fa fa-shopping-cart " + classes.icon}
                                        style={{ color: 'gray' }}
                                        onClick={addProductToCart}
                                        aria-hidden="true"></i>
                                }
                            </div>

                            <div className="col-6 text-center">
                                {!product.isFavourite &&
                                    <i className={"fa fa-heart-o " + classes.icon}
                                        onClick={addProductToFavourites}
                                        aria-hidden="true"></i>
                                }
                                {product.isFavourite &&
                                    <i className={"fa fa-heart " + classes.icon}
                                        style={{ color: 'red' }}
                                        onClick={removeProductFromFavourites}
                                        aria-hidden="true"></i>
                                }
                            </div>
                        </>

                    }

                    {
                        user.isAdmin &&
                        <>
                            <div className="col-6 text-center" style={{ paddingTop: '0.5rem' }}>
                                <i className={"fa fa-bar-chart " + classes.icon}
                                    onClick={openProductStats}
                                    aria-hidden="true"></i>
                            </div>
                            <div className="col-6 text-center">
                                {product.quantity === 0 &&
                                    <i className={"fa fa-plus-square-o " + classes.icon}
                                        onClick={qantityUpdateHandler}
                                        style={{ cursor: 'pointer' }}
                                        data-bs-toggle="modal" data-bs-target="#quantityChanger"
                                        aria-hidden="true"></i>
                                }
                                {
                                    product.quantity !== 0 &&
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div className="border border-5 fw-bold align-items-center justify-content-center" style={{
                                                background: getQuantityColor(),
                                                padding: '1rem',
                                                color: 'white',
                                                borderRadius: '50%',
                                                fontSize: '1rem',
                                                display: 'flex',
                                                width: '2em',
                                                height: '2em'
                                            }}>
                                                {product.quantity}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    )
}
