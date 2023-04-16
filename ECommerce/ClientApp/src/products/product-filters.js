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


export default function ProductFilters({ initialFilters,onUpdate }) {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const { isAuthenticated,user } = useSelector(state => state.auth)
    const { brands } = useSelector(state => state.brand)
    const { categories } = useSelector(state => state.category)
    const { individualCategories } = useSelector(state => state.individualCategory)

    const [filters, setFilters] = useState(initialFilters)

    useEffect(() => {
        setFilters((prev) => {
            return {
                ...prev,
                search: initialFilters.search
            }
        })
    }, [initialFilters.search])


    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getIndividualCategories())
    }, [dispatch])

    function productCountChangeHandler(event) {
        setFilters(prev => {
            return {
                ...prev,
                productCount: event.target.value,
                pageNumber:1
            }
        })
    }

    function priceRangesUpdateHandler(priceRange) {
        setFilters(prev => {
            let currentPriceRanges = prev.priceRanges;
            if (currentPriceRanges.includes(priceRange)) {
                currentPriceRanges = currentPriceRanges.filter(id => id !== priceRange)
            }
            else {
                currentPriceRanges = [...currentPriceRanges, priceRange]
            }

            return {
                ...prev,
                priceRanges: currentPriceRanges,
                pageNumber: 1
            }
        })
    }

    function brandsUpdateHandler(brand) {
        setFilters(prev => {
            let currentBrands = prev.brands;
            if (currentBrands.includes(brand)) {
                currentBrands = currentBrands.filter(id => id !== brand)
            }
            else {
                currentBrands = [...currentBrands,brand]
            }
            return {
                ...prev,
                brands: currentBrands,
                pageNumber: 1
            }
        })
    }

    function individualCategoryUpdateHandler(individualCategory) {
        setFilters(prev => {
            let currentIndividualCategories = prev.individualCategories;
            if (currentIndividualCategories.includes(individualCategory)) {
                currentIndividualCategories = currentIndividualCategories.filter(id => id !== individualCategory)
            }
            else {
                currentIndividualCategories = [...currentIndividualCategories, individualCategory]
            }
            return {
                ...prev,
                individualCategories: currentIndividualCategories,
                pageNumber: 1
            }
        })
    }

    function categoryUpdateHandler(category) {
        setFilters(prev => {
            let currentCategories = prev.categories;
            if (currentCategories.includes(category)) {
                currentCategories = currentCategories.filter(id => id !== category)
            }
            else {
                currentCategories = [...currentCategories, category]
            }
            return {
                ...prev,
                categories: currentCategories,
                pageNumber: 1
            }
        })
    }

    function sortByChangeHandler(sortBy) {
        setFilters(prev => {
            return {
                ...prev,
                sortBy
            }
        })
    }

    function sortOrderChangeHandler(sortOrder) {
        setFilters(prev => {
            return {
                ...prev,
                sortOrder
            }
        })
    }

    return (
        <div className="filters">
            <input type="button" className="btn btn-primary m-2" onClick={() => onUpdate(filters)} value="Update" />
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
                        value={filters.productCount}
                        onChange={productCountChangeHandler}>
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
                        value={filters.sortBy}
                        onChange={sortByChangeHandler}>
                        <option value="Search">Search</option>
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
                        value={filters.sortOrder}
                        onChange={sortOrderChangeHandler}>
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
                        type="brand"
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
                        type="category"
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
                        type="individualCategory"
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
                        type="priceRange"
                        selected={filters.priceRanges}
                        updateItems={priceRangesUpdateHandler}
                    />}></CollapseElement>
            </div>


        </div>
    )
}

