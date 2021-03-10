import React from 'react'
import { InputGroup } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import * as FaIcons from 'react-icons/fa'

const ItemCategory = () => {

    const handleRadio = (e) => {
        console.log(e);
        console.log("CLICKED")
    }
    return (
        <div className="item-category-wrapper ml-3">
            <Card bg="light" style={{ width: '12rem' }} className="mb-2">
                <Card.Header><label className="font-weight-light">Filter</label></Card.Header>
                <Card.Body>
                <Card.Title><label className="font-weight-bold">Item Category :</label></Card.Title>
                <Card.Text>
                        <label><input type="radio" name="category" value="Clothing" onClick={(e) => handleRadio(e.target.value)}/> Clothing</label><br />
                        <label><input type="radio" name="category" value="Accessories" onClick={(e) => handleRadio(e.target.value)}/> Accessories</label><br />
                        <label><input type="radio" name="category" value="Electronics" onClick={(e) => handleRadio(e.target.value)}/> Electronics</label><br />
                        <label><input type="radio" name="category" value="Music" onClick={(e) => handleRadio(e.target.value)}/> Music</label><br />
                        <label><input type="radio" name="category" value="Games" onClick={(e) => handleRadio(e.target.value)}/> Games</label><br />
                        <label><input type="radio" name="category" value="Appliances" onClick={(e) => handleRadio(e.target.value)}/> Appliances</label><br />
                        <label><input type="radio" name="category" value="Cars" onClick={(e) => handleRadio(e.target.value)}/> Cars</label><br />
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ItemCategory
