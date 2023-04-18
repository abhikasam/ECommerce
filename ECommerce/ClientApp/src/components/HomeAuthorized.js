
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import ItemSelector from '../shared/item-selector';
import ChildSelector from '../shared/child-selector';
import { productActions } from '../store/product-slice';
import ListSelect from '../shared/list-select';
import UserProductFilters from '../shared/user-product-filters';
import { fetchBrands } from '../store/brand-slice';
import { fetchCategoriesAsync } from '../store/category-slice';
import { fetchCategoryMappingsAsync } from '../store/category-mapping-slice';
import { fetchIndividualCategoriesAsync } from '../store/individual-category-slice';

export default function HomeAuthorized() {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchBrands())
        dispatch(fetchCategoriesAsync())
        dispatch(fetchCategoryMappingsAsync())
        dispatch(fetchIndividualCategoriesAsync())
    }, [dispatch])

    const { user } = useSelector(state => state.auth);
    const { categories } = useSelector(state => state.category)
    const { categoryMappings } = useSelector(state => state.categoryMapping)
    
    const [categoryId, setCategoryId] = useState('')
    const { filters } = useSelector(state => state.product)
    const [showPreferences,setShowPreferences]=useState(false)

    function navigateProducts(value) {
        dispatch(productActions.updateFilters({
            pageNumber: 1,
            productCount: 50,
            sortBy: 'Search',
            sortOrder: 'asc',
            brands: [],
            priceRanges:[],
            categories: [categoryId],
            individualCategories: [value]
        }))
        history.push('/products')
    }

    return (
        <>
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-danger"
                        type="button"
                        onClick={()=>setShowPreferences(prev=> !prev)}
                    >{!showPreferences ? "Show Preferences" :"Hide Preferences"}
                    </button>
                </div>
            </div>

            {!showPreferences && 
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
                                    className="btn btn-primary m-2 p-2"
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
            }

            {showPreferences &&
                <UserProductFilters
                    
                ></UserProductFilters>
            }

        </>
    )
}
