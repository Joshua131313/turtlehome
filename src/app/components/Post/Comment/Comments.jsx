import React from 'react';
import PropTypes from 'prop-types';
import useGetPostComments from '../../../services/GetPostComments';
import Comment from './Comment';

const Comments = props => {
    const {post} = props
    const comments = useGetPostComments({post})
    const commentsrow = comments.map(comment=> {
        return (
            <Comment comment={comment} post={post}/>
        )
    })
    return (
       <>
           {comments.length !== 0 ? 
            <div className='commentsrow flexcol'>
                {commentsrow}
            </div>
            : ''}
        </>
    );
};

Comments.propTypes = {
    
};

export default Comments;