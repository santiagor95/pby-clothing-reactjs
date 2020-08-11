import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss'
import { Link, NavLink } from 'react-router-dom';
import FormRegisterModal from '../form-register-modal/Form-register-modal';
import { FiUser, FiShoppingCart } from "react-icons/fi";
import LoginModal from '../login-modal/Login-modal';

import image1 from '../../assets/images_pby/ProductoGeneral/1.jpeg'
import { RegisterModal } from '..';
import { ItemShoppingCart } from '../../modules/shopping-cart/Item-shopping-cart/ItemShoppingCart';
import { Button } from '@material-ui/core';
import { PbyService } from '../../services/pby-services';

// React redux
import { useDispatch } from 'react-redux'
import { addProductsAction, setFilterProductsAction, addArticlesAction, addMenuAction } from '../../store/actions';
import { connect } from 'react-redux'
import { MAN, WOMAN, BOY, COLLECTIONS, US, NEWS, CONTACT } from '../../consts/clothe-names';


const Header = (props) => {

  const { products } = props

  const [showPasarela, setShowPasarela] = useState(false)
  const [pasarelaList, setPasarelaList] = useState<any[]>([])
  const [productTypes, setProductTypes] = useState<any[]>([])
  const [itemHover, setItemHover] = useState('')
  const [showModal, setShowModal] = useState<boolean>(true)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false)
  const [showShoopinCartPreview, setShowShoopinCartPreview] = useState<boolean>(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getAllProducts()
    getAllArticles()
    getMenuItems()
  }, [])

  useEffect(() => {
    if (products.length === 0) return
    setPasarelaList(products)
    const productTypes = [...new Map(products.map(item => [item['Tipo_Producto'], item])).values()];
    setProductTypes(productTypes)
  }, [products])


  const getAllProducts = () => {
    PbyService.getAllProducts().then(products => {
      if (!products) return
      dispatch(addProductsAction(products))
    })
  }

  const getAllArticles = () => {
    PbyService.getAllArticles().then(articles => {
      if (!articles) return
      dispatch(addArticlesAction(articles))
    })
  }

  const getMenuItems = () => {
    PbyService.getMenu().then(menu => {
      if (!menu) return
      dispatch(addMenuAction(menu))
    })
  }

  const setFilterSubmenu = (param: string | null) => {
    dispatch(setFilterProductsAction(param))
  }

  return (
    <header className={styles.header} onPointerLeave={() => setShowPasarela(false)}>

      <LoginModal show={showLoginModal}
        onClosed={() => {
          setShowLoginModal(false)
        }}
        openRegisterModal={() => {
          setShowRegisterModal(true)
          setShowLoginModal(false)
        }} />
      <RegisterModal show={showRegisterModal} onClosed={() => setShowRegisterModal(false)} />
      <FormRegisterModal show={showModal} onClosed={() => setShowModal(false)} />

      <div className={styles.header_container}>
        <div className={styles.image_content}
          onPointerOver={() => setShowPasarela(false)}>
          <NavLink to="/">
            <img src={require('../../assets/logo2.png')} alt="" />
          </NavLink>
        </div>

        <div className={styles.navigation}>
          <li className={styles.item_li}
            onPointerOver={() => {
              if (showShoopinCartPreview) return
              setShowPasarela(true)
              setItemHover(MAN)
            }}>
            <NavLink to="/productos/hombre" activeClassName={styles.activeRoute} onClick={() => setFilterSubmenu(null)}>
              <span>{MAN.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onPointerOver={() => {
              if (showShoopinCartPreview) return
              setShowPasarela(true)
              setItemHover(WOMAN)
            }}>
            <NavLink to="/productos/mujer" activeClassName={styles.activeRoute} onClick={() => setFilterSubmenu(null)}>
              <span>{WOMAN.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onPointerOver={() => {
              if (showShoopinCartPreview) return
              setShowPasarela(true)
              setItemHover(BOY)
            }}>
            <NavLink to="/productos/nino" activeClassName={styles.activeRoute} onClick={() => setFilterSubmenu(null)}>
              <span>{BOY.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onPointerOver={() => {
              if (showShoopinCartPreview) return
              setShowPasarela(true)
              setItemHover(COLLECTIONS)
            }}>
            <NavLink to="/productos/colecciones" activeClassName={styles.activeRoute}>
              <span>{COLLECTIONS.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onPointerOver={() => {
              setShowPasarela(false)
            }}>
            <NavLink to="/nosotros" activeClassName={styles.activeRoute}>
              <span>{US.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onClick={() => {
            }}
            onPointerOver={() => { }}>
            <NavLink to="/noticias" activeClassName={styles.activeRoute}>
              <span>{NEWS.toUpperCase()}</span>
            </NavLink>
          </li>
          <li className={styles.item_li}
            onPointerOver={() => {
              // setShowPasarela(true)
            }}>
            <NavLink to="/contacto" activeClassName={styles.activeRoute}>
              <span>{CONTACT.toUpperCase()}</span>
            </NavLink>
          </li>
        </div>

        <div className={styles.icon_buttons}>
          {/* <FiShoppingCart onClick={() => {
            // setShowModal(true)
            history.push({ pathname: '/carrito-de-compras' })
          }} /> */}

          <FiUser onClick={() => setShowLoginModal(true)} />
          <FiShoppingCart onClick={() => setShowShoopinCartPreview(true)} />
        </div>
      </div>

      <div className={styles.pasarela_products} style={{ height: showPasarela ? '270px' : 0, opacity: showPasarela ? '1' : '0' }}>
        <div className={styles.pasarela_content}>
          <ul className={styles.new_arrivals}>
            <a href="">NEW ARRIVALS</a>
            {productTypes.filter(item => item.Sexo === itemHover).map((item, i) => (
              <li key={i}>{item.Tipo_Producto}</li>
            ))}
            {/* <li>Swimyear</li> */}
          </ul>
          <ul className={styles.images_list}>
            {pasarelaList.filter(item => item.Sexo === itemHover).slice(0, 5).map((item, i) => (
              <li key={i} onClick={() => setFilterSubmenu(item.Nombre_Producto)}>
                {/* <img src={item.Imagen_Tipo_Producto} alt="" /> */}
                <img src={image1} alt="" />
                <span>{item.Nombre_Producto}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>


      {showShoopinCartPreview ? (
        <div className={styles.shopping_content} onClick={() => setShowShoopinCartPreview(false)}>
          <div className={styles.container}>
            <div className={styles.body_shopping}>
              <div className={styles.header_shopping}>
                <h5>Carrito de Compras</h5>
                <i
                  className={styles.close_icon + ' material-icons'}
                  onClick={() => { }}>
                  highlight_off</i>

              </div>
              <ItemShoppingCart preview />
              <ItemShoppingCart preview />
              <ItemShoppingCart preview />
            </div>
            <div>
              <NavLink to="/carrito-de-compras" activeClassName={styles.activeRoute}>
                <Button color="primary" style={{ width: '100%', marginTop: '2em' }} onClick={() => {
                  // history.push({ pathname: '/datos-pago' })
                }} variant="contained">Carito de Compras</Button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : null}

    </header>
  )
}

function mapStateToProps(state) {
  const { products } = state
  return products
}

export default connect(mapStateToProps)(Header)