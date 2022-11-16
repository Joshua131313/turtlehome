import React from 'react';
import PropTypes from 'prop-types';
import AppBtn from '../../components/AppBtn/AppBtn';
import './Layout.css'
import { Link, useNavigate } from 'react-router-dom';

const Layout = props => {
    const {className, title, btnText, onClick, btnLink, noBtn, backBtn} = props
    const navigate = useNavigate()
    return (
        <div className={`layout flexcol ${props.className}`}>
            <div className="titlebar flexrow sb">
                <h2 className={`flexcol ${backBtn ? 'backbtntitle' : ''}`}>
                    {backBtn && <AppBtn text='Go back' icon='fal fa-long-arrow-left' onClick={()=> navigate(-1)}/>}
                    {title}
                </h2>
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