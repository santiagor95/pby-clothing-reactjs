
import React from 'react'
import styles from './ProductList.module.scss'
import { Button } from '@material-ui/core'
import NumberFormat from 'react-number-format';

export function ProductList({ list = [], onClickItem }: any) {

  const getFistImage = (images: string) => {
    if (!images) return ''
    const img = images.split(',')[0]
    return img || ''
  }

  const getPrecioConDescuento = (price: number, dto: number) => {
    const finalPrice = price - ((price * dto) / 100)
    return finalPrice
  }

  return (
    <div className={styles.list_products_container}>
      {list.map((item: any, i: number) =>
      (
        <div key={i} className={styles.item_product}>
          <div className={styles.image_product} onClick={() => onClickItem(item.Sexo, item.Id_Producto)}>
            {item.Aplica_Descuento ?
              <div className={styles.sale_content}>
                <span>SALE</span>
              </div> : null}
            <img
              src={getFistImage(item.Images)} alt="" />
            <div className={styles.button_container}>
              <Button color="primary" variant="contained">Ver más</Button>
            </div>

          </div>

          <div className={styles.info_product}>
            <b onClick={() => onClickItem(item.Sexo, item.Id_Producto)}>{item.Nombre_Producto}</b>
            {/* <b>{item.Sexo}</b> */}
            <span>{item.Nombre_Coleccion}</span>
            <span>{item.Sexo}</span>
            {/* <span>Color {JSON.stringify(item)}</span> */}
            <div className={styles.prices}>
              <b className={styles.normal_price} style={{ textDecoration: item.Aplica_Descuento ? 'line-through' : '' }}>
                <NumberFormat value={item.Precio} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              </b>

              {item.Aplica_Descuento ?
                <b className={styles.price_sale}>
                  <NumberFormat value={getPrecioConDescuento(item.Precio, item.C__Descuento)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </b>
                : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}