
import { useDispatch, useSelector } from "react-redux"

import AddPhoto from '../images/add-image.png';
import classes from './product-edit.module.css';


export default function EditProduct() {

    const { brands } = useSelector(state => state.brand)
    const { categories } = useSelector(state => state.category)
    const { individualCategories } = useSelector(state => state.individualCategory)

    return (
        <form method="post">
            <div className="row">
                <div className="col-3">
                    <img src={AddPhoto} className={classes.photo}></img>
                </div>
                <div className="col-9">
                    <div className="row m-2">
                        <div className={"col-2 " + classes.label}>
                            <label className={classes.label}>Description :</label>
                        </div>
                        <div className={"col-5 "}>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className={"col-2 " + classes.label}>
                            <label className={classes.label}>Brand :</label>
                        </div>
                        <div className={"col-4 "}>
                            <select className="form-control">
                                <option key={0} value="" style={{}} >  select one </option>
                                {brands.map(brand =>
                                    <option key={brand.key} value={brand.key}>{brand.value}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className={"col-2 " + classes.label}>
                            <label className={classes.label}>Category :</label>
                        </div>
                        <div className={"col-4 "}>
                            <select className="form-control">
                                <option key={0} value="" style={{}} >  select one </option>
                                {categories.map(category =>
                                    <option key={category.key} value={category.key}>{category.value}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className={"col-2 " + classes.label}>
                            <label className={classes.label}>Individual Category :</label>
                        </div>
                        <div className={"col-4 "}>
                            <select className="form-control">
                                <option key={0} value="" style={{}} >  select one </option>
                                {individualCategories.map(individualCategory =>
                                    <option key={individualCategory.key} value={individualCategory.key}>{individualCategory.value}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="row m-2">
                        <div className="col-2">
                            <label className={classes.label}>Size Options with Quantity :</label>
                        </div>
                    </div>

                    <div className="row m-2">
                        <div className="col-2">
                            <label className={classes.label}>Original Price :</label>
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row m-2">
                        <div className="col-2">
                            <label className={classes.label}>Discount :</label>
                        </div>
                        <div className="col-1">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

