import { Grid ,Card } from '@arco-design/web-react';
import {useNavigate} from "react-router-dom";
const Row = Grid.Row;
const Col = Grid.Col;
const { Meta } = Card;

function ServiceCard({title,description,imageURL,URL}){
    const navigate = useNavigate();

    return (
        <Card
            hoverable
            style={{ margin:20,cursor:"pointer" }}
            cover={
                <div style={{ height: 200, overflow: 'hidden' }}>
                    <img
                        style={{ width: '100%',height:"100%", transform: 'translateY(-20px)',objectFit:"cover"}}
                        alt='dessert'
                        src={imageURL}
                    />
                </div>
            }
            onClick={() => { navigate(URL) }}
        >
            <Meta
                title={title}
                description={
                    <>
                        {description}
                    </>
                }
            />
        </Card>
    );
};



export default function ServicesPage() {
    return (
        <>
            <div className="app-component full-screen-app-component">
                <Row className='grid-demo' >
                    <Col span={6}>
                        <ServiceCard
                            title="Room Booking"
                            description="Book a room for your event"
                            imageURL="/images/room_booking.jpg"
                            URL="/services/room_booking"/>
                    </Col>
                    <Col span={6}>
                        <ServiceCard
                            title="Room Booking"
                            description="Book a room for your event"
                            imageURL="/images/room_booking.jpg"
                            URL="/services/room_booking"/>
                    </Col>
                    <Col span={6}>
                        <ServiceCard
                            title="Room Booking"
                            description="Book a room for your event"
                            imageURL="/images/room_booking.jpg"
                            URL="/services/room_booking"/>
                    </Col>
                    <Col span={6}>
                        <ServiceCard
                            title="Room Booking"
                            description="Book a room for your event"
                            imageURL="/images/room_booking.jpg"
                            URL="/services/room_booking"/>
                    </Col>
                </Row>
            </div>
        </>
    )
}