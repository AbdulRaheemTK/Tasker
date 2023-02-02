export const imageUpload = (pics) => {
  const data = new FormData();
  data.append("file", pics);
  data.append("upload_preset", "Tasker");
  data.append("cloud_name", "raheemcloud");
  return fetch("https://api.cloudinary.com/v1_1/raheemcloud/image/upload", {
    method: "post",
    body: data,
  }).then((response) => {
    return response
      .json()
      .then((data) => {
        return data.url.toString();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
