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
            <Link to="/">Create</Link>
          </li>
          <li>
            <Link to="/List">List</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Create />
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

class Create extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Type: 'Empty',
      Name:'Empty',
      Input: 'Empty',
      Output: 'Empty',
      Description: 'Empty'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.read=this.read.bind(this);
  }
  
  read(){
    axios.get('http://localhost:4000')
    .then(function(response){
      arr = response.data
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event){
    event.preventDefault();
    console.log(arr)
    await axios.post('http://localhost:4000/',this.state)
    .then(function (response) {
    //  arr=response.config.data
    console.log(response.config.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    this.read()
  }

  async handleDelete(event){
    event.preventDefault();
    await axios.delete(`http://localhost:4000/${this.state.Name}`)
    .then(function(response){
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error)
    })
    this.read()
  }

  async handleUpdate(event){
    event.preventDefault();
    
    await axios.patch(`http://localhost:4000/${this.state.Name}`,this.state)
    .then(function(response){
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error)
    })
    this.read()
  }

 render(){
  this.read()
  
  return (
      <div>
        <h2>Create</h2>
        <fieldset>
          <form onSubmit={this.handleSubmit}>
          Type:  <input type='text' value={this.state.value} name='Type' placeholder='Type' onChange={this.handleChange}></input><br/>
          Name:  <input type='text' value={this.state.value} name='Name' placeholder='Name' onChange={this.handleChange}></input><br/>
          Input: <input type="text" value={this.state.value} name="Input" placeholder="Input"  onChange={this.handleChange}></input><br/>
          Output: <input type="text" value={this.state.value} name="Output" placeholder="Output"  onChange={this.handleChange}></input><br/>
          <textarea rows="4" cols="50" value={this.state.value} name="Description" placeholder='Description' onChange={this.handleChange}/>

          <br/><input type="submit"  value="Create"></input>
          <button onClick={this.handleUpdate}>Update</button>
          <button onClick={this.handleDelete}>Delete</button>
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
      {/* <h3>ID: {item._id}</h3> */}
      <h3>Type: {item.Type}</h3>
      <h3>Name: {item.Name}</h3>
      <h3>Input: {item.Input}</h3>
      <h3>Output: {item.Output}</h3>
      <h3>Description: {item.Description}</h3>
      <button onClick={this.handleUpdate}> Update</button>
      {/* <button onClick={this.handleDelete}>Delete</button> */}
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