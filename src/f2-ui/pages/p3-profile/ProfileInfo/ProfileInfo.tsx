import React from 'react';
import {UserAvatar} from '../UserAvatar/UserAvatar';
import Button from '@mui/material/Button';


type ProfileInfoPropsType = {
    avatar?: string
    name: string
    editMode: boolean
    onClickChangeEditModeHandler: () => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({avatar, editMode, name, onClickChangeEditModeHandler}) => {

    const stDev: React.CSSProperties = {
        color: '#555',
        margin: '4px 0 10px 0',
    }

    const stName: React.CSSProperties = {
        fontWeight: '600',
        fontSize: '18px',
        lineHeight: '27px',
        color: '#2D2E46',
        margin: '6px 0',
        // textAlign: 'center', из-за родителя можно не выравнивать
    }

    return (
        <div style={{background: '#D9D9F1', padding: 24, textAlign: 'center'}}>
            <UserAvatar avatar={avatar} editMode={editMode}/>
            <div style={stName}>{name}</div>
            <div style={stDev}>Frontend developer</div>
            <div><Button variant={'outlined'} onClick={onClickChangeEditModeHandler}>Edit profile</Button>
            </div>
        </div>
    );
};
