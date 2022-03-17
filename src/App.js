import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Data from './Data'
import Reg from './Reg'
import Loging from './Loging'
import Success from './Success';
import Good from './Good'
function App() {
  return (
    <div className="App">

      {/* <Good/> */}
      <Router>
        <Switch>
          <Route exact path='/' component={Loging}/>
          <Route exact path='/Reg' component={Reg}/>
          <Route exact path='/success' component={Success}/>
          <Route exact path='/user/:id' component={Data}/>
           
          <Route exact path='/user' component={Data}/>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
