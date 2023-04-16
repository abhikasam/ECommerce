
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/category-actions';
import { getBrands } from '../store/brand-actions';
import { getIndividualCategories } from '../store/individual-category-actions';
import { useHistory } from "react-router-dom"
import { getCategoryMappings } from '../store/category-mapping-actions';
import ItemSelector from '../shared/item-selector';
import ChildSelector from '../shared/child-selector';
import { productActions } from '../store/product-slice';

export default function HomeAuthorized() {

    const dispatch = useDispatch()
    const history=useHistory()

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getCategoryMappings())
    }, [dispatch])

    const { user } = useSelector(state => state.auth);
    const { categories } = useSelector(state => state.category)
    const { categoryMappings } = useSelector(state => state.categoryMapping)

    const [categoryId, setCategoryId] = useState('')
    const { filters } = useSelector(state => state.product)

    function navigateProducts(value) {
        dispatch(productActions.updateFilters({
            ...filters,
            categories: [categoryId],
            individualCategories:[value]
        }))
        history.push('/products')
    }

    return (
        <>
            <div className="row">
                {!categoryId && categories.map(category =>
                    <Fragment key={category.key}>
                        <ItemSelector item={category} setItem={setCategoryId} />
                    </Fragment>
                )}
            </div>

            {categoryId &&
                <>
                <div className="row">
                    <div className="col-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setCategoryId('')}
                        >Select Category</button>
                    </div>
                </div>
                    <div className="row">
                        {categoryMappings.filter(cm => cm.parentId === categoryId).map(mapping =>
                            <Fragment key={mapping.key}>
                                <ChildSelector child={mapping} setChild={navigateProducts} />
                            </Fragment>
                        )}
                    </div>
                </>
            }
        </>
    )
}
