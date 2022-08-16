import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../../components/Navbar/Navbar';
import HomeRoutes from './HomeRoutes';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import './Home.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import RightBar from '../../components/RightBar/RightBar';

const Home = props => {
    return (
        <div className='home'>
            <Navbar />
            <div className="gridlayout">
                <Sidebar />
                <div className="appcontent">
                <Outlet />
                </div>
                <RightBar />
            </div>
        </div>
    );
};

Home.propTypes = {
    
};

export default Home;