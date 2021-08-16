import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TutorialDataService from "../services/TutorialService.js";

class AddTutorial extends Component {
  constructor(props) {
    super(props);

    //   Binding class methods
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    //   Application state
    this.state = {
      title: "",
      description: "",
      published: false,
      submitted: false,
    };
  }

  // Track input values of fields
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  // Save tutorials
  saveTutorial(e) {
    e.preventDefault();
    let data = {
      title: this.state.title,
      description: this.state.description,
      published: false,
    };

    TutorialDataService.create(data)
      .then(() => {
        alert("Saved tutorial successfully.");
        this.setState({
          submitted: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  newTutorial() {
    this.setState({
      title: "",
      description: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    return (
      <Row className="p-4">
        <Col md={{ span: 6, offset: 3 }} xs={12}>
          {this.state.submitted ? (
            <Container className="text-center">
              <h4>You have submitted successfully!</h4>
              <Button variant="primary" onClick={this.newTutorial}>
                Add a Tutorial
              </Button>
            </Container>
          ) : (
            <Form onSubmit={this.saveTutorial}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tutorial's title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  size="lg"
                  placeholder="More information on the tutorial..."
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </Form.Group>
              <Form.Group className="text-center">
                <Button type="submit" variant="primary" size="lg">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          )}
        </Col>
      </Row>
    );
  }
}

export default AddTutorial;
