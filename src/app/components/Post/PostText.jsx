import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { games } from "../../utils/general";

const PostText = (props) => {
  const { post } = props;
  const mention = /@apps_\w+/g;
  const text = post?.postContent?.text
  const splitted = text?.split(mention);
  const mentions = text?.match(mention);

  // const postText = splitted.flatMap((text, index) =>{
 
  // }
  
  // );
  const postText = splitted?.map((text, index)=> {
    let game = mentions?.[index]?.slice(
      "@apps_".length
    )
    let El = games.includes(game) ? Link : 'span'
    return (
      (index < mentions?.length)
      ? [
          text,
          <El
            to={'/apps/'+mentions[index].slice(
                "@apps_".length
              )}
          >
            {mentions[index]}
          </El>,
        ]
      : [text]
    )
  })
  console.log(postText)

  return <div className="posttext">{postText}</div>;
};

PostText.propTypes = {};

export default PostText;
