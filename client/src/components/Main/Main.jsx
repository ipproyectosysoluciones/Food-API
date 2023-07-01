import{ React } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Paginate from './Paginate/Paginate';
import style from './Main.module.css';
import { useSelector } from 'react-redux';
import Loading from './Loading/Loading';

const Main = ( { history, location } ) => {
  const { loading } = useSelector( state => state );

  return(
    <div className={ style.main }>
      <Header history={ history } location={ location } />
      <Route exact path={ '/recipes' } render={ () => loading ? <Loading /> : <Paginate /> } />
    <Footer/>
    </div>
  );
}

export default Main;