import React, { useEffect, useState } from 'react';
import { Switch, Route, HashRouter } from "react-router-dom";
import styles from "./App.module.scss"
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { Header, Footer, Contact } from './components';
import Home from './modules/home/Home';
import Products from './modules/products/Products';
import News from './modules/news/News';
import ShoppingCart from './modules/shopping-cart/ShoppingCart';
import PurchaseData from './modules/purchase-data/PpurchaseData';
import ProductDetail from './modules/products/product-detail/Product-detail';
import Profile from './modules/profile/Profile';
import shoppingHistory from './modules/shopping-history/shopping-history';
import AboutUs from './modules/about-us/AboutUs';
import NewsDetail from './modules/news/news-detail/News-detail';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import MomentUtils from '@date-io/moment';
// Redux
import { Provider } from 'react-redux'
import store from './store/store'
import { PbyService } from './services/pby-services';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { esES } from '@material-ui/core/locale';
import moment from 'moment';
import "moment/locale/es";

moment.locale('es')

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#000',
      dark: '#505050',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiInputBase: {
      colorSecondary: {
        color: '#fff',
      }
    },
    MuiFormLabel: {
      colorSecondary: {
        color: '#a29c9c',
      }
    },
  }
}, esES);


const App = () => {

  useEffect(() => {
    getDataCompany()
  }, [])

  const [dataCompany, setDataCompany] = useState<any>({})

  const getDataCompany = () => {
    PbyService.getFooterDataCompany().then(data => {
      if (!data) return
      setDataCompany(data)
    })
  }

  return (
    <HashRouter>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={'es'}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Provider store={store}>
            <Switch>
              <>
                <Header logoEncabezado={dataCompany.LogoEncabezado} />
                <div className={styles.main_container}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/noticias" component={News} />
                  <Route exact path="/noticias/:newId" component={NewsDetail} />
                  <Route exact path="/hombre" component={Products} />
                  <Route exact path="/mujer" component={Products} />
                  <Route exact path="/niño" component={Products} />
                  <Route exact path="/colecciones" component={Products} />
                  <Route exact path="/:category/:productId" component={ProductDetail} />
                  <Route exact path="/perfil" component={Profile} />
                  <Route exact path="/compras" component={shoppingHistory} />
                  <Route exact path="/nosotros" component={AboutUs} />
                  <Route exact path="/contacto" component={Contact} />
                  <Route exact path="/carrito-de-compras" component={ShoppingCart} />
                  <Route exact path="/datos-pago" component={PurchaseData} />
                  {/* <Route path="*" component={() => <div>Not Found</div>} /> */}
                </div>
              </>
            </Switch>
          </Provider>
          <Footer dataCompany={dataCompany} />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </HashRouter>
  )
}

export default App;
