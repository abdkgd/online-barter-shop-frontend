import React from 'react'
import Card from 'react-bootstrap/Card'
import {Button} from 'react-bootstrap'

const ItemCard = ({data}) => {
    return (
        <>
            <Card style={{ width: '16rem'}}>
                <Card.Img variant="top" src={data.photo} />
                <Card.Body>
                    <Card.Title>
                        <div className="title-wrapper">
                            {data.description}
                        </div>
                    </Card.Title>
                        <div className="price-wrapper">
                            <Card.Text>
                                Price: $ {data.price}
                            </Card.Text>
                        </div>
                        <div className="category-wrapper">
                            <Card.Text>
                                Category: {data.category}
                            </Card.Text>
                        </div>
                        <div className="status-wrapper">
                            <Card.Text>
                                Status: {data.status}
                            </Card.Text>
                        </div>
                        {
                            data.isTradeable == "true" ?
                            <Button variant="success">Request Trade</Button>
                            :
                            <Button variant="danger" disabled>Not Available</Button>
                        }
                </Card.Body>
            </Card>
        </>
    )
}

export default ItemCard
