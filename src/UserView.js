import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Pagination from 'react-bootstrap/Pagination'
import "bootstrap/dist/css/bootstrap.min.css";


class UserView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            toggleModal: false,
            currentEdit: null,
            value: null,
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

    onClick(event) {
        console.log(this.state)
        this.toggle()
    }

    handleChange(event) {
        console.log(event.value)
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
                    <td><button id={item.id} type="button" class="btn btn-primary" onClick={this.toggle}>Add Comments</button></td>
                </tr>
            )
        });


        return (
            <>
                <div>

                    <Modal centered isOpen={this.state.toggleModal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Tell Us What You Think</ModalHeader>
                        <ModalBody>
                            <form>
                                <FormGroup>
                                    <Label for="exampleSelect">Leave A Comment</Label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    <Label for="exampleSelect">Rate This Route</Label>
                                    <Input type="select" name="diff" id="exampleSelect" value={this.select}>
                                        <option value="1">1 Star</option>
                                        <option value="2">2 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="5">5 Stars</option>
                                       
                                    </Input>
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onClick}>Submit</Button>
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
                                <th scope="col">User Comments</th>

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

export default UserView
