import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Pagination from 'react-bootstrap/Pagination'


class Admin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            toggleModal: false,
            currentEdit: null
        }
        this.toggle = this.toggle.bind(this)
        this.onClick = this.onClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.getAllRoutes()
    }

    getAllRoutes() {

        axios.get('http://localhost:8000/api/active')
            .then(res => {
                console.log(res.data)
                this.setState(
                    { data: res.data }
                )
                console.log(this.state.data)
            })
    }

    toggle() {
        this.setState({ toggleModal: !this.state.toggleModal });
    }

    onClick(event){
        console.log(this.state)
        this.toggle()
    }

    handleChange(event){
        console.log(event.value)
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]:value
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
                    <td><button id={item.id} type="button" class="btn btn-danger" onClick={this.toggle}>Edit</button></td>
                </tr>
            )
        });



        return (


            <>
                <div>

                    <Modal centered isOpen={this.state.toggleModal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Edit Route</ModalHeader>
                        <ModalBody>
                            <form>
                            <FormGroup>
                                <Label for="exampleSelect">Type</Label>
                                <Input type="select" name="type" id="exampleSelect" >
                                    <option>Lead</option>
                                    <option>Top Rope</option>
                                    <option>Auto-Belay</option>
                                </Input>
                                <Label for="exampleSelect">Difficulty</Label>
                                <Input type="select" name="diff" id="exampleSelect" value={this.select}>
                                    <option>5.7</option>
                                    <option>5.8</option>
                                    <option>5.9</option>
                                    <option>5.10</option>
                                    <option>5.11</option>
                                    <option>5.12</option>
                                    <option>5.13</option>
                                </Input>
                            </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onClick}>Save New Route</Button>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <Pagination>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Wall Location</th>
                            <th scope="col">Type</th>
                            <th scope="col">Difficulty</th>
                            <th scope="col">Set Date</th>
                            <th scope="col">Expire Date</th>
                            <th scope="col">Change Route</th>

                        </tr>
                    </thead>
                    
                    <tbody>
                        {tableData}
                    </tbody>
                    

                </table>
                </Pagination>

            </>
        )
    }
}

export default Admin
