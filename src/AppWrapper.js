import "./App.css";
import { useContext } from "react";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Header from "./Components/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import AnimalList from "./PetAdoption/AnimalList";
import UserProfile from "./UserProfile/UserProfile";
import Account from "./Components/Account/Account";
import { UserContext } from "./context/UserContext";
import UProfileHeader from "./UserProfile/UProfileHeader";
function AppWrapper() {
  const [user, setUser] = useContext(UserContext);
  return (
    <Router>
      <div className="App">
        {user.email !== "" ? <UProfileHeader /> : <Header />}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" component={UserProfile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/:animal" component={AnimalList} />
          <Route path="/account" component={Account} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppWrapper;
