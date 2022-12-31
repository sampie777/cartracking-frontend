import React, {useState} from "react";
import './ErrorBoundary.sass';

interface Props {
    children: React.ReactNode
}

const ErrorBoundary: React.FC<Props> = ({children}) => {
    const [error, setError] = useState<any | undefined>();

    if (error === undefined) {
        try {
            return <>{children}</>;
        } catch (e: any) {
            console.error("Error boundary caught error", e);
            setError(e);
        }
    }

    return <div className={"ErrorBoundary"}>
        <h1>Whoops, something went wrong</h1>
        <div className={"deathFace"}>X_x</div>

        <details style={{whiteSpace: 'pre-wrap'}}>
            <div className={"errorName"}>{error && error.toString()}</div>

            <div className={"code"}>
                {(error as Error).stack?.trim().split('\n').map((it, i) =>
                    <div className={"line"}>
                        <span className={"lineIndex"}>{i + 1}</span>
                        {it}
                    </div>)}
            </div>
        </details>
    </div>;
};

export default ErrorBoundary;
