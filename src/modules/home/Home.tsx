import React, { Fragment, useEffect, useState } from 'react'

import styles from './Home.module.scss'
import { Slider } from '../../components';

import image3 from '../../assets/images_pby/Home/3.jpg'
import image6 from '../../assets/images_pby/Home/6.jpg'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ReactPlayer from 'react-player'
import { connect } from 'react-redux'

function Home(props) {

  let { articles } = props

  const [itemsHomeBanner, setItemsHomeBanner] = useState<any[]>([])
  const [itemsDestacado, setItemsDestacado] = useState<any[]>([])
  const [itemContenido, setItemContenido] = useState<any>({})

  useEffect(() => {
    if (articles.length === 0) return
    window.scrollTo(0, 0)

    getItemContenido()
    getItemsDestacado()
    getItemsHomeBanner()
  }, [articles])

  const getItemsHomeBanner = () => {
    const items = (articles as any[]).filter(item => item.Tipo_Contenido === 'Home Banner')
    setItemsHomeBanner(items)
  }

  const getItemsDestacado = () => {
    const items = (articles as any[]).filter(item => item.Tipo_Contenido === 'Destacado')
    setItemsDestacado(items)
  }

  const getItemContenido = () => {
    const item = (articles as any[]).find(item => item.Tipo_Contenido === 'Contenido multimedia')
    setItemContenido(item)
  }

  return (
    <Fragment>
      <Slider items={itemsHomeBanner} />
      {/* <Button variant="contained">Default</Button> */}

      {/* Lista de imagenes */}

      <div className={styles.image_container}>
        {itemsDestacado.map((item, i) =>
          (
            <div key={i} className={styles.item_image}>
              <img src={item.Imagen} alt="" />
              <div className={styles.item_hover}>
                <span>{item.Nombre_Articulo}</span>
              </div>
            </div>
          )
        )}
        {/* <div className={styles.item_image}>
          <img src={image3} alt="" />
          <div className={styles.item_hover}>
            <span>CAMISETAS</span>
          </div>
        </div>
        <div className={styles.item_image}>
          <img src={image4} alt="" />
          <div className={styles.item_hover}>
            <span>JERSEY</span>
          </div>
        </div>
        <div className={styles.item_image}>
          <img src={image5} alt="" />
          <div className={styles.item_hover}>
            <span>CHAQUETAS</span>
          </div>
        </div> */}
      </div>

      <div className={styles.outstanding} style={{ background: `url('${image6}')` }}>
        <div className={styles.text_outstanding}>
          <h2>{itemContenido ? itemContenido.Nombre_Articulo : ''}</h2>
          <h4>{itemContenido ? itemContenido.Descripcion_Articulo : ''}</h4>
        </div>
        {/* <img src={image7} alt="" /> */}
        <div className={styles.video_container}>
          <ReactPlayer url={itemContenido.Contenido_Multimedia} playing muted controls />
        </div>
      </div>

      {/* Input Subscribe */}
      <section className={styles.subscribe_container}>
        <div className={styles.content_subscribe}>
          <h3>Suscribirse</h3>

          <form noValidate autoComplete="on">
            <TextField color="secondary" className={styles.subscribe_input} label="Correo electrónico" />
            <Button color="secondary" variant="outlined">Enviar</Button>
          </form>

        </div>
      </section>

    </Fragment>
  )
}

function mapStateToProps(state) {
  const { articles } = state
  return articles
}

export default connect(mapStateToProps)(Home)
