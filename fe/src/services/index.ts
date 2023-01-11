import axios from 'axios'
import { API } from 'configs/api'

type TGetRandomImageIdResponse = { image_id: number }
type TGetViewCountResponse = { image_id: string; total_viewer_count: number }

export const getRandomImageId = () => {
  return axios
    .get<TGetRandomImageIdResponse>(API.GET_IMAGE_ID)
    .then((res) => res.data.image_id)
}

export const addView = (image_id: number) => {
  return axios.post(API.ADD_VIEW, {
    image_id,
  })
}

export const getViewCount = (image_id: number) => {
  return axios
    .get<TGetViewCountResponse>(API.GET_VIEW_COUNT, {
      params: {
        image_id,
      },
    })
    .then((res) => res.data.total_viewer_count)
}

export const isValidImageURL = (id: number) => {
  let imageSrc
  try {
    imageSrc = require(`assets/${id}.jpg`)
    return { isValid: true, src: imageSrc }
  } catch (_) {
    imageSrc = require(`assets/empty.jpg`)
    return { isValid: false, src: imageSrc }
  }
}
