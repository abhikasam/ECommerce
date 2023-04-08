import { useState } from "react"
import { useHistory } from "react-router-dom"
import classes from './product-details.module.css'


export default function ProductDetails(props) {

    const history=useHistory()
    const [product] = useState(props.location.state?.product)

    if (!product) {
        history.push('/notfound')
    }

    function getDiscountColor() {
        if (product.discount >= 50)
            return 'green';
        else if (product.discount >= 15 && product.discount < 50)
            return 'blue';
        else return 'red';
    }


    return (
        <>
            <div className="row">
                <div className="col-3">
                    <div className={classes.photo} style={{ background: product.background }}>
                        <div className={classes.alphabet}>
                            {product.alphabet}
                        </div>
                    </div>
                </div>
                <div className="col-9">
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
                            {product.sizeOptions}
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


