import axios from 'axios'
import { API } from 'configs/api'


export const getRandomImageId = () => {
  return axios
    .get(API.getImageId)
    .then((res) => res.data.image_id)
}

export const addView = (image_id) => {
  return axios.post(API.addView, {
    image_id,
  })
}

export const getViewCount = (image_id) => {
  return axios
    .get(API.getViewCount, {
      params: {
        image_id,
      },
    })
    .then((res) => res.data.total_viewer_count)
}

export const isValidImageURL = (id) => {
  let imageSrc
  try {
    imageSrc = require(`assets/${id}.jpg`)
    return { isValid: true, src: imageSrc }
  } catch (_) {
    imageSrc = require(`assets/empty.jpg`)
    return { isValid: false, src: imageSrc }
  }
}
