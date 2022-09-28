import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../containers/Layout/Layout';
import { AppInput } from '../../components/AppInput/AppInput';
import { useSearchUsers } from '../../services/SearchUsers';
import FriendCard from './FriendCard';
import useGetFriends from '../../services/GetFriends';

const AddFriends = props => {
    const [searchName, setSearchName] = useState('')
    const users = useSearchUsers({search: searchName})
    let friends = useGetFriends()
    const usersRender = users?.map(user=> {
        return (
            <FriendCard user={user} friends={friends} key={user.uid}/>
        )
    })
    return (
        <div  className='addfriends' >
            <h3>Search Users</h3>
            <AppInput value={searchName} setValue={setSearchName} removeText placeholder={'Search by name...'} />
            <div className="searchusersrow">
                {usersRender}
            </div>
        </div>
    );
};

AddFriends.propTypes = {
    
};

export default AddFriends;