
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
import { authActions, fetchAdminDashBoardAsync } from '../store/auth-slice';

export default function HomeAuthorized() {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchBrands())
        dispatch(fetchCategoriesAsync())
        dispatch(fetchCategoryMappingsAsync())
        dispatch(fetchIndividualCategoriesAsync())
    }, [dispatch])

    const { user, dashboard } = useSelector(state => state.auth);
    const { categories } = useSelector(state => state.category)
    const { categoryMappings } = useSelector(state => state.categoryMapping)


    useEffect(() => {
        if (user.isAdmin) {
            dispatch(fetchAdminDashBoardAsync())
        }
    }, [dispatch, user.isAdmin])

    console.log(dashboard)

    const [categoryId, setCategoryId] = useState('')
    const { filters } = useSelector(state => state.product)
    const [showPreferences, setShowPreferences] = useState(false)

    function navigateProducts(value) {
        dispatch(productActions.updateFilters({
            pageNumber: 1,
            productCount: 50,
            sortBy: 'Search',
            sortOrder: 'asc',
            brands: [],
            priceRanges: [],
            categories: [categoryId],
            individualCategories: [value]
        }))
        history.push('/products')
    }

    function openUserDetails(user,selectedTab) {
        history.push('/user-details', {
            user: user,
            selectedTab: selectedTab
        })
    }


    return (
        <>
            {!user.isAdmin &&
                <>
                    <div className="row">
                        <div className="col-2">
                            <button className="btn btn-danger"
                                type="button"
                                onClick={() => setShowPreferences(prev => !prev)}
                            >{!showPreferences ? "Show Preferences" : "Hide Preferences"}
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
            }

            {user.isAdmin && dashboard.brandsFromFavourites &&
                <>
                    <div className="row pt-4">
                        <div className="col fs-3 p-3 fw-bold border border-5"
                            style={{ background: 'orange', color: 'white' }}>
                            Brands
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Brands from Favourites
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.brandsFromFavourites.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Brands from Cart
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.brandsFromCart.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Brands from Orders
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.brandsFromOrders.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col fs-3 p-3 fw-bold border border-5"
                            style={{ background: 'orange', color: 'white' }}>
                            Categories
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Categories from Favourites
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.categoriesFromFavourites.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Categories from Cart
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.categoriesFromCart.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Categories from Orders
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.categoriesFromOrders.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col fs-3 p-3 fw-bold border border-5"
                            style={{ background: 'orange', color: 'white' }}>
                            Individual Categories
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Individual Categories from Favourites
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.individualCategoriesFromFavourites.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Individual Categories from Cart
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.individualCategoriesFromCart.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Individual Categories from Orders
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.individualCategoriesFromOrders.map(x =>
                                        <Fragment key={x.key}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white' }}
                                            >
                                                {x.value}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col fs-3 p-3 fw-bold border border-5"
                            style={{ background: 'orange', color: 'white' }}>
                            Users
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Users having most Favourites
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.mostFavouritedUsers.map(x =>
                                        <Fragment key={x.userId}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white', cursor: 'pointer' }}
                                                onClick={() => openUserDetails(x,'favourites')}
                                                >
                                                {x.fullName}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Users having most products in Cart
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.mostCartedUsers.map(x =>
                                        <Fragment key={x.userId}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white', cursor: 'pointer' }}
                                                onClick={() => openUserDetails(x,'cart')}
                                              >
                                                {x.fullName}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col fs-5 p-3 fw-bold border border-5"
                                    style={{ background: 'green', color: 'white' }}
                                >
                                    Users ordered most
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {dashboard.mostOrderedUsers.map(x =>
                                        <Fragment key={x.userId}>
                                            <div className="col fs-6 p-3 fw-bold border border-5"
                                                style={{ background: 'seagreen', color: 'white', cursor: 'pointer' }}
                                                onClick={() => openUserDetails(x,'orders')}
                                            >
                                                {x.fullName}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
