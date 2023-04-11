import CollapseElement from "../shared/collapse"
import ListSelect from "../shared/list-select"
import { useDispatch, useSelector } from "react-redux"
import { getBrands } from "../store/brand-actions"
import { useEffect, useState } from "react"
import { getCategories } from "../store/category-actions"
import { getIndividualCategories } from "../store/individual-category-actions"
import { productActions } from "../store/product-slice"
import { useHistory } from "react-router-dom"
import { individualCategoryActions } from "../store/individual-category-slice"


export default function ProductFilters(props) {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const { isAuthenticated,user } = useSelector(state => state.auth)
    const { brands } = useSelector(state => state.brand)
    const { categories } = useSelector(state => state.category)
    const { individualCategories } = useSelector(state => state.individualCategory)

    const { filters } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getIndividualCategories())
    }, [dispatch])

    function productCountChangeHandler(event) {
        dispatch(productActions.updateProductCount(event.target.value))
        dispatch(productActions.updatePageNumber(1))
    }

    function priceRangesUpdateHandler(brands) {
        dispatch(productActions.updatePriceRanges(brands))
        dispatch(productActions.updatePageNumber(1))
    }

    function brandsUpdateHandler(priceRanges) {
        dispatch(productActions.updatePriceRanges(priceRanges))
        dispatch(productActions.updatePageNumber(1))
    }

    function individualCategoryUpdateHandler(individualCategories) {
        dispatch(productActions.updateIndividualCategories(individualCategories))
        dispatch(productActions.updatePageNumber(1))
    }

    function categoryUpdateHandler(categories) {
        dispatch(productActions.updateCategories(categories))
        dispatch(productActions.updatePageNumber(1))
    }

    return (
        <div className="filters">
            <input type="button" className="btn btn-primary m-2" onClick={() => { props.onUpdate() }} value="Update" />
            {isAuthenticated && user.isAdmin && 
                <input type="button"
                    onClick={() => history.push('/product-edit')}
                className="btn btn-danger m-2"
                value="Add Product" />
            }
            <div className="dropdown-divider"></div>

            <div className="row align-items-center">
                <div className="col-8">
                    <label>Product Count :</label>
                </div>
                <div className="col-4">
                    <select className="form-control"
                        value={filters.productCount??''}
                        onChange={(event) => productCountChangeHandler(event)}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </select>
                </div>
            </div>
            
            <div className="dropdown-divider"></div>

            <div className="row align-items-center">
                <div className="col-8">
                    <label>Sort By :</label>
                </div>
                <div className="col-4">
                    <select className="form-control"
                        value={filters.sortBy??''}
                        onChange={(event) => dispatch(productActions.updateSortBy(event.target.value))}>
                        <option value="Description">Name</option>
                        <option value="Brand">Brand</option>
                        <option value="Category">Category</option>
                        <option value="IndividualCategory">IndividualCategory</option>
                        <option value="Price">Price</option>
                    </select>
                </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="row align-items-center">
                <div className="col-8">
                    <label>Sort Order :</label>
                </div>
                <div className="col-4">
                    <select className="form-control"
                        value={filters.sortOrder??''}
                        onChange={(event) => dispatch(productActions.updateSortOrder(event.target.value))}>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>
            </div>

            <div className="dropdown-divider"></div>

            <div>
                <CollapseElement
                    classNames="btn-success"
                    displayName="Brands"
                    collapseId="collapseBrands"
                    component={<ListSelect
                        items={brands}
                        selected={filters.brands}
                        updateItems={brandsUpdateHandler}
                    />}></CollapseElement>
            </div>

            <div>
                <CollapseElement
                    classNames="btn-success"
                    displayName="Categories"
                    collapseId="collapseCategories"
                    component={<ListSelect
                        items={categories}
                        selected={filters.categories}
                        updateItems={categoryUpdateHandler}
                    />}></CollapseElement>
            </div>

            <div>
                <CollapseElement
                    classNames="btn-success"
                    displayName="Individual Categories"
                    collapseId="collapseIndividualCategories"
                    component={<ListSelect
                        items={individualCategories}
                        selected={filters.individualCategories}
                        updateItems={individualCategoryUpdateHandler}
                    />}></CollapseElement>
            </div>

            <div>
                <CollapseElement
                    classNames="btn-success"
                    displayName="Price Ranges"
                    collapseId="collapsePriceRanges"
                    component={<ListSelect
                        items={[
                            { key: '0-500', value: 'below 500' },
                            { key: '500-1000', value: '500-1000' },
                            { key: '1000-5000', value: '1000-5000' },
                            { key: '5000-10000', value: '5000-10000' },
                            { key: '10000-15000', value: '10000-15000' },
                            { key: '15000-50000', value: 'above 15000' }
                        ]}
                        selected={filters.priceRanges}
                        updateItems={priceRangesUpdateHandler}
                    />}></CollapseElement>
            </div>


        </div>
    )
}

