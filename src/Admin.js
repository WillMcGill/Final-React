import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";


class Admin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            toggleModal: false,
            currentEdit: null,
            value: '',
            difficulty: '5.7',
            type: 'Top Rope',
            name: '',
            current: ''
        }
        this.toggle = this.toggle.bind(this)
        this.onClick = this.onClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateDatabase = this.updateDatabase.bind(this)
    }

    componentDidMount() {
        this.getAllRoutes()
    }

    getAllRoutes() {

        axios.get('https://sloper.appspot.com/api/active')
            .then(res => {
                this.setState(
                    { data: res.data }
                )
            })
    }

    toggle(event, item = null) {
        this.setState({ toggleModal: !this.state.toggleModal });
    }

    onClick(event , item) {
        this.toggle()
        
        if(item)
        {
        this.setState({current: item.wall_location}, console.log(this.state));
        
        }
        else {this.updateDatabase()
            this.props.getRenderCallFromAdmin("something");
        }
    }

    updateDatabase(){

        axios(
            { url: 'https://sloper.appspot.com/api/update/' + this.state.current,
              method: 'post',
              data: { id: this.state.current,
                      type: this.state.type,
                      diff: this.state.difficulty  
                    }
            })
            .then(res => {
                this.getAllRoutes();
            })

        axios(
            { url: 'https://sloper.appspot.com/api/removecomments/',
              method: 'post',
              data: { 
                    id: this.state.current,
                    }
            })
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }


    render() {

        const tableData = this.state.data.map((item) => {

            return (
                <tr>
                    <td>{item.wall_location}</td>
                    <td>{item.type}</td>
                    <td>{item.difficulty}</td>
                    <td>{item.set_date}</td>
                    <td>{item.expire_date}</td>
                    <td><button id={item.id} type="button" class="btn btn-danger" onClick={
                        e => this.onClick(e, item)
                    }>Update Route</button></td>
                </tr>
            )
        });


        return (
            <>
                <div>

                    <Modal centered isOpen={this.state.toggleModal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Route Details</ModalHeader>
                        <ModalBody>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Set Route Type:
                                    <select name="type" onChange={this.handleChange}>
                                        <option value="Top Rope">Top Rope</option>
                                        <option value="Lead">Lead</option>
                                        <option value="Auto-belay">Auto-belay</option>
                                    </select>

                                </label>
                                <label>
                                    Set Route Difficulty:
                                    <select name="difficulty" onChange={this.handleChange}>
                                        <option value="5.7">5.7</option>
                                        <option value="5.8">5.8</option>
                                        <option value="5.9">5.9</option>
                                        <option value="5.10">5.10</option>
                                        <option value="5.11">5.11</option>
                                        <option value="5.12">5.12</option>
                                        <option value="5.13">5.13</option>
                                    </select>
                                </label>
                            </form>
                        
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onClick}>Save New Route</Button>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>

                    </Modal>
                </div>

                <table className="table table-striped">

                    <thead>
                        <tr>
                            <th scope="col">Wall Location</th>
                            <th scope="col">Type</th>
                            <th scope="col">Difficulty</th>
                            <th scope="col">Set Date</th>
                            <th scope="col">Expire Date</th>
                            <th scope="col">Edit Route</th>

                        </tr>
                    </thead>

                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Admin
