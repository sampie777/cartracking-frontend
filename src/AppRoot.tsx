import React, {useEffect, useState} from 'react';
import RouterRoot from "./RouterRoot";
import auth, {authGetUserInfo} from "./logic/auth/auth";
import LoadingOverlay from "./gui/components/LoadingOverlay";
import ErrorBoundary from "./gui/components/ErrorBoundary";
import './style.sass';

const AppRoot = () => {
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        loadAuth();
    }, []);

    const loadAuth = () => {
        if (auth.isLoggedIn !== undefined) {
            setIsAuthLoaded(true);
            return;
        }

        authGetUserInfo()
            .then(() => setIsAuthLoaded(true));
    }

    if (!isAuthLoaded) {
        return <LoadingOverlay backgroundColor={"#ffffff00"}/>;
    }

    return <ErrorBoundary>
        <RouterRoot/>
    </ErrorBoundary>;
}

export default AppRoot;
