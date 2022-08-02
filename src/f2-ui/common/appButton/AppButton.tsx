import React from 'react';
import Button from '@mui/material/Button';

type AppButtonPropsType = {
    callback: () => void
    title: string
}

const AppButton = (props: AppButtonPropsType) => {
    return (
        <div style={{textAlign: 'center', margin: '10px 0'}}>
            <Button variant={'contained'} onClick={props.callback}>{props.title}</Button>
        </div>
    );
};

export default AppButton;