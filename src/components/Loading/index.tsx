import {useState} from 'react';
import './Loading.scss';

interface LoadingProps {
    visible: boolean;
}

export default function Loading(props: LoadingProps) {
    const [show] = useState(props.visible);

    return (
        <div className="loading-box" style={{display: show ? 'flex' : 'none'}}>
            <div className="loading-box-bg"/>
            <div className="loading-box-inner">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
}