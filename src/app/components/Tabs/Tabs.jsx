import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Tabs.css'

const Tabs = props => {
    const {tabs} = props

    const tabsRender = tabs?.map(tab=> {
        return (
            <NavLink end to={tab.link}  className={({isActive})=> "tablink" + (isActive ? ' activetablink':'')}>
                {tab.text}
            </NavLink>
        )
    })

    return (
        <div className='tabs flexrow'>
            {tabsRender}
         </div>
    );
};

Tabs.propTypes = {
    
};

export default Tabs;