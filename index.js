const imageContainer = document.getElementById('image');
const baseURL = 'http://localhost:3000/api/users';

const imageRequest = axios.get(
  `${baseURL}/avatars/6387911fb2a9dd8a8104b037_apple-ge981c405b_1280.jpg`
);

imageRequest
  .then(({ data }) => {
    const imageElements = `<img src='${baseURL}/${data.avatarURL}'/>`;
    imageContainer.insertAdjacentHTML('beforeend', imageElements);
  })
  .catch(error => console.log(error.message));
