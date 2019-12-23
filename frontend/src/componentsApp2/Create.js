import React from "react";

import axios from 'axios';

// let arr = []


export default class Create extends React.Component{
    // constructor(props){
    //   super(props);
    //   this.
      state={
        Type: 'Empty',
        Name:'Empty',
        Input: 'Empty',
        Output: 'Empty',
        Description: 'Empty'
      };
    //   this.handleSubmit = this.handleSubmit.bind(this);
    //   this.handleChange = this.handleChange.bind(this);
      // this.handleDelete = this.handleDelete.bind(this);
    //   this.handleUpdate = this.handleUpdate.bind(this);
    //   this.read=this.read.bind(this);
    // }
    
    // read(){
    //   axios.interceptors.request.use(config => {
    //     // log a message before any HTTP request is sent
    //     console.log('Request was sent');
    //     return config;
    //   });
  
    //   axios.get('http://localhost:4000')
    //   .then(function(response){
    //     arr = response.data
    //     console.log(response)
    //   })
    //   .catch(function(error){
    //     console.log(error)
    //   })
    // }
  
    handleChange(event){
        console.log("[event.target.name]", [event.target.name])
        event.preventDefault();
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    async handleSubmit(event){
      event.preventDefault();
      console.log("this.state", this.state)
      await axios.post('http://localhost:4000/',this.state)
      .then(function (response) {
      //  arr=response.config.data
      console.log('response.config.data', response.config.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    //   this.read()
    }
  
    // async handleUpdate(event){
    //   event.preventDefault();
    //   // this.forms()
    //   await axios.patch(`http://localhost:4000/${this.state.Name}`,this.state)
    //   .then(function(response){
    //     console.log(response.data)
    //   })
    //   .catch(function(error){
    //     console.log(error)
    //   })
    //   this.read()
    // }
  
  forms(){
    return(
    <fieldset>
    Type:  <input type='text' value={this.state.value} name='Type' placeholder='Type' onChange={event => this.handleChange(event)}></input><br/>
    Name:  <input type='text' value={this.state.value} name='Name' placeholder='Name' onChange={event => this.handleChange(event)}></input><br/>
    Input: <input type="text" value={this.state.value} name="Input" placeholder="Input"  onChange={event => this.handleChange(event)}></input><br/>
    <textarea rows="4" cols="50" value={this.state.value} name="Description" placeholder='Description' onChange={event => this.handleChange(event)}/>
    </fieldset>)
  }
    
   render(){
    // this.read()
    console.log('this', this.props)
    
    return (
        <div>
          {/* <h2>Create</h2> */}
          {this.forms()}
          <button onClick={event => this.handleSubmit(event)}>Create</button>
          {/* <button onClick={this.handleUpdate}>Update</button> */}
          {/* <button onClick={this.handleDelete}>Delete</button> */}
        </div>
      );
    }  
  }