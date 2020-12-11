import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    //To check the current user is logged in

    const { currentUser } = useContext(AuthContext);


    return (
        <Route
            {...rest}
            render={(routeProps) =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Redirect to={'signin'} />
                    )
            }
        />
    );
};
// If it a current user pass the props along
export default PrivateRoute;