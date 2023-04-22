import { useDispatch, useSelector } from 'react-redux';
import classes from './product-card.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { updateProductCartAsync } from '../store/cart-slice';
import CartQuantity from './cart-quantity';
import { addFavouriteAsync, removeFavouriteAsync } from '../store/favourite-slice';


export default function ProductCard({ product, qantityUpdateHandler,showQuantityUpdater }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => state.auth)
    const { products: favourites } = useSelector(state => state.favourite)
    const { products: cartProducts } = useSelector(state => state.cart)
    const [isFavourite, setIsFavourite] = useState(product.isFavourite)
    const [isInCart, setIsInCart] = useState(product.isInCart)

    function getDiscountColor() {
        if (product.discount >= 50)
            return 'green';
        else if (product.discount >= 15 && product.discount < 50)
            return 'blue';
        else return 'red';
    }

    const openProductDetails = () => {
        history.push('/product-details', {
            product: product
        })
    }

    const openProductFavouriteDetails = () => {
        history.push('/product-favourites', {
            productId: product.productId
        })
    }

    function addProductToCart() {
        const response = dispatch(updateProductCartAsync(product.productId))
        response.then(result => {
            console.log(result)
            if (result.payload.statusCode === 1) {
                setIsInCart(true)
            }
        })
    }

    function removeProductFromCart() {
        const response = dispatch(updateProductCartAsync(product.productId))
        response.then(result => {
            if (result.payload.statusCode === 1) {
                setIsInCart(false)
            }
        })
    }


    function addProductToFavourites() {
        const response = dispatch(addFavouriteAsync(product.productId))
        response.then(result => {
            if (result.payload.statusCode === 1) {
                setIsFavourite(true)
            }
        })
    }

    function removeProductFromFavourites() {
        const response = dispatch(removeFavouriteAsync(product.productId))
        response.then(result => {
            if (result.payload.statusCode === 1) {
                setIsFavourite(false)
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
                        <i className="fa fa-picture-o" style={{ color: 'silver', fontSize:'7em' }} aria-hidden="true"></i>
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
            <div className={"row align-items-center " + classes.icons}>
                {
                    !user.isAdmin &&
                    <>
                        <div className="col-6 text-center">
                            {isInCart &&
                                    <span className="p1 fa-stack fa-1x">
                                        <i className="p2 fa fa-circle fa-stack-2x"></i>
                                    <i className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse" style={{ cursor: 'pointer' }}
                                        onClick={removeProductFromCart}
                                    ></i>
                                    </span>
                            }

                            {!isInCart &&
                                <i className={"fa fa-shopping-cart " + classes.icon}
                                    style={{ color: 'gray' }}
                                    onClick={addProductToCart}
                                    aria-hidden="true"></i>
                            }
                        </div>

                        <div className="col-6 text-center">
                            {!isFavourite &&
                                <i className={"fa fa-heart-o " + classes.icon}
                                    onClick={addProductToFavourites}
                                    aria-hidden="true"></i>
                            }
                            {isFavourite &&
                                <i className={"fa fa-heart " + classes.icon}
                                    style={{ color: 'red' }}
                                    onClick={removeProductFromFavourites}
                                    aria-hidden="true"></i>
                            }
                        </div>
                    </>

                }

                {
                    user.isAdmin && showQuantityUpdater &&
                    <>
                        <div className="col-4 text-center">
                            <i className={"fa fa-bar-chart " + classes.icon} aria-hidden="true"></i>
                        </div>
                        <div className="col-4 text-center">
                            <i className={"fa fa-plus-square-o " + classes.icon}
                                onClick={qantityUpdateHandler}
                                style={{ cursor: 'pointer' }}
                                data-bs-toggle="modal" data-bs-target="#quantityChanger"
                                aria-hidden="true"></i>
                        </div>
                        <div className="col-4 text-center">
                            <i className={"fa fa-gratipay " + classes.icon}
                                onClick={openProductFavouriteDetails}
                                aria-hidden="true"></i>
                        </div>
                    </>
                }

                {
                    user.isAdmin && !showQuantityUpdater &&
                    <>
                        <div className="col-6 text-center">
                            <i className={"fa fa-bar-chart " + classes.icon} aria-hidden="true"></i>
                        </div>
                        <div className="col-6 text-center">
                            <i className={"fa fa-gratipay " + classes.icon}
                                onClick={openProductFavouriteDetails}
                                aria-hidden="true"></i>
                        </div>
                    </>
                }


            </div>
        </div>
    )
}
