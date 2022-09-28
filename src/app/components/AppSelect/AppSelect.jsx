import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Dropdown from '../Dropdown/Dropdown';
import AppBtn from '../AppBtn/AppBtn';
const AppSelect = props => {
    const {options, setValue, value, text} = props
    const [openID, setOpenID] = useState('')
    return (
        <Dropdown id={1} openID={openID} setOpenID={setOpenID}  options={options}>
            <AppBtn text={text} />
        </Dropdown>
    );
};

AppSelect.propTypes = {
    
};

export default AppSelect;