import React from "react";
import auth from "../../logic/auth/auth";
import {routes} from "../../RouterRoot";
import {apiHostUrl} from "../../logic/api";

interface Props {
}

const HomeView: React.FC<Props> = () => {
    return <div className={"home"}>
        <h1>Car</h1>
        {!auth.isLoggedIn ? null :
            <p>
                <a href={routes.Dashboard.path}>Dashboard</a>
            </p>
        }

        <p>
            {!auth.isLoggedIn ?
                <a href={`${apiHostUrl}/login`}>Log in</a> :
                <a href={`${apiHostUrl}/logout`}>Log out</a>
            }
        </p>
    </div>;
};

export default HomeView;
