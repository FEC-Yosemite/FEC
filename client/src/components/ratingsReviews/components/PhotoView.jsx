import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const PhotoView = ({ url, close }) => {
  return(
    <div id='photo-view'>
      <button id='close-expanded' onClick={ close }><FontAwesomeIcon id='close-expanded' icon={ faArrowLeft } size='2x'></FontAwesomeIcon></button>
      <div id='photo-container'>
        <span className='helper'></span>
        <img id='expanded-image' alt='user submitted image' src={ url }></img>
      </div>
    </div>
  )
}

export default PhotoView;