import { Route, Switch } from "react-router-dom";
import Register from "./auth/register/register";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Login from "./auth/login/login";

function AppRoutes() {
    return (
        <>
            <Route exact path='/' component={Home} />
            <Route path={'/(.+)'} render={() => (
                <Switch>
                    <Route path="/fetch-data" component={FetchData} />
                    <Route path='/login' component={Login} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/register' component={Register} />
                </Switch>
            )} />
        </>
        )
}

export default AppRoutes;
