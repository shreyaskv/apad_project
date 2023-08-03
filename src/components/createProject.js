import React, { Component } from "react";
import "antd/dist/antd.css";
import "./UserSignIn.css";
import Paper from 'material-ui/Paper';
//import Avatar from 'material-ui/Avatar';
//import SignInImage from 'src/Images/download.jpg';
import { Form, Input, Button } from "antd";


const stylePaper = {
    height: '450px',
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
class createProject extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        projectname: '',
        projectDescription:'',
        projectId: ''
    }

    this.handleprojectnameChange = this.handleprojectnameChange.bind(this)
    this.handleprojectDescriptionChange = this.handleprojectDescriptionChange.bind(this)
    this.handleprojectIdChange = this.handleprojectIdChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

componentDidMount()
{
  console.log(window.sessionStorage.getItem("logout"))
  console.log(window.sessionStorage.getItem("uservalid")==="false")
  if(window.sessionStorage.getItem("logout")==="true" || window.sessionStorage.getItem("uservalid")===null)
  {
    
    alert("Login to enter projects page")
    window.location.href = "/Login";
  }
  
}

handleprojectnameChange = event => {
    this.setState({
        projectname: event.target.value
    });
}

handleprojectDescriptionChange = event => {
    this.setState({
        projectDescription: event.target.value
    });
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
        projectname: this.state.projectname,
        projectDescription: this.state.projectDescription,
        projectId:this.state.projectId
    }

    console.log(body);

    if (this.state.projectname === "") {
        alert('Please enter the project name')
    }

    else if (this.state.projectDescription === "") {
        alert('Please enter the project Description')
    }
    else if (this.state.projectId === "") {
        alert('Please enter the project Id')
    }

    else {
        
      let url = "http://localhost:5000/create_project"
  
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      .then(response => {
        if (response.ok) {
            result = response.json()
            .then(result => {
              if (result.project_exists === 'true'){
                alert("Project already exists!")
              }
              else{
                alert("Project created!")
                window.location.href = "/project";
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
    if (this.state.res_received) {
      alert('Project created!');
      console.log(this.state.res_recieved);
    }

    return (
      <div style={bgstyle}>
      <h1 style={{color:'#171732'}}>1</h1>
      <Paper style={stylePaper}>
        
        <Form onSubmit={this.handleSubmit} className="signup-form">
          <div style={{marginLeft:'0px', marginBottom: '40px', marginTop: '20px'}}> 
              <div style={styleText}>
                CREATE PROJECT
              </div>
          </div>
          <FormItem>
            {getFieldDecorator("projectname", {
              rules: [{ required: true, message: "Please input project name!" }]
            })(<Input placeholder="project name" type='text' value={this.state.projectname} onChange={this.handleprojectnameChange} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("projectDescription", {
              rules: [{ required: true, message: "Please input project description!" }]
            })(<Input placeholder="project description" type='text' value={this.state.projectDescription} onChange={this.handleprojectDescriptionChange} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("projectId", {
              rules: [
                { required: true, message: "Please input project Id!" },
              ]
            })(<Input type="text" placeholder="project Id" value={this.state.projectId} onChange={this.handleprojectIdChange}  />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              SUBMIT
            </Button>
            Or <a href="/project">go to Projects Page</a>
          </FormItem>
          {result}
        </Form>
      </Paper>
      </div>
    );
  }
}

const create_Project = Form.create()(createProject);

export default create_Project;
