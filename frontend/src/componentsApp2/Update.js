import React from "react";

import axios from 'axios';

let arr = []

export default class Update extends React.Component{
    constructor(props){
      super(props);
      this.state={
        Type:props.prop.Type,
        Name: props.prop.Name,
        Input: props.prop.Input,
        Output: props.prop.Output,
        Description: props.prop.Description
      };
      this.handleChange = this.handleChange.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this);
      this.read=this.read.bind(this);
    }
    
    read(){
      axios.interceptors.request.use(config => {
        // log a message before any HTTP request is sent
        console.log('Request was sent');
        return config;
      });
  
      axios.get('http://localhost:4000')
      .then(function(response){
        arr = response.data
        console.log(response)
        return arr
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
  
    async handleUpdate(event){
      // event.preventDefault();
      console.log(this.props.prop._id)
      await axios.patch(`http://localhost:4000/${this.props.prop._id}`,this.state)
      .then(function(response){
        console.log(response.data)
      })
      .catch(function(error){
        console.log(error)
      })
      // this.forceUpdate()
      this.read()
      
    }
  
  forms(){
    return(
    <fieldset>
    Type:  <input type='text' value={this.state.value} name='Type' placeholder={this.state.Type} onChange={this.handleChange}></input><br/>
    Name:  <input type='text' value={this.state.value} name='Name' placeholder={this.state.Name} onChange={this.handleChange}></input><br/>
    Input: <input type="text" value={this.state.value} name="Input" placeholder={this.state.Input}  onChange={this.handleChange}></input><br/>
    Output: <input type="text" value={this.state.value} name="Output" placeholder={this.state.Output}  onChange={this.handleChange}></input><br/>
    <textarea rows="4" cols="50" value={this.state.value} name="Description" placeholder={this.state.Description} onChange={this.handleChange}/>
    </fieldset>)
  }
    
   render(){
    // this.read()
    
    return (
        <div>
          <h2>Update</h2>
          {this.forms()}
          <button onClick={this.handleUpdate}>Change</button>
        </div>
      );
    }  
  }