
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/category-actions';
import { getBrands } from '../store/brand-actions';
import { getIndividualCategories } from '../store/individual-category-actions';
import { getCategoryMappings } from '../store/category-mapping-actions';
import ItemSelector from '../shared/item-selector';
import ChildSelector from '../shared/child-selector';

export default function HomeAuthorized() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getCategoryMappings())
    }, [dispatch])

    const { user } = useSelector(state => state.auth);

    const {brands }=useSelector(state=>state.brand)
    const { categories } = useSelector(state => state.category)
    const { categoryMappings } = useSelector(state => state.categoryMapping)

    console.log(categories, categoryMappings)

    return (
        <>
            {user.fullName} {user.isAdmin ? "true" : "false"}

            <div className="row">
                {categories.map(brand =>
                    <Fragment key={brand.key}>
                        <ItemSelector item={brand} />
                    </Fragment>
                )}
            </div>

            <div className="row">
                {categoryMappings.filter(cm=>cm.parentId===7).map(mapping =>
                    <Fragment key={mapping.key}>
                        <ChildSelector child={mapping} />
                    </Fragment>    
                )}
            </div>
        </>
    )
}
