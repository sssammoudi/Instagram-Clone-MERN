
export const PostNotify = ({msg}) => {
  fetch("/notify", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": "Bearer "+localStorage.getItem("jwt")
    },
    body: JSON.stringify({
      msg: msg
    })
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
  })
  console.log(msg)
}
