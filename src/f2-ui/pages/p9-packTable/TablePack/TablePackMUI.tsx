import {Button, ButtonProps, styled} from "@mui/material";

export const ButtonCP = styled(Button)<ButtonProps>(() => ({
    backgroundColor: '#33b198',
    color: '#fff',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    transition: '.3s',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#33b198',
        opacity: '0.85',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    },
    '&:disabled': {
        background: '#d9d9d9',
        color: '#858585',
        boxShadow: 'none'
    }
}))

export const styleTHead = {
    background: '#2c2b3f',
    // background: 'rgb(109,106,153, 0.8)',
    'th': {color: '#fff', fontWeight: 'bold'},
    'th: nth-of-type(6)': {width: '268px'}
}

export const styleTd = {
    '&:last-child td, &:last-child th': {border: 0},
    '&:nth-of-type(even)': {background: ' #F8F7FD'}
}

export const styleAlignCell = {
    '& :not(:first-of-type)': {textAlign: 'left'}
}

export const styleActiveLabel = {
    color: '#fff !important',
    '& svg': {color: '#fff !important'}
}