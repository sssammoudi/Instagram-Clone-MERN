import React from 'react'

const CreatePost = () => {
  return (
    <div className="card input-filled  black CreatePost-Card">
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
      />
      <input
        type="text"
        placeholder="body"
      />
      <div class="file-field input-field">
        <div class="btn blue darken-1">
          <span>Upload Image</span>
          <input type="file" />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn blue darken-1">Post</button>
    </div>
  )
}

export default CreatePost
