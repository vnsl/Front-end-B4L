import React from 'react';
import './index.css';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {

    return (
        <div className='loading'>
            <CircularProgress color="primary"/>
        </div>
    );
}
