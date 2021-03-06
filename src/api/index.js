import axios from 'axios'
import storage from '../utils/storage'

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api';
  // axios.defaults.baseURL = 'http://127.0.0.1:3000';
} else {
  axios.defaults.baseURL = 'http://139.159.235.194:3000';
}

export default {
  uploadFile(auth, files) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      Array.prototype.forEach.call(files, (file, index) => {
        formData.append("file" + index, file, file.name);
      })
      for (let key in auth) {
        formData.append(key, auth[key])
      }
      console.log(formData)
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios.post("/upload", formData, config).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  getImageList(auth) {
    return new Promise((resolve, reject) => {
      axios.post("/imageList", {
        accessKey: auth.accessKey,
        secretKey: auth.secretKey,
        bucket: auth.bucket,
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  deleteImage(obj) {
    return new Promise((resolve, reject) => {
      axios.post("/image/delete", {
        accessKey: obj.accessKey,
        secretKey: obj.secretKey,
        bucket: obj.bucket,
        fileName: obj.fileName
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  uploadFetchUrl(obj) {
    return new Promise((resolve, reject) => {
      axios.post("/upload/fetch", {
        accessKey: obj.accessKey,
        secretKey: obj.secretKey,
        bucket: obj.bucket,
        fetchUrl: obj.fetchUrl
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  }
}
