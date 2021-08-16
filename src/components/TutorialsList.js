import { Component } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import TutorialDataService from "../services/TutorialService.js";
import Tutorial from "./Tutorial.js";

class TutorialsList extends Component {
  constructor(props) {
    super(props);

    this.onDataChange = this.onDataChange.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    TutorialDataService.getAll().on("value", this.onDataChange);
  }
  componentWillUnmount() {
    TutorialDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let tuts = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();

      tuts.push({
        key: key,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });
    this.setState({
      tutorials: tuts,
    });

    console.log(tuts);
  }

  refreshList() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { tutorials, currentTutorial, currentIndex } = this.state;
    return (
      <Row>
        <Col md={6}>
          <h4>Tutorials List</h4>
          <ListGroup>
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <ListGroup.Item
                  className={index === currentIndex ? "active" : ""}
                  key={index}
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  style={{ cursor: "pointer" }}
                >
                  {tutorial.title}
                </ListGroup.Item>
              ))}
          </ListGroup>
          <Button
            variant="danger"
            size="sm"
            className="mt-2"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </Button>
        </Col>
        <Col md={6}>
          {currentTutorial ? (
            <Tutorial
              tutorial={currentTutorial}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a tutorial...</p>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

export default TutorialsList;
