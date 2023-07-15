import Carousel from 'react-bootstrap/Carousel';

function Header() {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="./imgs/star-wars-the-last-jedi.jpeg"
                    alt="First slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="./imgs/thor-4.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h1>Thor: Love and Thunder</h1>
                    <p>2022 ‧ Action/Adventure ‧ 1h 59m</p>
                    <p>Thor enlists the help of Valkyrie,
                        Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher,
                        who intends to make the gods extinct.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="./imgs/jocker.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h1>Joker</h1>
                    <p>2019 ‧ R ‧ 2h 2m</p>
                    <p>
                        The rise of Arthur Fleck, from aspiring stand-up
                        comedian and pariah to Gotham's clown prince and
                        leader of the revolution.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Header;