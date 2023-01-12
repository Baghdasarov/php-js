import { Image } from 'components/Image'
import { ERRORS, REFETCH_INTERVAL, STATUSES } from 'consts'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  addView,
  getViewCount,
  getRandomImageId,
  isValidImageURL
} from 'services'
import style from './ImageContainer.module.css'

export const ImageContainer= () => {
  const [status, setStatus] = useState(STATUSES.loading)
  const [src, setSrc] = useState(null)
  const [imgViewCount, setImgViewCount] = useState(0)

  const updateViewCount = useCallback(async (id) => {
    const viewCount = await getViewCount(id)
    setImgViewCount(viewCount)
  }, [])

  useEffect(() => {
    let intervalId;

    const asyncFunc = async () => {
      try {
        const randomId = await getRandomImageId()
        const res = isValidImageURL(randomId)
        setSrc(res.src)
        setStatus(STATUSES.succeeded)

        if (res.isValid) {
          await addView(randomId)
          updateViewCount(randomId)
          intervalId = setInterval(() => {
            updateViewCount(randomId)
          }, REFETCH_INTERVAL)
        } else {
          toast.error(ERRORS.imageNotAvailable)
        }
      } catch (_) {
        setStatus(STATUSES.failed)
        toast.error(ERRORS.general)
      }
    }

    asyncFunc()

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={style.container}>
      {status === STATUSES.loading && (
        <div className={style.loading_message}>Loading...</div>
      )}
      {status === STATUSES.succeeded && (
        <>
          <Image src={src} />
          <p className={style.view_count}>View Count: {imgViewCount}</p>
        </>
      )}
    </div>
  )
}
