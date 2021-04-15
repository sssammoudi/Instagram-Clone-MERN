export const GetNotify = (setNotifs, notifs) => {
  fetch("/getNotify", {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      "Authorization": "Bearer "+localStorage.getItem("jwt")
    },
  })
  .then(res => res.json())
  .then(res => {
    setNotifs(res.notification)
    console.log(notifs)
  })
}