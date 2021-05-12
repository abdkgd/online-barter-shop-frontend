import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import {Button} from 'react-bootstrap'
import RequestCartModal from './RequestCartModal'
import { useSelector, useDispatch } from 'react-redux'
import { getAccount } from "../../app/actions/AccountActions";

const ItemCard = ({data}) => {

    const dispatch = useDispatch()
    const myAccount = useSelector(state => state.accountid)
    const accounts = useSelector(state => state.account)
    const items = useSelector(state => state.item)
    const [showRequestCartModal, setShowRequestCartModal] = useState(false)

    useEffect(() => {
        dispatch(getAccount())
    }, [])

    const handleRequest = (id) => {
        setShowRequestCartModal(!showRequestCartModal)
    }

    return (
        <>
            <Card style={{ width: '17rem'}}>
                <Card.Img variant="top" src={data.photo} />
                <Card.Body>
                    <Card.Title>
                        <div className="title-wrapper">
                            {data.description}
                        </div>
                    </Card.Title>
                        <div className="price-wrapper">
                            <Card.Text>
                                Price: ¥{data.price}
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
                            data.isTradeable === "true" ?
                            <Button variant="success" onClick={() => handleRequest(data.id)}>Request Trade</Button>
                            :
                            <Button variant="danger" disabled>Not Available</Button>
                        }
                </Card.Body>
            </Card>
            {
                myAccount.data && accounts.data &&
                <RequestCartModal show={showRequestCartModal} setShowRequestCartModal={setShowRequestCartModal} onHide={()=> setShowRequestCartModal(false)}
                ownerId={data.ownerId} itemId={data.id} myAccount={myAccount.data} accounts={accounts.data} items={items.data}/>
            }
        </>
    )
}

export default ItemCard
