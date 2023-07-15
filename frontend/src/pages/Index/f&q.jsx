import Accordion from 'react-bootstrap/Accordion';

function FQ() {
    const FQ = [
        {
            title: 'What is MovieOwl',
            desc: 'MovieOwl is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices.\
            You can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There\'s always something new to discover, and new TV programmes and films are added every week!',
        },
        {
            title: 'How much does MovieOwl cost?',
            desc: 'Watch MovieOwl on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from 99 kr to 179 kr a month. No extra costs, no contracts.',
        },
        {
            title: 'Where can I watch?',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad\
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut\
            aliquip ex ea commodo consequat.',
        },
        {
            title: 'How can I cancel?',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad\
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut\
            aliquip ex ea commodo consequat.',
        },
        {
            title: 'What can I watch on MovieOwl?',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad\
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut\
            aliquip ex ea commodo consequat.',
        },
    ]
    const renderFQ = () => {
        return FQ.map((item, index) => {
            return <>
                <Accordion className='mb-3' key={index}>
                    <Accordion.Item eventKey={index} className='mb-3 dark'>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body >
                            {item.desc}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </>
        })
    }
    return (<>
        <h1 className='hero_text mb-4'>Frequently Asked Questions</h1>
        {renderFQ()}
    </>
    );
}

export default FQ;