import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import { getRecipesBackend } from './redux/actions';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  const dispatch = useDispatch();
  
  useEffect( () => {
    dispatch( getRecipesBackend() )
  }, [ dispatch ] );


  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/recipes" render={
          ( { navigate, location } ) => <Main navigate={ navigate } location={ location } />
        }/>
      </Routes>
    </div>
  );
}

export default App;
