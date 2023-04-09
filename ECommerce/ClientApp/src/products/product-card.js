import { useDispatch, useSelector } from 'react-redux';
import classes from './product-card.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { addFavourite, removeFavourite, updateFourites } from '../store/favourite-actions';


export default function ProductCard({ product }) {

    const dispatch = useDispatch()
    const history=useHistory()
    const { user } = useSelector(state => state.auth)
    const { products:favourites } = useSelector(state => state.favourite)

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

    return (
        <div className={classes.card}>
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
            <div className={classes.actions}>
                <div className={"row "+classes.icons }>
                    <div className="col-4 text-center">
                        <i className={"fa fa-shopping-cart "+classes.icon} aria-hidden="true"></i>
                    </div>
                    <div className="col-4 text-center">
                        <i className={"fa fa-external-link " + classes.icon}
                            onClick={openProductDetails} aria-hidden="true"></i>
                    </div>
                    <div className="col-4 text-center">
                        {
                            user.isAdmin &&
                            <>
                                <i className={"fa fa-bar-chart " + classes.icon} aria-hidden="true"></i>
                            </>
                        }
                        {
                            !user.isAdmin &&
                            <>
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
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
