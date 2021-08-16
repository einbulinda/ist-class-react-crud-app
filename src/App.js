import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Switch, Route, NavLink } from "react-router-dom";
import AddTutorial from "./components/AddTutorial";
import TutorialsList from "./components/TutorialsList";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              EIN<span className="text-danger">B</span>ULINDA
            </Navbar.Brand>
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/tutorials">
                Tutorials
              </NavLink>
              <NavLink className="nav-link" to="/add">
                Add Tutorials
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
        <Container className="mt-3">
          <h2 className="text-center">React Firebase Database CRUD</h2>
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path={"/add"} component={AddTutorial} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
