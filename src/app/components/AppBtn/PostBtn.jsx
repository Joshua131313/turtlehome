import React from 'react';
import PropTypes from 'prop-types';
import AppBtn from './AppBtn';

const PostBtn = props => {
    const {value, onClick, text='Post', loading} = props 
    return (
        <AppBtn text={text} disabled={!value?.length || loading} loading={loading} onClick={()=> onClick()} icon='fal fa-paper-plane'/>
    );
};

PostBtn.propTypes = {
    
};

export default PostBtn;