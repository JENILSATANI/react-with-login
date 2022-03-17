import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Data from './Data'
import Reg from './Reg'
import Loging from './Loging'
import Success from './Success';
import User from './User'
import Mmm from './Mmm'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Loging}/>
          <Route exact path='/Reg' component={Reg}/>
          <Route exact path='/success' component={Success}/>
          <Route exact path='/user/:id' component={Data}/>
          <Route exact path='/user' component={User}/>
          <Route exact path='/Mmm' component={Mmm}/>

        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
