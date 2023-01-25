import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import './LoadingOverlay.sass';

interface Props {
    isLoading?: boolean
    absolutePositioning?: boolean
    text?: string
    title?: string
    backgroundColor?: string
}

const LoadingOverlay: React.FC<Props> = ({
                                             isLoading,
                                             absolutePositioning,
                                             text,
                                             title,
                                             backgroundColor
                                         }) => {
    if (isLoading === false) return null;

    return <div className={`LoadingOverlay ${absolutePositioning ? "absolute" : ""}`}
                style={{
                    backgroundColor: backgroundColor != null ? backgroundColor : undefined
                }}>
        <div className={"content"}>
            <FontAwesomeIcon icon={faSpinner} title={title}/>
            <div className={"text"}>
                {text}
            </div>
        </div>
    </div>;
};

export default LoadingOverlay;
