import React from 'react';
import PropTypes from 'prop-types';
import { GetDayOfMonthAndShortMonthAndYear, GetDayOfWeek } from '../../utils/date';
import './Date.css'
const Date = props => {

    return (
        <div className='flexcol date'>
            <strong>{GetDayOfWeek()}</strong>
            <span>{GetDayOfMonthAndShortMonthAndYear()}</span>
        </div>
    );
};

Date.propTypes = {
    
};

export default Date;