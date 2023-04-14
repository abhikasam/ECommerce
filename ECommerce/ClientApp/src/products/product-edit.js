
import { useDispatch, useSelector } from "react-redux"

import AddPhoto from '../images/add-image.png';
import classes from './product-edit.module.css';
import { useEffect } from "react";
import { getCategoryMappings } from "../store/category-mapping-actions";
import { getSizeMappings } from "../store/size-mapping-actions";
import { useState } from "react";
import ProductQuantitySelector from "../products/product-quantity-selector";
import { statusActions } from "../store/status-slice";
import { useHistory } from "react-router-dom";
import { saveProduct } from "../store/product-actions";


export default function EditProduct(props) {

    const state = props.location.state
    const [product] = useState(state?.product)

    const dispatch = useDispatch()
    const history = useHistory()

    const { brands } = useSelector(state => state.brand)
    const { categories } = useSelector(state => state.category)
    const { individualCategories } = useSelector(state => state.individualCategory)
    const { categoryMappings } = useSelector(state => state.categoryMapping)
    const { sizeMappings } = useSelector(state => state.sizeMapping)

    const [form, setForm] = useState({
        productId: product?.productId,
        description: product?.description,
        brandId: product?.brandId,
        categoryId: product?.categoryId,
        individualCategoryId: product?.individualCategoryId,
        productQuantities: (product && product.productQuantities) ? product.productQuantities:[],
        originalPrice: product?.originalPrice,
        photo: product?.photo,
        finalPrice: product?.finalPrice
    })

    const [formValid,setFormValid]=useState(false)

    useEffect(() => {
        dispatch(getCategoryMappings())
        dispatch(getSizeMappings())
    }, [dispatch])

    useEffect(() => {
        validateForm()
    }, [validateForm,form])

    function categoryChangeHandler(event) {
        setForm(prev => {
            return {
                ...prev,
                categoryId: parseInt(event.target.value),
                individualCategoryId:''
            }
        })
    }

    function individualCategoryChangeHandler(event) {
        setForm(prev => {
            return {
                ...prev,
                individualCategoryId: parseInt(event.target.value)
            }
        })
    }


    function productQuantitiesChangeHandler(productQuantities) {
        setForm(prev => {
            return {
                ...prev,
                productQuantities
            }
        })
    }

    function descriptionChangeHandler(event) {
        setForm(prev => {
            return {
                ...prev,
                description: event.target.value
            }
        })
    }

    function brandChangeHandler(event) {
        setForm(prev => {
            return {
                ...prev,
                brandId: parseInt(event.target.value)
            }
        })
    }

    function originalPriceHandler(event) {
        setForm(prev => {
            return {
                ...prev,
                originalPrice: event.target.value
            }
        })
    }

    function finalPriceChangeHandler(event) {
        setForm(prev => {
            return {
                ...prev,
                finalPrice: event.target.value
            }
        })
    }


    function validateForm() {
        var descriptionValidator = /^[a-zA-Z0-9 ]{20,}$/;
        var priceValidator = /^[1-9][0-9][0-9]+$/

        setFormValid(prev => {
            return descriptionValidator.test(form.description) && form.brandId
                && form.categoryId && form.individualCategoryId && form.productQuantities.length
                && priceValidator.test(form.originalPrice)
                && priceValidator.test(form.finalPrice)
        })
    }

    function formSubmitHandler(event) {
        if (formValid) {
            event.preventDefault();
            if (!product.productId) {
                setFormValid(false)
            }
            dispatch(saveProduct(form, history))
        }
    }

    function handleFileSelect(event) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setForm(prev => {
                return {
                    ...prev,
                    photo: reader.result.slice(reader.result.lastIndexOf(',') + 1)
                }
            })
        });
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <form method="post" onSubmit={formSubmitHandler}>
            <div className="row">
                <div className="col-3">
                    <input type="file" accept="image/*" onChange={handleFileSelect} />
                    {form.photo && 
                        <img src={"data:image/*;base64," +form.photo} alt="Something went wrong" className={classes.photo}>
                        </img>}
                </div>
                <div className="col-9">
                    <div className="row m-2">
                        <div className={"col-2 " + classes.label}>
                            <label className={classes.label}>Description :</label>
                        </div>
                        <div className={"col-5 "}>
                            <input type="text"
                                className="form-control"
                                name="description"
                                required
                                value={form.description}
                                onChange={descriptionChangeHandler}
                            />
                            <span className="text-danger" data-valmsg-for="description"></span>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className={"col-2 " + classes.label}>
                            <label className={classes.label}>Brand :</label>
                        </div>
                        <div className={"col-4 "}>
                            <select className="form-control"
                                name="brand"
                                value={form.brandId}
                                onChange={brandChangeHandler}>
                                <option key={0}
                                    style={{}} >  select one </option>
                                {brands.map(brand =>
                                    <option key={brand.key} value={brand.key}>{brand.value}</option>
                                )}
                            </select>
                            <span className="text-danger" data-valmsg-for="brand"></span>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className={"col-2 " + classes.label}>
                            <label className={classes.label}>Category :</label>
                        </div>
                        <div className={"col-4 "}>
                            <select className="form-control"
                                name="category"
                                value={form.categoryId}
                                onChange={categoryChangeHandler}>
                                <option key={0} value="" style={{}} >  select one </option>
                                {categories.map(category =>
                                    <option key={category.key} value={category.key}>{category.value}</option>
                                )}
                            </select>
                            <span className="text-danger" data-valmsg-for="category"></span>
                        </div>
                    </div>

                    {form.categoryId &&
                        <div className="row m-2">
                            <div className={"col-2 " + classes.label}>
                                <label className={classes.label}>Individual Category :</label>
                            </div>
                            <div className={"col-4 "}>
                                <select className="form-control" name="individualCategory"
                                    value={form.individualCategoryId}
                                    onChange={individualCategoryChangeHandler}>
                                    <option key={0} value="" style={{}} >  select one </option>
                                    {categoryMappings.filter(cm => cm.parentId === form.categoryId).map(categoryMapping =>
                                        <option key={categoryMapping.key} value={categoryMapping.childId}>{categoryMapping.childName}</option>
                                    )}
                                </select>
                                <span className="text-danger" data-valmsg-for="individualCategory"></span>
                            </div>
                        </div>
                    }

                    {form.individualCategoryId &&
                        <div className="row m-2">
                            <div className={"col-2 " + classes.label}>
                                <label className={classes.label}>Size Options :</label>
                            </div>
                            <div className="col-4 ">
                                <ProductQuantitySelector
                                    selected={form.productQuantities}
                                    sizeMappings={sizeMappings}
                                    individualCategory={form.individualCategoryId}
                                    setProductQuantites={productQuantitiesChangeHandler}
                                ></ProductQuantitySelector>
                            </div>
                            <span className="text-danger" data-valmsg-for="productQuantities"></span>
                        </div>
                    }

                    <div className="row m-2">
                        <div className="col-2">
                            <label className={classes.label}>Original Price :</label>
                        </div>
                        <div className="col-2">
                            <input type="text" className="form-control"
                                value={form.originalPrice}
                                name="originalPrice" onChange={originalPriceHandler} />
                        </div>
                    </div>

                    <div className="row m-2">
                        <div className="col-2">
                            <label className={classes.label}>Final Price :</label>
                        </div>
                        <div className="col-1">
                            <input type="text"
                                className="form-control"
                                value={form.finalPrice}
                                name="finalPrice"
                                onChange={finalPriceChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-3"></div>
                        <div className="col-2">
                            <input type="submit" value="Save" className="btn btn-danger"
                                disabled={!formValid} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

