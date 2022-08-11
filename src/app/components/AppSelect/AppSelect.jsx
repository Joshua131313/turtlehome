import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
const AppSelect = props => {
    const {options, placeholder, setValue, value} = props
    return (
        <Select  defaultValue={value} onChange={(e)=> setValue(e.value)} placeholder={placeholder} options={options} className='countryselect appselect'/>

    );
};

AppSelect.propTypes = {
    
};

export default AppSelect;