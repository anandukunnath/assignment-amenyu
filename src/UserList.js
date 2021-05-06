import logo from './images/loader.gif';
import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import { Card,CardDeck,DropdownButton,ButtonGroup,Button,Dropdown} from 'react-bootstrap';
import Userpage from "./Userpage"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";


import { withRouter } from 'react-router-dom';

 class UserList extends Component {
  state = {
    loader: true,
    data:[]
};

componentWillMount() {
       
  this.getData()

}

dynamicSort = property => {
  var sortOrder = 1;

  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }

  return function (a,b) {
      if(sortOrder == -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
  }
}

sortEvent = type => {
  let sortedData = this.state.data
  sortedData.sort(this.dynamicSort(type));
  this.setState({ data: sortedData })
}


routeChange = (idprop) =>{ 
    let path = '/userpage/'+idprop 
    this.props.history.push(path);
  }


getData = () => {
  axios
        .get(
            `https://reqres.in/api/users?delay=3`
        )
        .then(res => {
          const dataArray = Object.values(res.data.data)
          const keyLessArray= Object.values(dataArray)
          this.setState({ data: keyLessArray },this.setState({loader:false}))
        }
          )
        
        
}
  render() {
    const loaded=this.state.loader
    const data= this.state.data

    return (<Router>
        <Switch>
      <div>
        <div className="App">
          <br></br>
          
        
          {loaded?<img src={logo} className="App-logo" alt="logo" />:
          <div>
          <DropdownButton className="sortby" as={ButtonGroup} title="Sort by" id="bg-nested-dropdown">
              <Dropdown.Item eventKey="1" onClick={() => this.sortEvent('first_name')}>First name</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={() => this.sortEvent('last_name')}>Last name</Dropdown.Item>
          </DropdownButton>
          <br></br>
          
          <CardDeck>
          
            
          
              {
                
                data.map(users =>
                 
                    
                  <Card className="cards" key={users.id} onClick={() => this.routeChange(users.id)}>
                    <Card.Img variant="top" src={users.avatar} />
                    <Card.Body>
                      <Card.Title>{users.name}</Card.Title>
                      <Card.Title>{users.first_name} {users.last_name}</Card.Title>
                      <Card.Text>
                      {users.email}
                      </Card.Text>
                    </Card.Body>
                    </Card> 
                    
                    
                    
                )
              }
            </CardDeck>
            
            
            </div>
  }
      </div>
      
                    
                    
                        
    <Route exact path="/userpage" render={(props) => <Userpage/>}/>
                        
                    
                
            
      </div>
      </Switch>
      </Router>
    )
  }
}

export default withRouter(UserList);