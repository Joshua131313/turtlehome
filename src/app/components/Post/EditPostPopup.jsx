import React from "react";
import PropTypes from "prop-types";
import Popup from "../Popup/Popup";
import TextArea from "../AppInput/TextArea";
import Envelope from "../../containers/Envelope/Envelope";
import { User } from "../User/User";
import PostBtn from "../AppBtn/PostBtn";
import SelectedImgs from "../DropZone/SelectedImgs";
import UploadMedia from "../AppBtn/UploadMedia";

const EditPostPopup = (props) => {
  const {
    showEditPost,
    setShowEditPost,
    setEditedPostContent,
    editedPostContent,
    editedPostMedia,
    setEditedPostMedia,
    updatePost
  } = props;
  console.log(editedPostMedia)

  return (
    <Popup
      popupClassName="editmodal"
      visible={showEditPost}
      setVisible={setShowEditPost}
    >
      <Envelope className="createpostcontrols">
        <div className="titlebar">
          <h3>Edit Post</h3>
          <i className="fal fa-edit"></i>
        </div>
        <div className="textareacontent">
          <User showName={false} />
          <TextArea
            className="feedtextarea"
            placeholder="What's on your mind?"
            value={editedPostContent}
            onChange={(e) => {setEditedPostContent(e.target.value)}}
          />
        </div>

        <div className="selectmedia sb flexrow">
          <UploadMedia files={editedPostMedia} setFiles={setEditedPostMedia} />
          <PostBtn
            text="Update post"
            icon="fal fa-edit"
            value={editedPostContent}
            loading={false}
            onClick={()=> {updatePost(editedPostMedia); setShowEditPost(false)}}
          />
        </div>
        <SelectedImgs files={editedPostMedia} setFiles={setEditedPostMedia} />
      </Envelope>
    </Popup>
  );
};

EditPostPopup.propTypes = {};

export default EditPostPopup;
