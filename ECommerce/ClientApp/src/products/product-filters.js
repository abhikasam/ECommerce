import CollapseElement from "../shared/collapse"
import ListSelect from "../shared/list-select"
import { useDispatch, useSelector } from "react-redux"
import { getBrands } from "../store/brand-actions"
import { useEffect } from "react"
import { getCategories } from "../store/category-actions"
import { getIndividualCategories } from "../store/individual-category-actions"
import { productActions } from "../store/product-slice"


export default function ProductFilters(props) {
    
    const dispatch = useDispatch()

    const { brands } = useSelector(state => state.brand)
    const { categories } = useSelector(state => state.category)
    const { individualCategories } = useSelector(state => state.individualCategory)

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getIndividualCategories())
    }, [dispatch])

    return (
        <div className="filters">
            <input type="button" className="btn btn-primary m-2" onClick={() => { props.onUpdate() }} value="Update" />
            <input type="reset" className="btn btn-secondary m-2" value="Clear" />

            <div className="dropdown-divider"></div>

            <div className="row align-items-center">
                <div className="col-8">
                    <label>Product Count :</label>
                </div>
                <div className="col-4">
                    <select className="form-control" onChange={(event) => dispatch(productActions.updateProductCount(event.target.value)) }>
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
                    <select className="form-control" onChange={(event) => dispatch(productActions.updateSortBy(event.target.value))}>
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
                    <select className="form-control" onChange={(event) => dispatch(productActions.updateSortOrder(event.target.value))}>
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
                        updateItems={(brands) => dispatch(productActions.updateBrands(brands))}
                    />}></CollapseElement>
            </div>

            <div>
                <CollapseElement
                    classNames="btn-success"
                    displayName="Categories"
                    collapseId="collapseCategories"
                    component={<ListSelect
                        items={categories}
                        updateItems={(categories) => dispatch(productActions.updateCategories(categories))}
                    />}></CollapseElement>
            </div>

            <div>
                <CollapseElement
                    classNames="btn-success"
                    displayName="Individual Categories"
                    collapseId="collapseIndividualCategories"
                    component={<ListSelect
                        items={individualCategories}
                        updateItems={(individualCategories) => dispatch(productActions.updateIndividualCategories(individualCategories))}
                    />}></CollapseElement>
            </div>

        </div>
    )
}

