import React, { useState, useEffect } from 'react'  
import axios from 'axios';  
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Edit(props) {  
    const initialFormState = { id: null, serialNumber: '', brand: '' , model: '', dateBought: '', status :''}
    const [appliances, setAppliaces] = useState(initialFormState)
    const [date, setDate] = useState()
    const Url = "http://localhost:8080/appliances/" + props.match.params.id; 
    const updateUrl = "http://localhost:8080/appliances"; 
        useEffect(() => {  
          const GetData = async () => {  
            const result = await axios(Url);  
            setAppliaces(result.data); 
            if (result.data.dateBought !== 'undefined' && result.data.dateBought !== null && result.data.dateBought !== "") {
                setDate(Date.parse(result.data.dateBought.substr(0,10))) 
            }
          }; 
          GetData();  
        }, []);  
        const UpdateEmployee = (e) => {  
          e.preventDefault();  
          const data = { serial_number:appliances.serialNumber, brand: appliances.brand, model: appliances.model, date_bought : appliances.dateBought, status: appliances.status};  
 
          axios.post(updateUrl, data)  
            .then((result) => {  
              props.history.push('/List')  
            })
            .catch(error => {
                alert(error)
              console.log(error)
            });  
        };  
        const onChange = (e) => {  
            e.persist();  
            //debugger;  
            setAppliaces({...appliances, [e.target.name]: e.target.value});  
        }  
        

        const Cancel = () => {
            setAppliaces({...appliances, initialFormState})
            props.history.push('/List')  
        }
        return (  
                <div className="app flex-row align-items-center">  
                <Container>  
                  <Row className="justify-content-center">  
                    <Col md="12" lg="10" xl="8">  
                      <Card className="mx-4">  
                        <CardBody className="p-4">  
                          <Form onSubmit={UpdateEmployee}>  
                            <h1>Update</h1>  
                            <InputGroup className="mb-3">  
                    <Input type="text" name="serialNumber" id="serialNumber" placeholder="Serial Number" value={appliances.serialNumber} onChange={ onChange }  />  
				  </InputGroup>  
                   <InputGroup className="mb-3">  
                    <Input type="text" placeholder="Brand" name="brand" id="brand" value={appliances.brand}  onChange={ onChange }/>  
                  </InputGroup>  
                  <InputGroup className="mb-3">  
                    <Input type="text" placeholder="Model" name="model" id="model"  value={appliances.model} onChange={ onChange }  />  
                  </InputGroup>  
                  <InputGroup className="mb-4">  
                    {/* <Input type="text" placeholder="Date Bought" name="dateBought" id="dateBought" value={appliances.dateBought} onChange={ onChange }  />   */}
                    <DatePicker 
                            placeholderText="Click to select a date"
							dateFormat="yyyy-MM-dd"
							selected={date}
							onChange={date => setDate(date)}
						/>
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
  
export default Edit