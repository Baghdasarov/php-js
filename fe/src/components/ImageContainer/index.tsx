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

export const ImageContainer: React.FunctionComponent<any> = () => {
  const [status, setStatus] = useState<STATUSES>(STATUSES.LOADING)
  const [src, setSrc] = useState<string | null>(null)
  const [imgViewCount, setImgViewCount] = useState(0)

  const updateViewCount = useCallback(async (id: number) => {
    const viewCount = await getViewCount(id)
    setImgViewCount(viewCount)
  }, [])

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>

    const asyncFunc = async () => {
      try {
        const randomId = await getRandomImageId()
        const res = isValidImageURL(randomId)
        setSrc(res.src)
        setStatus(STATUSES.SUCCEEDED)

        if (res.isValid) {
          await addView(randomId)
          updateViewCount(randomId)
          intervalId = setInterval(() => {
            updateViewCount(randomId)
          }, REFETCH_INTERVAL)
        } else {
          toast.error(ERRORS.IMAGE_NOT_AVAILABLE)
        }
      } catch (_) {
        setStatus(STATUSES.FAILED)
        toast.error(ERRORS.GENERAL)
      }
    }

    asyncFunc()

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={style.container}>
      {status === STATUSES.LOADING && (
        <div className={style.loading_message}>Loading...</div>
      )}
      {status === STATUSES.SUCCEEDED && (
        <>
          <Image src={src!} />
          <p className={style.view_count}>View Count: {imgViewCount}</p>
        </>
      )}
    </div>
  )
}
