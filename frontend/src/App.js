import React from "react";
import axios from 'axios';
// import {useHistory} from "react-router-dom";
// import Hook from './Hook'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var arr=[]
// var item

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          
          <li>
            <Link to="/">Registration</Link>
          </li>
          <li>
            <Link to="/List">List</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Registration />
          </Route>
          <Route path="/List">
            <List />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Name: '',
      Input: '',
      Output: '',
      Description: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  handleSubmit(event){
    event.preventDefault();
    // alert('A name was submitted: ' + this.state.fName+ ' '+this.state.lName);
    
    console.log(arr)
    axios.get('http://localhost:4000/')
    .then(function (response) {
     let item=response.data
      console.log(item[0].Type);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    arr.push(this.state)
  }
 render(){
     return (
      <div>
        <h2>Registration</h2>
      
        <fieldset>
          <form onSubmit={this.handleSubmit}>
          Name:  <input type='text' value={this.state.value} name='Name' placeholder='Name' onChange={this.handleChange}></input><br></br>
          Input: <input type="text" value={this.state.value} name="Input" placeholder="Input"  onChange={this.handleChange}></input><br></br>
          Output: <input type="text" value={this.state.value} name="Output" placeholder="Output"  onChange={this.handleChange}></input><br></br>
          Description: <input type="text" value={this.state.value} name="Description" placeholder="Description" onChange={this.handleChange}></input><br></br>
         <input type="submit"  value="Submit"></input>

          </form>    
        </fieldset>
      </div>
      
    );
  }  
}

class List extends React.Component{
 
  render(){
    let x = arr.map((item, index)=>
      <div key={index}>
      <h3>--------------------------</h3>
      <h3>Name: {item.Name}</h3>
      <h3>Input: {item.Input}</h3>
      <h3>Output: {item.Output}</h3>
      <h3>Description: {item.Description}</h3>
      <h3>--------------------------</h3>
      </div>

    )
    return(
    <div>
      <h2>List</h2>
      {x}
    </div>
    );
  }
}