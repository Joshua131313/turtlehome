import React from 'react';
import PropTypes from 'prop-types';
import './Friends.css'
import Layout from '../../containers/Layout/Layout';
import Tabs from '../../components/Tabs/Tabs';
import { Outlet } from 'react-router-dom';

const Friends = props => {
    let tabs = [
        {
            link: '',
            text: 'Friends',
        },
        {
            link: 'friend-requests',
            text: 'Friend Request',
        },
        {
            link: 'blocked-friends',
            text: 'Blocked Friends',
        },

    ]
    return (
        <Layout btnText='Add Friend' btnLink='add-friends' title='Manage Friends' className='friends'>
            <Tabs tabs={tabs} />
            <Outlet />
        </Layout>
    );
};

Friends.propTypes = {
    
};

export default Friends;