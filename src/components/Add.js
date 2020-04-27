import React, { useState , useEffect} from 'react'
import axios from 'axios'

import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  
function Add(props) {  
	const initialFormState = { id: null, serial_number: '', brand: '' , model: '', date_bought: '', status :''}
	const [appliances, setAppliaces] = useState(initialFormState)
  const [showLoading, setShowLoading] = useState(false);  
  const apiUrl = "http://localhost:8080/appliances";  
  const Insert = (e) => {  
    e.preventDefault();  
    //debugger;  
    const data = { serial_number:appliances.serial_number, brand: appliances.brand, model: appliances.model, date_bought:appliances.date_bought, status: appliances.status};  
	if (data.serial_number === '') {
		alert("serial number can be none")
		return
	}
	axios.post(apiUrl, data)  
      .then((result) => {  
        props.history.push('/List')  
	  })
	  .catch(error => {
		  alert(error)
		console.log(error)
	  })
	  ;  
  };  
  const Cancel = () => {
	setAppliaces({...appliances, initialFormState})
	props.history.push('/List')  
  }
  const onChange = (e) => {  
    e.persist();  
    //debugger;  
	setAppliaces({...appliances, [e.target.name]: e.target.value});  
  }  
  
  return (  
    <div className="app flex-row align-items-center">  
      <Container>  
        <Row className="justify-content-center">  
          <Col md="12" lg="10" xl="8">  
            <Card className="mx-4">  
              <CardBody className="p-4">  
                <Form onSubmit={Insert}>  
                  <h1>Add</h1>  
                  <InputGroup className="mb-3">  
                    <Input type="text" name="serial_number" id="serial_number" placeholder="Serial Number" value={appliances.serial_numbe} onChange={ onChange }  />  
				  </InputGroup>  
                   <InputGroup className="mb-3">  
                    <Input type="text" placeholder="Brand" name="brand" id="brand" value={appliances.brand}  onChange={ onChange }/>  
                  </InputGroup>  
                  <InputGroup className="mb-3">  
                    <Input type="text" placeholder="Model" name="model" id="model"  value={appliances.model} onChange={ onChange }  />  
                  </InputGroup>  
                  <InputGroup className="mb-4">  
                    <Input type="text" placeholder="Date Bought" name="date_bought" id="date_bought" value={appliances.date_bought} onChange={ onChange }  />  
                  </InputGroup>  
                  <InputGroup className="mb-4">  
                    <Input type="text" placeholder="Status" name="status" id="status" value={appliances.status} onChange={ onChange } />  
				  </InputGroup>   
             <CardFooter className="p-4">  
                <Row>  
                  <Col xs="12" sm="6">  
                    <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>  
                  </Col>  
                  <Col xs="12" sm="6">  
                    <Button type="cancel"className="btn btn-info mb-1" block onClick={Cancel}><span>Cancel</span></Button>  
                  </Col>  
                </Row>  
              </CardFooter>  
                </Form>  
              </CardBody>  
            </Card>  
          </Col>  
        </Row>  
      </Container>  
    </div>  
  )  
}  
export default Add  


