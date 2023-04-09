
import { useDispatch, useSelector } from "react-redux"

import AddPhoto from '../images/add-image.png';
import classes from './product-edit.module.css';
import { useEffect } from "react";
import { getCategoryMappings } from "../store/category-mapping-actions";
import { getSizeMappings } from "../store/size-mapping-actions";
import { useState } from "react";
import ProductQuantitySelector from "../products/product-quantity-selector";
import { addProduct } from "../store/product-actions";
import { statusActions } from "../store/status-slice";
import { useHistory } from "react-router-dom";


export default function EditProduct() {

    const dispatch = useDispatch()
    const history=useHistory()
    const { brands } = useSelector(state => state.brand)
    const { categories } = useSelector(state => state.category)
    const { individualCategories } = useSelector(state => state.individualCategory)
    const { categoryMappings } = useSelector(state => state.categoryMapping)
    const { sizeMappings } = useSelector(state => state.sizeMapping)

    const [form, setForm] = useState({
        description: '',
        brandId:'',
        categoryId: '',
        individualCategoryId:'',
        productQuantities: [],
        originalPrice: '',
        photo:null
    })

    const [formValid,setFormValid]=useState(false)

    useEffect(() => {
        dispatch(getCategoryMappings())
        dispatch(getSizeMappings())
    }, [dispatch])

    useEffect(() => {
        validateForm()
    }, [form])

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

    function validateForm() {
        var descriptionValidator = /^[a-zA-Z ]{20,}$/;
        var originalPriceValidator = /^[1-9][0-9][0-9]+$/

        setFormValid(prev => {
            return descriptionValidator.test(form.description) && form.brandId
                && form.categoryId && form.individualCategoryId && form.productQuantities.length
                && originalPriceValidator.test(form.originalPrice)
        })
    }

    async function formSubmitHandler(event) {
        if (formValid) {
            event.preventDefault();
            await fetch('products'
                , {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json;'
                    }
                }
            )
                .then(result => {
                    if (!result.ok) throw result;
                    return result.json();
                })
                .then(response => {
                    dispatch(statusActions.add(response))
                    setTimeout(() => {
                        history.push('/products')
                    }, 3000)
                })
                .catch(error =>
                    dispatch(statusActions.add(error))
                )
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
        <form method="post" onSubmit={event=>formSubmitHandler(event)}>
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
                                onChange={event=>descriptionChangeHandler(event)}
                            />
                            <span className="text-danger" data-valmsg-for="description"></span>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className={"col-2 " + classes.label}>
                            <label className={classes.label}>Brand :</label>
                        </div>
                        <div className={"col-4 "}>
                            <select className="form-control" name="brand" onChange={(event)=> brandChangeHandler(event)}>
                                <option key={0} value="" style={{}} >  select one </option>
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
                                onChange={(event) => categoryChangeHandler(event)}>
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
                                    onChange={(event) => individualCategoryChangeHandler(event)}>
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
                                <ProductQuantitySelector sizeMappings={sizeMappings}
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
                            <input type="text" className="form-control" name="originalPrice" onChange={(event)=> originalPriceHandler(event)} />
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
                    <div className="row m-2">
                        <div className="col-3"></div>
                        <div className="col-2">
                            <input type="submit" value="Add" className="btn btn-danger"
                                disabled={!formValid} />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

