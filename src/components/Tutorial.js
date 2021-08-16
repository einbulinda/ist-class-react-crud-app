import { Component } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import TutorialDataService from "../services/TutorialService";

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        key: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tutorial } = nextProps;

    if (prevState.currentTutorial.key !== tutorial.key) {
      return {
        currentTutorial: tutorial,
        message: "",
      };
    }
    return prevState.currentTutorial;
  }

  componentDidMount() {
    this.setState({
      currentTutorial: this.props.tutorial,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          description: description,
        },
      };
    });
  }

  updatePublished(status) {
    TutorialDataService.update(this.state.currentTutorial.key, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateTutorial() {
    const data = {
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
    };
    TutorialDataService.update(this.state.currentTutorial.key, data)
      .then(() => {
        this.setState({ message: "The tutorial was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteTutorial() {
    TutorialDataService.delete(this.state.currentTutorial.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;
    return (
      <div>
        <h4>Tutorial</h4>
        {currentTutorial ? (
          <div>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <strong>Status:</strong>
                  {currentTutorial.published ? "Published" : "Pending"}
                </Form.Label>
              </Form.Group>
            </Form>
            {currentTutorial.published ? (
              <Button
                variant="secondary"
                onClick={this.updatePublished(false)}
                className="m-2"
              >
                Unpublish
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={this.updatePublished(true)}
                className="m-2"
              >
                Publish
              </Button>
            )}
            <Button
              variant="danger"
              onClick={this.deleteTutorial}
              className="m-2"
            >
              Delete
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={this.updateTutorial}
              className="m-2"
            >
              Update
            </Button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a tutorial ...</p>
          </div>
        )}
      </div>
    );
  }
}

export default Tutorial;
