import React from 'react'

function Chat() {
  return (
    <div className="message d-flex">
      <div className="col-md-4 border-right px-0">
        <form className="message_header">
          <input type="text" placeholder="Enter to Search..." value=""/>
          <button type="submit">Search</button>
        </form>
        <div className="message_chat_list">
          <button style={{opacity: 0}}>Load More</button>
        </div>
      </div>
      <div className="col-md-8 px-0 right_mess">
        <div className="d-flex justify-content-center  align-items-center flex-column h-100">
          <i className="fab fa-facebook-messenger text-primary" style={{fontSize: "5rem"}}></i>
          <h4>Messenger</h4>
        </div>
      </div>
    </div>
  )
}

export default Chat
