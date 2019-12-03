import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";


class UserView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            toggleModal: false,
            currentEdit: null,
            value: null,
            current: '',
            rating: '5',
            comment: ''
        }
        this.toggle = this.toggle.bind(this)
        this.onClick = this.onClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    toggle() {
        this.setState({ toggleModal: !this.state.toggleModal });
    }

    onClick(event, item) {
        this.toggle()

        if (item) {
            this.setState({ current: item.wall_location }, console.log(this.state))
        }

        else { this.updateComments() }
    }

    updateComments(){
        axios(
            { url: 'https://sloper.appspot.com/api/rate/',
              method: 'post',
              data: { user: localStorage.getItem('user_id'),
                      route: this.state.current,
                      comment: this.state.comment  ,
                      rating: this.state.rating
                    }
            })
            .then(res => {
            })
    }

    handleChange(event) {
        console.log(event)
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
                    <td><button id={item.id} type="button" class="btn btn-primary" onClick={e => this.onClick(e, item)}>Rate This Route</button></td>
                </tr>
            )
        });


        return (
            <>
                <div>

                    <Modal centered isOpen={this.state.toggleModal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Tell Us What You Think</ModalHeader>
                        <ModalBody>
                            <form onSubmit={this.handleSubmit}>

                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Leave A Comment</label>
                                        <textarea class="form-control"  rows="3" name="comment" onChange ={this.handleChange}></textarea>
                                </div>
                                <label>
                                    Rate the Route:
                                    <select name="rating" onChange={this.handleChange}>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Star</option>
                                        <option value="3">3 Star</option>
                                        <option value="2">2 Star</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </label>
                            </form>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onClick}>Submit</Button>
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
                                <th scope="col">User Comments</th>
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

export default UserView
