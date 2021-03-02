import './App.scss';
import 'antd/dist/antd.css'
import firebase from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import PlayerPage from './Pages/PlayerPage';
function App() {
  // console.log("firebase",firebase)

  return (
    <Router>
      <div className="main-container">
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route exact path="/player/:id" render={(props) => <PlayerPage {...props} /> } />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
