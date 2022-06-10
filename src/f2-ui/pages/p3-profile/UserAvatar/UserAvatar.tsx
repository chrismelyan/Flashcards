import React from 'react';
import userAvatar from '../assets/user.png';
import {IconButton} from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

import styles from './UserAvatar.module.css';


export type UserAvatarPropsType = {
    avatar?: string
    editMode: boolean
}

export const UserAvatar: React.FC<UserAvatarPropsType> = ({avatar, editMode}) => {
    return (
        <div className={styles.userPhotoWrapper}>
            <div className={styles.userPhoto}>

                <div className={styles.userPhotoInner}>
                    <img src={avatar && avatar !== ' ' ? avatar : userAvatar} alt={'user'}/>
                </div>

                {editMode &&
                    <IconButton className={styles.svgPosition} size={'small'}>
                        <PhotoCameraOutlinedIcon/>
                    </IconButton>
                }

            </div>
        </div>
    );
};