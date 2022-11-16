import React from 'react';
import PropTypes from 'prop-types';

const EmptyBox = props => {
    return (
        <div className='emptybox'>
            No active chats
        </div>
    );
};

EmptyBox.propTypes = {
    
};

export default EmptyBox;