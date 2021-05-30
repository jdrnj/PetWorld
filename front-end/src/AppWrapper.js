import "./App.css";
import { useContext } from "react";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Header from "./Components/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AnimalList from "./PetAdoption/AnimalList";
import UserProfile from "./UserProfile/UserProfile";
import { UserContext } from "./context/UserContext";
import Pet from "./PetAdoption/Pet/Pet";
import UProfileHeader from "./UserProfile/UProfileHeader";
import Admin from "./Admin/Admin";
function AppWrapper() {
  const [user] = useContext(UserContext);
  return (
    <Router>
      <div className="App">
        {user.email !== "" ? (
          <UProfileHeader name={user.username} />
        ) : (
          <Header />
        )}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" component={UserProfile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />

          <Route path="/:category/:animalId" component={Pet} />
          <Route path="/:category" component={AnimalList} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppWrapper;
