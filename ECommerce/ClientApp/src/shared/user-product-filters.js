import { useDispatch, useSelector } from "react-redux"
import ListSelect from "./list-select"
import { useEffect } from "react"
import { fetchUserProductFiltersAsync, saveUserProductFilterAsync } from "../store/user-product-filter-slice"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { productActions, updateFiltersAsync } from "../store/product-slice"


export default function UserProductFilters() {

    const dispatch = useDispatch()
    const history = useHistory()

    const { brands } = useSelector(state => state.brand)
    const { categories } = useSelector(state => state.category)
    const { categoryMappings } = useSelector(state => state.categoryMapping)
    const { individualCategories } = useSelector(state => state.individualCategory)

    const { filters: userProductFilters } = useSelector(state => state.userProductFilter)

    const [filters, setFilters] = useState(userProductFilters)
    const [showPageNumberError, setShowPageNumberError]=useState(false)

    useEffect(() => {
        setFilters(userProductFilters)
    }, [setFilters, userProductFilters])

    useEffect(() => {
        dispatch(fetchUserProductFiltersAsync())
    }, [dispatch])

    const isValidPageNumber = (value) => {
        let pageNumberValidator = /^[1-9][0-9]*$/
        return pageNumberValidator.test(value)

    }

    const updatePageNumberHandler = (event) => {
        setShowPageNumberError(!isValidPageNumber(event.target.value))
        setFilters(prev => {
            return {
                ...prev, pageNumber: event.target.value
            }
        })
    }

    function categoryUpdateHandler(category) {
        setFilters(prev => {
            let currentCategories = prev.categoryIds;
            if (currentCategories.includes(category)) {
                currentCategories = currentCategories.filter(id => id !== category)
            }
            else {
                currentCategories = [...currentCategories, category]
            }
            return {
                ...prev,
                categoryIds: currentCategories
            }
        })
    }

    function individualCategoryUpdateHandler(individualCategory) {
        setFilters(prev => {
            let currentIndividualCategories = prev.individualCategoryIds;
            if (currentIndividualCategories.includes(individualCategory)) {
                currentIndividualCategories = currentIndividualCategories.filter(id => id !== individualCategory)
            }
            else {
                currentIndividualCategories = [...currentIndividualCategories, individualCategory]
            }
            return {
                ...prev,
                individualCategoryIds: currentIndividualCategories
            }
        })
    }

    function brandUpdateHandler(brand) {
        setFilters(prev => {
            let currentBrands = prev.brandIds;
            if (currentBrands.includes(brand)) {
                currentBrands = currentBrands.filter(id => id !== brand)
            }
            else {
                currentBrands = [...currentBrands, brand]
            }
            return {
                ...prev,
                brandIds: currentBrands
            }
        })
    }

    function priceRangeUpdateHandler(priceRange) {
        setFilters(prev => {
            let currentPriceRanges = prev.priceRangeIds;
            if (currentPriceRanges.includes(priceRange)) {
                currentPriceRanges = currentPriceRanges.filter(id => id !== priceRange)
            }
            else {
                currentPriceRanges = [...currentPriceRanges, priceRange]
            }
            return {
                ...prev,
                priceRangeIds: currentPriceRanges
            }
        })
    }

    function getProducts() {
        dispatch(updateFiltersAsync({
            brands: filters.brandIds,
            categories: filters.categoryIds,
            individualCategories: filters.individualCategoryIds,
            priceRanges: filters.priceRangeIds,
            productCount: filters.productCount,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
            pageNumber: filters.pageNumber
        }))
        history.push('/products')
    }

    function savePreferences() {
        dispatch(saveUserProductFilterAsync(filters))
    }

    return (
        <div className="row m-3">
            <div className="col-2">
                <label className="fw-bold">Categories</label>
                <ListSelect
                    items={categories}
                    type="category"
                    selected={filters.categoryIds}
                    updateItems={categoryUpdateHandler}
                />
            </div>
            <div className="col-2">
                <label className="fw-bold">Individual Categories</label>
                <ListSelect
                    showSearch={true}
                    style={{ maxHeight: '35em' }}
                    items={individualCategories}
                    type="individualcategory"
                    selected={filters.individualCategoryIds}
                    updateItems={individualCategoryUpdateHandler}
                />
            </div>
            <div className="col-2">
                <label className="fw-bold">Brands</label>
                <ListSelect
                    showSearch={true}
                    style={{ maxHeight: '35em' }}
                    items={brands}
                    type="brand"
                    selected={filters.brandIds}
                    updateItems={brandUpdateHandler}
                />
            </div>
            <div className="col-2">
                <label className="fw-bold">Price Ranges</label>
                <ListSelect
                    items={
                        [
                            { key: '0-500', value: 'below 500' },
                            { key: '500-1000', value: '500-1000' },
                            { key: '1000-5000', value: '1000-5000' },
                            { key: '5000-10000', value: '5000-10000' },
                            { key: '10000-15000', value: '10000-15000' },
                            { key: '15000-50000', value: 'above 15000' }
                        ]}
                    type="pricerange"
                    selected={filters.priceRangeIds}
                    updateItems={priceRangeUpdateHandler}
                />
            </div>
            <div className="col-4">
                <div className="row ms-5 me-5">
                    <div className="col-6">
                        <button
                            type="button"
                            className="btn btn-success m-2 p-2"
                            disabled={!isValidPageNumber(filters.pageNumber)}
                            onClick={savePreferences}
                        >Save Preferences
                        </button>
                    </div>
                    <div className="col-6">
                        <button
                            type="button"
                            className="btn btn-primary m-2 p-2"
                            disabled={!isValidPageNumber(filters.pageNumber)}
                            onClick={getProducts}
                        > Get Products
                        </button>
                    </div>                    
                </div>
                <div className="row m-5 align-items-center">
                    <div className="col-6">
                        <label className="label fw-bold">Product Count</label>
                    </div>
                    <div className="col-6">
                        <select
                            className="form-control"
                            value={filters.productCount}
                            onChange={(event) => setFilters(prev => {
                                return {
                                    ...prev, productCount: event.target.value
                                }
                            })}
                        >
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>

                    </div>
                </div>
                <div className="row m-5 align-items-center">
                    <div className="col-6">
                        <label className="label fw-bold">Sort By</label>
                    </div>
                    <div className="col-6">
                        <select
                            className="form-control"
                            value={filters.sortBy}
                            onChange={(event) => setFilters(prev => {
                                return {
                                    ...prev, sortBy: event.target.value
                                }
                            })}
                        >
                            <option value="Search">Search</option>
                            <option value="Description">Name</option>
                            <option value="Brand">Brand</option>
                            <option value="Category">Category</option>
                            <option value="IndividualCategory">IndividualCategory</option>
                            <option value="Price">Price</option>
                        </select>
                    </div>
                </div>
                <div className="row m-5 align-items-center">
                    <div className="col-6">
                        <label className="label fw-bold">Sort Order</label>
                    </div>
                    <div className="col-6">
                        <select
                            className="form-control"
                            value={filters.sortOrder}
                            onChange={(event) => setFilters(prev => {
                                return {
                                    ...prev, sortOrder: event.target.value
                                }
                            })}
                        >
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                    </div>
                </div>
                <div className="row m-5 align-items-center">
                    <div className="col-6">
                        <label className="label fw-bold">Page Number</label>
                    </div>
                    <div className="col-6">
                        <input type="text"
                            name="pageNumber"
                            className="form-control"
                            value={filters.pageNumber}
                            onChange={updatePageNumberHandler}
                        />
                        {showPageNumberError &&
                            <span className="text-danger">Page Number is invalid.</span>
                        }
                    </div>
                </div>
                <div className="row m-5">
                    <span className="text-warning">If products not present in that page, 1 is taken as page number.</span>
                </div>
            </div>
        </div>
    )
}
