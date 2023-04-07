import CollapseElement from "../shared/collapse"
import ListSelect from "../shared/list-select"
import { useDispatch, useSelector } from "react-redux"
import { productFilterActions } from "../store/product-filter-slice"
import { getBrands } from "../store/brand-actions"
import { useEffect } from "react"
import { getCategories } from "../store/category-actions"


export default function ProductFilters(props) {

    
    const dispatch = useDispatch()

    const { brands } = useSelector(state => state.brand)
    const { categories } = useSelector(state => state.category)


    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
    }, [dispatch])

    const productCountChangeEvent = (event) => {
        dispatch(productFilterActions.updateProductCount(event.target.value))
    }

    const sortByChangeEvent = (event) => {
        dispatch(productFilterActions.updateSortBy(event.target.value))
    }

    const sortOrderChangeEvent = (event) => {
        dispatch(productFilterActions.updateSortOrder(event.target.value))
    }


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
                    <select className="form-control" onChange={productCountChangeEvent}>
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
                    <select className="form-control" onChange={sortByChangeEvent}>
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
                    <select className="form-control" onChange={sortOrderChangeEvent}>
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
                        updateItems={(brands) => dispatch(productFilterActions.updateBrands(brands))}
                    />}></CollapseElement>
            </div>

            <div>
                <CollapseElement
                    classNames="btn-success"
                    displayName="Categories"
                    collapseId="collapseCategories"
                    component={<ListSelect
                        items={categories}
                        updateItems={(categories) => dispatch(productFilterActions.updateCategories(categories))}
                    />}></CollapseElement>
            </div>
        </div>
    )
}

