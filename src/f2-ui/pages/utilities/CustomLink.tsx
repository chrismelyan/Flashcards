import React, {FC} from 'react';
import {Link, useMatch} from "react-router-dom";
type PropsType = {
    to: string,
    children: string
}
export const CustomLink: FC<PropsType> = (props) => {
    const match = useMatch(props.to)

    return (
        <Link {...props}
              style={{
                  color: match ? '#43C6AC' : '#F8FFAE'
              }}
              to={props.to} >
            {props.children}
        </Link>
    );
};

