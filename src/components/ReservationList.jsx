import { Component } from "react";
import { Alert, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";

class ReservationList extends Component {
  state = {
    reservations: [],
    error: false,
    errorMsg: "",
    isLoading: true
  };

  fetchReservations = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation");

      if (response.ok) {
        const data = await response.json();
        console.log("FETCH RESULT: ", data);
        this.setState({ reservations: data, isLoading: false });
        console.log("SET STATE");
      } else {
        this.setState({ error: true, isLoading: false });
      }
    } catch (error) {
      this.setState({ error: true, errorMsg: error.message, isLoading: false });
    }
  };

  componentDidMount = () => {
    console.log("COMPONENT DID MOUNT");

    // questa chiamata a fetchReservations avverrà una volta sola
    this.fetchReservations();
  };

  render() {
    console.log("RENDER");
    // fetch() // NO!
    // this.fetchReservations(); // NO! questo genererà un loop infinito dovuto al setState interno a fetchReservations: fare un setState richiama render()
    return (
      <Container className="mt-5">
        <h2 className="text-center">Prenotazioni attive</h2>
        {this.state.isLoading && !this.state.error && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <Row className="justify-content-center">
          <Col md={10}>
            {this.state.error && !this.state.isLoading && (
              <Alert variant="danger">{this.state.errorMsg ? this.state.errorMsg : "Errore nel reperire i dati"}</Alert>
            )}

            <ListGroup>
              {this.state.reservations.length === 0 && !this.state.error && !this.state.isLoading && (
                <ListGroup.Item className="text-danger">Non ci sono ancora prenotazioni per oggi</ListGroup.Item>
              )}

              {this.state.reservations.map(reserv => (
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>
                    {reserv.name} <strong>per {reserv.numberOfPeople}</strong>
                  </span>{" "}
                  <span>{new Date(reserv.dateTime).toLocaleTimeString()}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationList;
