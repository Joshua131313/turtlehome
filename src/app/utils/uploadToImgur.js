import axios from "axios"

export function uploadImgur(e, setImg) {
  let file = e.target.files[0]
  console.log('')
  const data = new FormData()
  data.append("image", file)
  const config = {
    headers: {
      Authorization: "Client-ID b2683e97287b24b",
    },
  }
  axios.post("https://api.imgur.com/3/image/", data, config).then((res) => {
    setImg(res.data.data.link)
  }).catch(err => {
    console.log(err)
  })

}