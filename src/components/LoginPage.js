import React, { Component } from "react";
import "antd/dist/antd.css";
import "./UserSignIn.css";
import Paper from 'material-ui/Paper';
//import Avatar from 'material-ui/Avatar';
//import SignInImage from 'src/Images/download.jpg';
import { Form, Input, Button } from "antd";


const stylePaper = {
    height: '330px',
    width: '400px',
    background: '#f8f8f9',
    position: 'relative',
    marginLeft:'35%',
    marginTop: '70px'
};
const bgstyle={
  background:'#171732',
  height:'900px'
};
const styleText = {
    marginLeft: '100px',
    marginTop: '-50px',
    fontSize: '1.71429rem',
    fontFamily: 'ff-clan-web-pro,"Helvetica Neue",Helvetica,sans-serif!important',
    fontWeight: '400'
};

const FormItem = Form.Item;

var result
class Signin extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: ''
    }

    this.handleusernameChange = this.handleusernameChange.bind(this)
    this.handlepasswordChange = this.handlepasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

handleusernameChange = event => {
    this.setState({
        username: event.target.value
    });
}

handlepasswordChange = event => {
    this.setState({
        password: event.target.value
    });
}


handleSubmit(event) {

    event.preventDefault();

    console.log(this.state)

    var body = {
        username: this.state.username,
        password: this.state.password
    }

    console.log(body);

    if (this.state.username === "") {
        alert('Please enter the username')
    }

    else if (this.state.password === "") {
        alert('Please enter the password')
    }

    else {
      let url = "http://localhost:5000/login"
  
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      .then(response => {
        if (response.ok) {
            result = response.json()
            .then(result => {
              if (result.validLogin === 'true'){
                alert("Username valid")
                window.location.href = "/project";
              }
              else{
                alert("Username invalid")
              }
            }
            )
        }
      }
      )
  }
//  --!>
}


  render() {
    const { getFieldDecorator } = this.props.form;
    let result = null;
   
    return (
      <div style={bgstyle}>
      <h1 style={{color:'#171732'}}>1</h1>
      <Paper style={stylePaper}>
        
        <Form onSubmit={this.handleSubmit} className="signup-form">
          <div style={{marginLeft:'0px', marginBottom: '40px'}}> 
              <div style={styleText}>
                USER LOGIN
              </div>
          </div>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your username!" }]
            })(<Input placeholder="username" type='text' value={this.state.username} onChange={this.handleusernameChange} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
                { min: 8, message: "Minimum password length is 8 characters" }
              ]
            })(<Input type="password" placeholder="Password" value={this.state.password} onChange={this.handlepasswordChange}  />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              LOGIN
            </Button>
            Or <a href="/UserSignIn">Sign Up</a>
          </FormItem>
          {result}
        </Form>
      </Paper>
      </div>
    );
  }
}

const Sign_in = Form.create()(Signin);

export default Sign_in;
