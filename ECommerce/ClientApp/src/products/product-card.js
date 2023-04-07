
import classes from './product-card.module.css'


export default function ProductCard({ product }: props) {

    function getDiscountColor() {
        if (product.discount >= 50)
            return 'green';
        else if (product.discount >= 15 && product.discount < 50)
                return 'blue';
         else return 'red';
    }
    
    return (
        <div className={classes.card}>
            <div className={classes.photo} style={{ background: product.background }}>
                <div className={classes.alphabet}>
                    {product.alphabet}
                </div>
            </div>
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
    )
}
