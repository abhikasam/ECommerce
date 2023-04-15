import { useDispatch, useSelector } from 'react-redux';
import classes from './product-card.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { addFavourite, removeFavourite, updateFourites } from '../store/favourite-actions';
import { addToCart, removeFromCart, upadteProductCart } from '../store/cart-actions';
import CartQuantity from './cart-quantity';


export default function ProductCard({ product }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => state.auth)
    const { products: favourites } = useSelector(state => state.favourite)
    const { products: cartProducts } = useSelector(state => state.cart)

    const [showModal, setShowModal] = useState(false);

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

    function updateCart(quantity) {
        dispatch(upadteProductCart(product.productId, quantity))
    }

    return (
        <div className={"col " + classes.card}>
            <div onClick={openProductDetails} style={{ cursor: 'pointer' }}>
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
                                <div>
                                    <span className="p1 fa-stack fa-1x has-badge ">
                                        <i className="p2 fa fa-circle fa-stack-2x"></i>
                                        <i className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse" style={{ cursor: 'pointer' }}
                                            onClick={() => setShowModal(true)}
                                            data-bs-toggle="modal" data-bs-target={"#cartCounter" + product.productId}
                                        ></i>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {product.cartItem.quantity}
                                        </span>
                                    </span>
                                </div>
                            }

                            {!cartProducts.map(i => i.productId).includes(product.productId) &&
                                <i className={"fa fa-shopping-cart " + classes.icon}
                                    style={{ color: 'gray' }}
                                    onClick={() => setShowModal(true)}
                                    data-bs-toggle="modal" data-bs-target={"#cartCounter" + product.productId}
                                    aria-hidden="true"></i>
                            }
                        </div>

                        <div className="col-6 text-center">
                            {!favourites.map(i => i.productId).includes(product.productId) &&
                                <i className={"fa fa-heart-o " + classes.icon}
                                    onClick={(event) => dispatch(addFavourite(product.productId))}
                                    aria-hidden="true"></i>
                            }
                            {favourites.map(i => i.productId).includes(product.productId) &&
                                <i className={"fa fa-heart " + classes.icon}
                                    style={{ color: 'red' }}
                                    onClick={(event) => dispatch(removeFavourite(product.productId))}
                                    aria-hidden="true"></i>
                            }
                        </div>
                    </>

                }

                {
                    user.isAdmin &&
                    <>
                        <div className="col-6 text-center">
                            <i className={"fa fa-bar-chart " + classes.icon} aria-hidden="true"></i>
                        </div>
                        <div className="col-6 text-center">
                            <i className={"fa fa-gratipay " + classes.icon}
                                aria-hidden="true"></i>
                        </div>
                    </>
                }
            </div>
            <CartQuantity setShowModal={setShowModal} product={product} updateCart={updateCart} ></CartQuantity>
        </div>
    )
}
