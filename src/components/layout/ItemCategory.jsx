import React from 'react'
import { InputGroup } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import * as FaIcons from 'react-icons/fa'

const ItemCategory = () => {

    const handleRadio = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        console.log("CLICKED")
    }
    return (
        <div className="item-category-wrapper">
            <Card bg="light" style={{ width: '12rem' }} className="mb-2">
                <Card.Header><label className="font-weight-light">Filter</label></Card.Header>
                <Card.Body>
                <Card.Title><label className="font-weight-bold">Item Category :</label></Card.Title>
                <Card.Text>
                        <label><input type="radio" name="category" value="Clothing" onClick={(e) => console.log(e.target.value)}/> Clothing</label><br />
                        <label><input type="radio" name="category" value="Accessories"/> Accessories</label><br />
                        <label><input type="radio" name="category" value="Electronics"/> Electronics</label><br />
                        <label><input type="radio" name="category" value="Music"/> Music</label><br />
                        <label><input type="radio" name="category" value="Games"/> Games</label><br />
                        <label><input type="radio" name="category" value="Appliances"/> Appliances</label><br />
                        <label><input type="radio" name="category" value="Cars"/> Cars</label><br />
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ItemCategory
