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
class Projects extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        projectId: ''
    }

    this.handleprojectIdChange = this.handleprojectIdChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}
componentDidMount()
{
  const yourSessionVariable = sessionStorage.getItem('uservalid');
  
  if(yourSessionVariable=="null")
  {
    console.log(yourSessionVariable)
    alert("Login to enter projects page")
    this.props.history.push('/Login');
    //window.location.href = "/Login";
  }
  
}
handleprojectIdChange = event => {
    this.setState({
        projectId: event.target.value
    });
}


handleSubmit(event) {

    event.preventDefault();

    console.log(this.state)

    var body = {
        projectId: this.state.projectId,
    }

    console.log(body);

    if (this.state.projectId === "") {
        alert('Please enter the projectId')
    }

    else {
      let url = "http://localhost:5000/enter_project"
  
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      .then(response => {
        if (response.ok) {
            result = response.json()
            .then(result => {
              window.sessionStorage.setItem("projectvalid",result.project_exists)
              if (result.project_exists === 'true'){
                alert("Welcome to the Hardware page")
                window.location.href = "/hardware";
              }
              else{
                alert("ProjectId invalid")
              }
            }
            )
        }
      }
      ).catch(() => console.log("can't access " + url + " response. "))
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
                PROJECTS
              </div>
          </div>
          <FormItem>
            {getFieldDecorator("projectId", {
              rules: [{ required: true, message: "Please enter the project Id!" }]
            })(<Input placeholder="project Id" type='text' value={this.state.projectId} onChange={this.handleprojectIdChange} />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              JOIN
            </Button>
            Or <a href="/createProject">Create a new project</a>
          </FormItem>
          {result}
        </Form>
      </Paper>
      </div>
    );
  }
}

const Project = Form.create()(Projects);

export default Project;
