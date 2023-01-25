import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import './RoundIconButton.sass';

interface Props {
    icon: IconProp
    overlayIcon?: IconProp
    label?: string
}

const RoundIconButton: React.FC<Props & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
    const {overlayIcon, ...buttonProps} = props;
    return <button {...buttonProps} className={"RoundIconButton"}>
        {props.label === undefined ? undefined : <span className={"label"}>{props.label}</span>}
        {props.overlayIcon === undefined ? undefined :
            <FontAwesomeIcon icon={props.overlayIcon} className={"overlay"}/>}
        <FontAwesomeIcon icon={props.icon}/>
    </button>;
};

export default RoundIconButton;
