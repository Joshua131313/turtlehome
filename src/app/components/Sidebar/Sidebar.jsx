import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css'
import { sideBarLinks } from '../../data/Array';
import { Link, NavLink } from 'react-router-dom';
import ImgLoaded from '../Imgloaded/Imgloaded';
import { User } from '../User/User';
import Envelope from '../../containers/Envelope/Envelope';
import { handleLogout } from '../../services/DBFunctions';

const Sidebar = props => {
    const sidebarlinksrow = sideBarLinks.map(link=> {
        return (
            <NavLink to={`/${link.link}`} className={({isActive})=> "sidebarlink" + (isActive ? ' activelink':'')}>
                <i className={`fal fa-${link.icon}`}></i>
                <span>{link.text}</span>
            </NavLink>
        )
    })
    return (
        <div className='sidebar'>
            <Envelope className="sidebarcont">
                <User isLink/>
                <div className="icons">
                    <i className='fal fa-home  appicon'></i>
                    <i className='fal fa-sign-out  appicon' onClick={()=> handleLogout()}></i>
                    <i className='fal fa-cog  appicon'></i>
                    <i className='fal fa-bell  appicon'></i>

                </div>
            </Envelope>
            <Envelope className="sidebarlinksrow flexcol">
                {sidebarlinksrow}
            </Envelope>
            <Envelope className="notificationspreview">
                <div className="titlebar flexrow">
                 <h3>Notifications</h3>
                 <i className="appicon fal fa-envelope"></i>
                </div>
                <div className="notificationsrow">
                    <div className="notificationcard">
                        
                    </div>
                    <div className="notificationcard">

                    </div>
                    <div className="notificationcard">

                    </div>
                </div>
            </Envelope>
        </div>
    );
};

Sidebar.propTypes = {
    
};

export default Sidebar;