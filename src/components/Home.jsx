import { Component } from "react";
import { Container, Row, Col, Carousel, Badge, ListGroup, Alert } from "react-bootstrap";
import menu from "../data/menu.json";
// per fa in modo che la lista di recensioni rispecchi il piatto cliccato, avrà bisogno di far uso di uno STATO interno al componente
// o component STATE
// lo STATE è una specie di memoria interna (e incapsulata) al componente

// lo STATE può essere applicato solo in un Class Component (per il momento)
// andremo a fare il refactor dei componenti a funzione per crearli a classi
class Home extends Component {
  // lo STATE si può creare in un componente a classe
  // dovrà chiamarsi "state"
  // e sarà sempre un oggetto!

  state = {
    // dontTouchMe: false,
    // initialValue: 0,
    selectedPasta: null
  };

  render() {
    // console.log("RENDER");
    return (
      <Container>
        <Row className="justify-content-center mt-4 text-center">
          <Col md={10}>
            <h2>Benvenuti nel nostro reactstorante</h2>
            {/* <p>Niente secondi piatti, valore dello stato iniziale: {this.state.initialValue}</p> */}
            <p>Niente secondi piatti 🍝🍝👏</p>
            {/* <Button
              variant="success"
              className="mb-3"
              onClick={() => {
                // voglio modificare lo stato al click di questo bottone.
                // 1) lo stato non dovrà MAI e po MAI essere mutato direttamente!!!
                // non si potrà assolutamente fare: this.state.initialValue = "qualcos'altro"
                // 2) invece si utilizzerà un metodo asincrono che si prenderà carico di fare la modifica per noi.

                this.setState({ initialValue: "Ciao ragazzi" });
                
                // il setState richiede un oggetto come argomento, e si premurerà di cambiare solo le proprietà che abbiamo passato.
                // altre proprietà preesistenti rimarranno intoccate.

                // il metodo setState notifica React di un cambio di stato, e quindi si attiverà il processo di aggiornamento dell'interfaccia! :)
              }}
            >
              Click me
            </Button> */}
          </Col>
          <Col xs={6}>
            <Carousel>
              {/* React è capace di generare elementi dinamicamente e in sequenza a partire da un array sfruttando il metodo .map() */}
              {menu.map((dish, index) => (
                <Carousel.Item
                  key={`dish-${index}`}
                  onClick={() => {
                    console.log("abbiamo cliccato: " + dish.name);

                    // this.state.selectedPasta = dish; // VIETATISSIMO! perché usciamo dalle logiche React, non verrà notificato il cambiamento, e l'interfaccia non si aggiornerà
                    // console.log(this.state);
                    this.setState({ selectedPasta: dish });
                    // quando parte un setState, viene chiamato di nuovo il metodo render(), viene fatto un diff tra il DOM precedente e il VirtualDOM di React.
                    // solo gli elementi effettivamente diversi verranno aggiornati nell'interfaccia.
                  }}
                >
                  <img className="d-block w-100" src={dish.image} alt="First slide" />
                  <Carousel.Caption>
                    <h3>{dish.name}</h3>
                    <p>
                      <Badge bg="dark">{dish.price}€</Badge>
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs={10}>
            {/* <Button variant="primary" onClick={() => this.setState({ selectedPasta: null })}>
              Reset Pasta
            </Button> */}
            <ListGroup className="mt-5">
              {/* short circuit orperator (&&) o il ternary, permettono di verificare l'esistenza di un valore nello stato, prima di procedere ad accedere alle sue propietà ed evitare errori */}
              {/* this.state.selectedPasta inizia come null e quindi in un contesto come quello seguente verrà valutato a false */}

              {/* questo alert si visualizzerà SOLO quando selectedPasta è falsy */}
              {/* {!this.state.selectedPasta && <Alert variant="danger">Non ci sono recensioni</Alert>}*/}

              {/* questo h2 si visualizzerà SOLO quando selected pasta diventa truthy*/}
              {/*{this.state.selectedPasta && <h2>Abbiamo le tue recensioni:</h2>} */}

              {/* questo blocco si visualizzerà SOLO quando selected pasta diventa truthy */}
              {this.state.selectedPasta ? (
                <>
                  <h3>Recensioni per pasta alla {this.state.selectedPasta.name}</h3>
                  {this.state.selectedPasta.comments.map((review, index) => (
                    <ListGroup.Item className="d-flex" key={`review-${index}`}>
                      <Badge bg="dark">{new Date(review.date).toLocaleTimeString()}</Badge>
                      <strong className="ms-2">{review.author}</strong>:{" "}
                      <span className="ms-auto">{review.comment}</span>
                    </ListGroup.Item>
                  ))}
                </>
              ) : (
                <Alert variant="info">Clicca sull'immagine per visualizzare le recensioni</Alert>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
