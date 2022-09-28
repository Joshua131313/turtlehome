import React from 'react';
import PropTypes from 'prop-types';
import { useGetUserInfo } from '../../services/GetUserInfo';
import './User.css'
import ImgLoaded from '../Imgloaded/Imgloaded';

const AppUser = props => {
    const {showImg=true, showText=true} = props 
    const userInfo = useGetUserInfo(props.userid) 
    return (
        <div  className="user flexrow ac gap-5" >
            {showImg && <ImgLoaded img={userInfo?.userinfo?.profilePic}/>}
             {showText && <div className="flexcol">
                 <span>{userInfo?.name}</span>
                 {props.children}
             </div>} 
        </div>
    );
};

AppUser.propTypes = {
    
};

export default AppUser;