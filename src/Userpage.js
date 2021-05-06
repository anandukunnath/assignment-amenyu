import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Card,ListGroup,ListGroupItem} from 'react-bootstrap';
import './App.css';

 class Userpage extends Component {
    state = {
        id: 0,
        data: []
        
    };
    componentWillMount() {
        let id = window.location.pathname.replace(/\D/g,'');
        this.setState({id:id},this.getData)
        
      }
      getData = () => {
        axios
              .get(
                  `https://reqres.in/api/users/`+this.state.id
              )
              .then(res => {
                const dataArray = Object.values(res.data.data)
                const keyLessArray= Object.values(dataArray)
                this.setState({ data: keyLessArray })
                console.log(keyLessArray)
              }
                )
              
              
      }
    render() {
        const users = this.state.data
        return (
            <div className="user-page">
                <br></br>
                    
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={users[4]} />
                    <Card.Body>
                        <Card.Title>Name :{users[2]}</Card.Title>
                        <Card.Text>
                        Email : {users[1]}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>First name : {users[2]}</ListGroupItem>
                        <ListGroupItem>Last name : {users[3]}</ListGroupItem>
                        <ListGroupItem>User Id : {users[0]}</ListGroupItem>
                    </ListGroup>
                    
                    </Card>
                    
                    
                    
                
              
            </div>
        )
    }
}
export default withRouter(Userpage);