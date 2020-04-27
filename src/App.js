
import React from 'react';  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import Add from './components/Add'  
import List from './components/List'  
import Edit from "./components/Edit";
import Search from "./components/Search";   

function App() {  
  return (  
    <div className="App">  
     <Router>    
      <div className="container">    
        <nav className="btn btn-warning navbar navbar-expand-lg navheader">    
          <div className="collapse navbar-collapse" >    
            <ul className="navbar-nav mr-auto">    
              <li className="nav-item">    
                <Link to={'/Create'} className="nav-link">Add</Link>    
              </li>    
              <li className="nav-item">    
                <Link to={'/List'} className="nav-link">List</Link>    
              </li> 
              <li className="nav-item">    
                <Link to={'/Search'} className="nav-link">Search</Link>    
              </li>    
            </ul>    
          </div>    
        </nav> <br />    
        <Switch>    
          <Route exact path='/create' component={Add} />    
          <Route path='/edit/:id' component={Edit} />    
          <Route path='/list' component={List} />
          <Route path='/search' component={Search} />    
        </Switch>    
      </div>    
    </Router>    
    </div>  
  );  
}  
export default App; 
