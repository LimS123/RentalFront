import { BrowserRouter as Router, Routes as Switch , Route } from 'react-router-dom'
import React, {FC} from 'react'
import { routes } from './list'
import Layout from '../layout/layout';

const Routes: FC = () => {

    const isAuth = true;

    return (
        <Router>
            <Switch>
                {routes.map(route => {
                    if(route.auth && !isAuth) {
                        return false
                    }

                    return (
                        <Route
                            path={route.path}
                            key={`route ${route.path}`}
                            element={
                                <Layout>
                                    <route.element/>
                                </Layout>
                            }
                        />
                    )
                })}
            </Switch>
        </Router>
    )
}

export default Routes 