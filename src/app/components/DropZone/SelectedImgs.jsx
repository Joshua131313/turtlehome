import React from 'react';
import PropTypes from 'prop-types';

const SelectedImgs = props => {
    const {files, setFiles} = props


    const removeImg = (i) => {
        let temp = [...files]
        temp.splice(i, 1)
        setFiles(temp)
        console.log(temp)
    }

    return (
        <div className="selectedimgs">
        {
            props.files?.map((file, i)=> {
                if(file.isVideo) {
                    return (
                        <div className="imgcont">
                            <i className="fal fa-times appicon" onClick={()=> removeImg(i)}></i>
                            <video src={file.preview ?? file.downloadURL} alt="" controls={false}/>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="imgcont">
                            <i className="fal fa-times appicon" onClick={()=> removeImg(i)}></i>
                            <img src={file.preview ?? file.downloadURL ?? file.media} alt="" />
                        </div>
                    )
                }
            })
        }
        </div>
    );
};

SelectedImgs.propTypes = {
    
};

export default SelectedImgs;