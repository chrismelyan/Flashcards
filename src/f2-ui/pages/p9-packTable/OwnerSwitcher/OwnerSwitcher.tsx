import styles from './OwnerSwitcher.module.css'

import React from 'react';
import {useAppDispatch} from '../../../bll/store/store';
import {setMinMaxSort, setPackOwner, setSearchPackName} from '../../../bll/reducers/pack-reducer';


type OwnerSwitcherPropsType = {
    owner: 'all' | 'my'
}

export const OwnerSwitcher: React.FC<OwnerSwitcherPropsType> = ({owner}) => {
    const dispatch = useAppDispatch()

    const setOwnerHandler = (owner: 'all' | 'my') => {
        dispatch(setPackOwner(owner))
        dispatch(setMinMaxSort([0, 0]))
        dispatch(setSearchPackName(''))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.option}>
                Show packs cards
            </div>
            <div className={styles.owner}>
                <div className={owner === 'my' ? `${styles.ownerBtn} ${styles.activeOwner}` : styles.ownerBtn}
                     onClick={() => setOwnerHandler('my')}>My
                </div>
                <div className={owner === 'all' ? `${styles.ownerBtn} ${styles.activeOwner}` : styles.ownerBtn}
                     onClick={() => setOwnerHandler('all')}>All
                </div>
            </div>
        </div>
    );
};
