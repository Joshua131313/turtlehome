import React from 'react';
import PropTypes from 'prop-types';
import Friends from './Friends';
import AddFriends from './AddFriends';
import { Route, Routes } from 'react-router-dom';
import FriendRequests from './FriendRequests';
import FriendsRender from './FriendsRender';
import BlockedUsers from './BlockedUsers';

const FriendsRoutes = props => {
    return (
        <Routes>
            <Route element={<Friends />}>
                <Route index element={<FriendsRender />} />
                <Route path='friend-requests' element={<FriendRequests />} />
                <Route path='blocked-friends' element={<BlockedUsers />} />
                <Route path='add-friends' element={<AddFriends />} />
            </Route>
        </Routes>
    );
};

FriendsRoutes.propTypes = {
    
};

export default FriendsRoutes;