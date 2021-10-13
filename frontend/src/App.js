import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultNavbar from "../src/components/Navbar";
import Login from "./screens/LoginForm";
import SignupForm from "./screens/SignupForm";
import StyleTransferCarousel from "./screens/StyleTransfer";
import HomeCaraousel from "./screens/Home";

const App = () => {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css"
      />

      <Router>
        <DefaultNavbar />
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignupForm} exact />
          <Route
            path="/style_transfer"
            component={StyleTransferCarousel}
            exact
          />
          <Route path="/" component={HomeCaraousel} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
