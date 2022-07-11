import React, {FC} from 'react';
import {Link, useMatch} from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import InterestsIcon from '@mui/icons-material/Interests';

type PropsType = {
    to: string,
    children: string
}
export const CustomLink: FC<PropsType> = (props) => {
    const match = useMatch(props.to)
    return (
        <Link  {...props}
               style={{
                   display: "flex",
                   justifyContent: 'center',
                   alignItems: 'center',
                   fontSize: '25px',
                   color: match ? '#F8FFAE' : '#43C6AC'
               }}
               to={props.to} >
            {props.to === "/" && <PermIdentityIcon style={{margin: '0 10px'}} fontSize={"large"}/>}
            {props.to === "pack-table" && <InterestsIcon style={{margin: '0 10px'}} fontSize={"large"} />}
            {props.children}
        </Link>
    );
};


