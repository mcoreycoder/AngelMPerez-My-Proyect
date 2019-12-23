import React from "react";
import {
    BrowserRouter as Router,
    // Switch,
    Route,
    Link
  } from "react-router-dom";


import axios from 'axios';

import Update from './Update'


let arr = []

export default class List extends React.Component{
    state = {
        viewList:[]
    }
 
     read(){
      axios.interceptors.request.use(config => {
        // log a message before any HTTP request is sent
        // console.log('Request was sent');
        return config;
      });
  
      axios.get('http://localhost:4000')
      .then(function(response){
        arr = response.data
        console.log("List arr", arr)
        
        return arr
      }).then(arr => this.setState({viewList : arr}))
      .catch(function(error){
        console.log(error)
      })
    }

    async handleDelete(item){
      // event.preventDefault();
      // console.log(event)
      await axios.delete(`http://localhost:4000/${item._id}`)
      .then(function(response){
        console.log(response.data)
      })
      .catch(function(error){
        console.log(error)
      })
      this.read()
    }
  
    componentDidMount(){
        this.read()
    }
    render(){
        
      let x = this.state.viewList.map((item, index)=>
        <div key={index}>
        <h3>--------------------------</h3>
        {/* <h3>ID: {item._id}</h3> */}
        <h3>Type: {item.Type}</h3>
        <h3>Name: {item.Name}</h3>
        <h3>Input: {item.Input}</h3>
        <h3>Output: {item.Output}</h3>
        <h3>Description: {item.Description}</h3>
        {/* <button onClick={this.handleUpdate}> Update</button> */}
        <button onClick={()=>this.handleDelete(item)}>Delete</button>
        <Router>
          <Link to="/Update"><button>Update</button></Link>
          <Route exact path="/Update">
              <Update prop={item}/>
              
          </Route>
        </Router>
        <h3>--------------------------</h3>
        </div>
  
      )
      return(
      <div>
        <h2>List</h2>
        {x}
        {/* <button onClick={}> Update</button> */}
        
      </div>
      );
    }
  }