
import { Route, Switch } from "react-router-dom";
import Register from "./auth/register/register";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Login from "./auth/login/login";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import NotFound from "./components/NotFound";
import Products from "./products/products";
import Favourites from "./products/favourites";
import ProductDetails from "./products/product-details";
import EditProduct from "./products/product-edit";
import Cart from "./products/cart";
import HomeAuthorized from "./components/HomeAuthorized";
import ConfirmOrder from "./products/confirm-order";

function AppRoutes() {

    const { isAuthenticated, user } = useSelector(state => state.auth)

    return (
        <>
            {!isAuthenticated && <Route exact path='/' component={Home} />}
            {isAuthenticated && <Route exact path="/" component={HomeAuthorized} />}
            <Route path={'/(.+)'} render={() => (
                <Switch>
                    <Route path="/fetch-data" component={FetchData} />
                    <Route path='/login' component={Login} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/register' component={Register} />
                    {isAuthenticated && <Route path='/products' component={Products} />}
                    {isAuthenticated && <Route path='/product-details' component={ProductDetails} />}
                    {isAuthenticated && !user.isAdmin && <Route path='/favourites' component={Favourites} />}
                    {isAuthenticated && user.isAdmin && <Route path='/product-edit' component={EditProduct} />}
                    {isAuthenticated && !user.isAdmin && <Route path="/cart" component={Cart} />}
                    {isAuthenticated && !user.isAdmin && <Route path="/confirm-order" component={ConfirmOrder} />}
                    <Route component={NotFound} />
                </Switch>
            )} />
        </>
        )
}

export default AppRoutes;
