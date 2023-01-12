import style from './Image.module.css'

export const Image = ({ src }) => {
  return <img src={src} alt='Banner' className={style.roundCorners} />
}
