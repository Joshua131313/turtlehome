import React from 'react';
import PropTypes from 'prop-types';
import AppSelect from '../../components/AppSelect/AppSelect';

const Layout = props => {
    const {title, subTitle, options, className, length} = props
    return (
        <div className={`friendslayout ${className}`}>
        <div className="flexrow sb">
            <div className="flexcol title">
                 <h3>{title}</h3>
                 {subTitle && <span>{subTitle} ({length})</span>}
            </div>
           
            {options && <AppSelect text='Filters' options={options} />}
        </div>
        {props.children}
    </div>
    );
};

Layout.propTypes = {
    
};

export default Layout;