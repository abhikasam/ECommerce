import { Route, Switch } from "react-router-dom";
import Register from "./auth/register/register";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Login from "./auth/login/login";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import NotFound from "./components/NotFound";
import Products from "./products/products";

function AppRoutes() {

    const { isAuthenticated, user } = useSelector(state => state.auth)

    return (
        <>
            <Route exact path='/' component={Home} />
            <Route path={'/(.+)'} render={() => (
                <Switch>
                    <Route path="/fetch-data" component={FetchData} />
                    <Route path='/login' component={Login} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/register' component={Register} />
                    {isAuthenticated && user.isAdmin && <Route path='/products' component={Products} />}
                    <Route component={NotFound} />
                </Switch>
            )} />
        </>
        )
}

export default AppRoutes;
