import Carousel from 'react-bootstrap/Carousel';
import c1 from "../../assets/c1.jpg";
import c2 from "../../assets/c2.jpg";
import c3 from "../../assets/c3.jpg";

function Carouse() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={c1} alt="First slide" className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={c2} alt="Second slide" className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={c3} alt="Third slide" className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carouse;
