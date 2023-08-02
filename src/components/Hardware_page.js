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

function DataFetchingComponent (){
    const [HW1Capacity, setHW1Capacity] = useState(['10']);
    const [HW2Capacity, setHW2Capacity] = useState(['10']);
    const [HW1Availability, setHW1Availability] = useState(['10']);
    const [HW2Availability, setHW2Availability] = useState(['10']);

  
    useEffect(() => {
      fetch('http://localhost:5000/getHardwareData')
        .then((response) => response.json())
        .then((data) => {
        // .then((HW1Capacity) => setHW1Capacity(HW1Capacity))
        // .then((HW2Capacity) => setHW2Capacity(HW2Capacity))
        // .then((HW1Availability) => setHW1Availability(HW1Availability))
        // .then((HW2Availability) => setHW2Availability(HW2Availability))
        setHW1Capacity(data.HW1Capacity);
        setHW2Capacity(data.HW2Capacity);
        setHW1Availability(data.HW1Availability);
        setHW2Availability(data.HW2Availability);
        })
    }, []);
    return [HW1Capacity, HW2Capacity, HW1Availability, HW2Availability];
}

// const {HW1Capacity, HW2Capacity, HW1Availability, HW2Availability} = DataFetchingComponent();

class Hardware extends Component{
    constructor(props){
        super(props)
        this.state = {
            hardware_set1_checkin : '',
            hardware_set2_checkin : '',
            hardware_set1_checkout: '',
            hardware_set2_checkout: '',
            hardware_set1_capacity:'',
            hardware_set1_availability :'',
            hardware_set2_capacity:'',
            hardware_set2_availability:''
        }
        this.handlehardware_set1_checkin = this.handlehardware_set1_checkin.bind(this)
        this.handlehardware_set2_checkin = this.handlehardware_set2_checkin.bind(this)
        this.handlehardware_set1_checkout = this.handlehardware_set1_checkout.bind(this)
        this.handlehardware_set2_checkout = this.handlehardware_set2_checkout.bind(this)
        this.handlecheckin = this.handlecheckin.bind(this)
        this.handlecheckout = this.handlecheckout.bind(this)
        // this.state.hardware_set1_capacity, this.state.hardware_set2_capacity, this.state.hardware_set1_availability, this.state.hardware_set2_availability = DataFetchingComponent()
    }

    // handleSet1CapacityChange = event => {
    //     this.setState({
    //         username: event.target.value
    //     });
    // }

    // handleSet2CapacityChange = event => {
    //     this.setState({
    //         username: event.target.value
    //     });
    // }

    // handleSet1AvalabilityChange = event => {
    //     this.setState({
    //         username: event.target.value
    //     });
    // }

    // handleSet2AvailabilityChange = event => {
    //     this.setState({
    //         username: event.target.value
    //     });
    // }

 

    handlehardware_set1_checkin = event => {
        this.setState({
            hardware_set1_checkin: event.target.value
        })
    }

    handlehardware_set1_checkout = event => {
        this.setState({
            hardware_set1_checkout: event.target.value
        })
    }

    handlehardware_set2_checkin = event => {
        this.setState({
            hardware_set2_checkin: event.target.value
        })
    }

    handlehardware_set2_checkout = event => {
        this.setState({
            hardware_set2_checkout: event.target.value
        })
    }

    handlecheckin = event => {
    
        event.preventDefault();

        console.log(this.state)
    
        var body = {
            qty1: this.state.hardware_set1_checkin,
            qty2: this.state.hardware_set2_checkin
        }
    
        console.log(body);
    
        if (this.state.hardware_set1_checkin === "" && this.state.hardware_set2_checkin === "") {
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
                    window.location.href = "/project";
                    // this.state.hardware_set1_capacity, this.state.hardware_set2_capacity, this.state.hardware_set1_availability, this.state.hardware_set2_availability = DataFetchingComponent();
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
            qty1: this.state.hardware_set1_checkout,
            qty2: this.state.hardware_set2_checkout
        }
    
        console.log(body);
    
        if (this.state.hardware_set1_checkout === "" && this.state.hardware_set2_checkout === "") {
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
                    // this.state.hardware_set1_capacity, this.state.hardware_set2_capacity, this.state.hardware_set1_availability, this.state.hardware_set2_availability = DataFetchingComponent();
                    window.location.href = "/project";
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
                        <th>checkin_quantity</th>
                        <th>checkout_quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Set 1</td>
                            <td>{this.state.hardware_set1_capacity}</td>
                            <td>{this.state.hardware_set1_availability}</td>
                            <td> <input type="text" value={this.state.hardware_set1_checkin} onChange={this.handlehardware_set1_checkin} />
                            </td>
                            <td> <input type="text" value={this.state.hardware_set2_checkin} onChange={this.handlehardware_set2_checkin} />
                            </td>
0                            <Button
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
                            <td> <input type="text" value={this.state.hardware_set1_checkout} onChange={this.handlehardware_set1_checkout} />
                            </td>
                            <td> <input type="text" value={this.state.hardware_set2_checkout} onChange={this.handlehardware_set2_checkout} />
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