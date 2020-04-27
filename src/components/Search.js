import React ,{ useState, useEffect } from 'react'
import axios from 'axios'
import Add from './Add'

import { Badge, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink,Input, InputGroup, Row, Table } from 'reactstrap';  


function Search(props) {  
  const [data, setData] = useState([]); 
  const [query, setQuery] = useState("") 
  const apiUrl = "http://localhost:8080/appliances"; 
  const deletUrl = "http://localhost:8080/appliances?id=" 
  const searchUrl = "http://localhost:8080/appliances/search?query="
  useEffect(() => {  
      const GetData = async () => {  
      const result = await axios(apiUrl);  
      setData(result.data);  
    };  
    GetData();  
  }, []);  
  
  const deleteeployee = (id) => {  
   // debugger;  
    axios.delete(deletUrl + id)  
      .then((result) => {
        setData(data.filter(d => d.id !== id))  
        props.history.push('/List')  
      })
      .catch(error => {
        alert(error)
      console.log(error)
      });  
  };  
  const editemployee = (id) => {  
    props.history.push({  
      pathname: '/edit/' + id 
    });  
  };  

  const onChange = (e) => {  
    e.persist();  
    //debugger;  
	  setQuery(e.target.value);  
  } 

  const Search = (query) => {
    //debugger;  
    axios.get(searchUrl + query)  
      .then((result) => { 
        debugger
        setData(result.data) 
        //props.history.push('/List')  
      });  
  }
  
  return (  
    <div className="animated fadeIn">  
      <Row>  
        <Col>  
          <Card>  
            <CardHeader>  
              <i className="fa fa-align-justify"></i> List  
              </CardHeader>  
            <CardBody> 
                <Row>
                  <Col xs="12" sm="9">
                  <Input type="text" name="query" id="query" value={query} onChange={ onChange } />  
                  </Col>
                  <Col xs="12" sm="3">
                  <Button type="submit" className="btn btn-info mb-1" block onClick={() => Search(query)}><span>Search</span></Button> 
                  </Col>
                </Row> 
              <Table hover bordered striped responsive size="sm">  
                <thead>  
                  <tr>  
                    <th>Id</th>
                    <th>Serial Number</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Date Bought</th>
                    <th>Status</th>
                    <th>Action</th>  
                  </tr>  
                </thead>  
                <tbody>  
                  {  
                    data.map((item, idx) => {  
                      return <tr key={idx}>
                              <td style={{textAlign: "center"}}>{item.id}</td>
                              <td style={{textAlign: "center"}}>{item.serialNumber}</td>
                              <td style={{textAlign: "center"}}>{item.brand}</td>
                              <td style={{textAlign: "center"}}>{item.model}</td>
                              <td style={{textAlign: "center"}}>{item.dateBought}</td>
                              <td style={{textAlign: "center"}}>{item.status}</td>
                              <td>
                              <div class="btn-group">  
                                          <button className="btn btn-warning" onClick={() => { editemployee(item.id) }}>Edit</button>  
                                          <button className="btn btn-warning" onClick={() => { deleteeployee(item.id) }}>Delete</button>  
                                </div>  
                              </td>
                            </tr>
                            })} 
                </tbody>  
              </Table>  
            </CardBody>  
          </Card>  
        </Col>  
      </Row>  
    </div>  
  )  
}  
export default Search 


