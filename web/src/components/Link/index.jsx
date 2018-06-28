// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import { link, navLink } from './link.css';

type LinkProps = {
    to: string,
    children: string,
};

export default ({ to, children, ...rest }: LinkProps) => (
    <Link to={to} className={link} {...rest}>
        {children}
    </Link>
);

export function NavLink(props: any) {
    return <Link {...props} className={navLink} />;
}
