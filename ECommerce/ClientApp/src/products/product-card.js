import { useDispatch, useSelector } from 'react-redux';
import classes from './product-card.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { upadteProductCart } from '../store/cart-slice';
import CartQuantity from './cart-quantity';
import { addFavouriteAsync, removeFavouriteAsync } from '../store/favourite-slice';


export default function ProductCard({ product, qantityUpdateHandler,showQuantityUpdater }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => state.auth)
    const { products: favourites } = useSelector(state => state.favourite)
    const { products: cartProducts } = useSelector(state => state.cart)


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

    return (
        <div className={"col " + classes.card}>
            <div
                onClick={openProductDetails} style={{ cursor: 'pointer' }}>
                {product.photo &&
                    <img src={"data:image/*;base64," + product.photo} alt={product.description} className={classes.photo}>
                    </img>}
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
                            {cartProducts.map(i => i.productId).includes(product.productId) &&
                                    <span className="p1 fa-stack fa-1x">
                                        <i className="p2 fa fa-circle fa-stack-2x"></i>
                                    <i className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse" style={{ cursor: 'pointer' }}
                                        onClick={() => dispatch(upadteProductCart(product.productId))}
                                    ></i>
                                    </span>
                            }

                            {!cartProducts.map(i => i.productId).includes(product.productId) &&
                                <i className={"fa fa-shopping-cart " + classes.icon}
                                    style={{ color: 'gray' }}
                                    onClick={() => dispatch(upadteProductCart(product.productId))}
                                    aria-hidden="true"></i>
                            }
                        </div>

                        <div className="col-6 text-center">
                            {!favourites.map(i => i.productId).includes(product.productId) &&
                                <i className={"fa fa-heart-o " + classes.icon}
                                    onClick={(event) => dispatch(addFavouriteAsync(product.productId))}
                                    aria-hidden="true"></i>
                            }
                            {favourites.map(i => i.productId).includes(product.productId) &&
                                <i className={"fa fa-heart " + classes.icon}
                                    style={{ color: 'red' }}
                                    onClick={(event) => dispatch(removeFavouriteAsync(product.productId))}
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
