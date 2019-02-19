import React, {Component} from 'react';
import PeoplePage from './pages/People';
import Page404 from './pages/Page404';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import PeopleDetailPage from './pages/People/details';
import WelcomePage from './pages/WelcomePage'
class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Redirect
                        path="/"
                        to="/people"
                        exact
                    />
                    <Route
                        path="/"
                        component={WelcomePage}
                        exact
                    />
                    <Route
                        path="/people"
                        component={PeoplePage}
                        exact
                    />
                    <Route
                        path="/people/:id"
                        component={PeopleDetailPage}
                        exact
                    />
                    <Route
                        path="/people/:id/edit"
                        component={PeopleDetailPage}
                        exact
                    />
                    <Route
                        component={Page404}
                        path="/404"
                        exact
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
