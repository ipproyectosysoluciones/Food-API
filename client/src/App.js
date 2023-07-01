import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import { getRecipesBackend } from './redux/actions';


function App() {
  const dispatch = useDispatch();
  
  useEffect( () => {
    dispatch( getRecipesBackend() )
  }, [ dispatch ] );


  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/recipes" render={( { history, location } ) => <Main history={ history } location={ location } />}/>
      </Routes>
    </div>
  );
}

export default App;
