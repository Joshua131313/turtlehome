import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const DynamicLayout = props => {
    const {bodyClassName, className} = props

    useEffect(()=> {
        document.body.classList.add(bodyClassName)

        return ()=> {
            document.body.classList.remove(bodyClassName)
        }
    }, [])

    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

DynamicLayout.propTypes = {
    
};

export default DynamicLayout;