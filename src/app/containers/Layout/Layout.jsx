import React from 'react';
import PropTypes from 'prop-types';
import AppBtn from '../../components/AppBtn/AppBtn';
import './Layout.css'
import { Link } from 'react-router-dom';

const Layout = props => {
    const {className, title, btnText, onClick, btnLink, noBtn} = props
    return (
        <div className={`layout flexcol ${props.className}`}>
            <div className="titlebar flexrow sb">
                <h2>{title}</h2>
               {noBtn? '' :
                btnLink ?
                <Link to={btnLink}>
                     <AppBtn text={btnText} onClick={()=> onClick()} />
                </Link>
                : 
                <AppBtn text={btnText} onClick={()=> onClick()} />
               }
            </div>
            {props.children}
        </div>
    );
};

Layout.propTypes = {
    
};

export default Layout;