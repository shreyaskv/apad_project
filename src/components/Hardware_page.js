import React, { Component , useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./Hardware.css";
import Paper from 'material-ui/Paper';
import { Form, Input, Button } from "antd";


const stylePaper = {
    height: '200px',
    width: '800px',
    background: '#f8f8f9',
    position: 'relative',
    marginLeft:'20%',
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

var result
class Hardware extends Component{
    constructor(props){
        super(props)
        this.state = {
            hardware_set1 : '',
            hardware_set2 : '',
            hardware_set1_capacity:'',
            hardware_set1_availability :'',
            hardware_set2_capacity:'',
            hardware_set2_availability:''
        }
        this.handlehardware_set1 = this.handlehardware_set1.bind(this)
        this.handlehardware_set2 = this.handlehardware_set2.bind(this)
        this.handlecheckin = this.handlecheckin.bind(this)
        this.handlecheckout = this.handlecheckout.bind(this)
    }

    componentDidMount(){
        fetch('http://localhost:5000/getHardwareData')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            this.setState({
                hardware_set1_capacity:data.H1.capacity, 
                hardware_set1_availability :data.H1.availability,
                hardware_set2_capacity:data.H2.capacity,
                hardware_set2_availability:data.H2.availability
            })
            console.log(this.state);
        })
   

    }

    handlehardware_set1 = event => {
        this.setState({
            hardware_set1: event.target.value
        })
    }

    handlehardware_set2 = event => {
        this.setState({
            hardware_set2: event.target.value
        })
    }

    handlecheckin = event => {
    
        event.preventDefault();

        console.log(this.state)
    
        var body = {
            qty1: this.state.hardware_set1,
            qty2: this.state.hardware_set2
        }
    
        console.log(body);
    
        if (this.state.hardware_set1 === "" && this.state.hardware_set2 === "") {
            alert('Please enter checkout value')
        }
    
        else {
          let url = "http://localhost:5000/checkin"
      
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
          })
          .then(response => {
            if (response.ok) {
                result = response.json()
                .then(result => {
                  if (result.checke_in === 'true'){
                    alert("Checked in")
                    this.componentDidCatch
                    window.location.reload();
                  }
                  else{
                    alert("Could not check in")
                  }
                }
                )
            }
          }
          )
      }
    }

    handlecheckout = event => {
    
        event.preventDefault();

        console.log(this.state)
    
        var body = {
            qty1: this.state.hardware_set1,
            qty2: this.state.hardware_set2
        }
    
        console.log(body);
    
        if (this.state.hardware_set1 === "" && this.state.hardware_set2=== "") {
            alert('Please enter checkout value')
        }
    
        else {
          let url = "http://localhost:5000/checkout"
      
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(body)
          })
          .then(response => {
            if (response.ok) {
                result = response.json()
                .then(result => {
                  if (result.check_out === 'true'){
                    alert("Checked out")
                    this.componentDidCatch
                    window.location.reload();
                  }
                  else{
                    alert("Could not check out")
                  }
                }
                )
            }
          }
          )
      }
    }

    render() {
        let result = null;       
        return (
            <div style={bgstyle}>
            <h1 style={{color:'#171732'}}>1</h1>
            <Paper style={stylePaper}>
                <table>
                    <thead>
                        <tr>
                        <th>Hardware</th>
                        <th>Capacity</th>
                        <th>Availability</th>
                        <th>quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Set 1</td>
                            <td>{this.state.hardware_set1_capacity}</td>
                            <td>{this.state.hardware_set1_availability}</td>
                            <td> <input type="text" value={this.state.hardware_set1} onChange={this.handlehardware_set1} />
                            </td>
                            <Button
                            type="primary"
                            htmlType="small"
                            onClick={this.handlecheckin}
                            className="hardware-button"
                            >
                            CHECKIN
                            </Button>
                        </tr>
                        <tr>
                            <td> Set 2</td>
                            <td>{this.state.hardware_set2_capacity}</td>
                            <td>{this.state.hardware_set2_availability}</td>
                            <td> <input type="text" value={this.state.hardware_set2} onChange={this.handlehardware_set2} />
                            </td>
                            <Button
                            type="primary"
                            htmlType="small"
                            onClick={this.handlecheckout}
                            className="hardware-button"
                            >
                            CHECKOUT
                            </Button>
                        </tr>
                    </tbody>
                </table>
            </Paper>
            </div>
        );
    }

}

export default Hardware;