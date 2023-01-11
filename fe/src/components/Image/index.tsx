import { FC } from 'react'
import style from './Image.module.css'

type TImageProps = {
  src: string
}

export const Image: FC<TImageProps> = ({ src }) => {
  return <img src={src} alt='Banner' className={style.roundCorners} />
}
