import{ React } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Paginate from './Paginate/Paginate';
import Details from './Details/Details.jsx';
import Create from './Create/Create.jsx';
import style from './Main.module.css';
import { useSelector } from 'react-redux';
import Loading from './Loading/Loading';

const Main = ( { history, location } ) => {
  const { loading } = useSelector( state => state );

  return(
    <div className={ style.main }>
      <Header history={ history } location={ location } />
      <Route exact path={ '/recipes' } render={ () => loading ? <Loading /> : <Paginate /> } />
      <Route exact path={`/recipes/:id`} render={ ( { match }) => ( match.params.id === "create" ) ? (loading ? <Loading /> : <Create />) : <Details id={ match.params.id } /> } />
    <Footer/>
    </div>
  );
}

export default Main;