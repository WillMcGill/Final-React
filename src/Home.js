import React from 'react';
import Axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ImageMapper from 'react-image-mapper';
import { resetWarningCache } from 'prop-types';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hoveredArea: '',
            routeData: [],
            routeDetails: [],
            currentComments:[],
            URL: "./Gym3DOverview.png",
            toggleModal: false
        }
        this.getActive = this.getActive.bind(this)
        this.getRouteDetails = this.getRouteDetails.bind(this)
        this.load = this.load.bind(this)
        this.toggle = this.toggle.bind(this)
    }
    getActive() {
        if (!localStorage.routes) {
            Axios.get('http://localhost:8000/api/show')
                .then(res => {
                    const data = res.data
                    localStorage.setItem('routes', JSON.stringify(data))
                    this.setState({ routeData: data })
                })
        }

        else {
            this.setState({ routeData: JSON.parse(localStorage.routes) })
        }

    }

    getRouteDetails(){
         Axios.get('http://localhost:8000/api/active/')
            .then(res =>{
                 let routeDetails = res.data;
                 this.setState({ routeDetails: routeDetails})
                 console.log(this.state.routeDetails)
                
            })
        
    }

    async getComments(){
        

        Axios.get('http://127.0.0.1:8000/api/comments/' + this.clickId)
        .then( res =>{

           
            const data = res.data;
            this.setState({currentComments: res.data});
        })
    }

    componentDidMount() {
        this.getActive();
        this.getRouteDetails();
        
    }

    load() {
        this.setState({ msg: "Interact with image !" });
    }

    clicked(area) {
        this.setState({
            msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
                area.coords
            )} !`
        });
        this.getComments();
        this.toggle();
        this.clickId = area.name;
        this.routeType = this.state.routeDetails[this.clickId - 1].type;
        this.routeDiff = this.state.routeDetails[this.clickId - 1].difficulty;
        this.routeSet = this.state.routeDetails[this.clickId - 1].set_date;
        this.routeExpire = this.state.routeDetails[this.clickId - 1].expire_date;
    }

    moveOnArea(area, evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on ${area.shape} ${
                area.name
                } at coords ${JSON.stringify(coords)} !`
        });
    }

    enterArea(area) {
        this.setState({ hoveredArea: area });
    }

    leaveArea(area) {
        this.setState({ hoveredArea: null });
    }

    getTipPosition(area) {
        return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }

    clickedOutside(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`
        })
        console.log(this.state.msg)

    }

    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });
    }

    toggle() {
        this.setState({ toggleModal: !this.state.toggleModal });
    }

    render() {
        return (
            <>

<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-2">Welcome to Sloper</h1>
    <p class="lead">Click on the interactive map or leave comments below.</p>
  </div>
</div>
                {this.props.page <= 3 && this.state.routeData.length > 0 ?
                    <div className = "row">
                    <div className="w-100 center-content mx-auto">

                        <ImageMapper src={this.state.URL} map={
                            {
                                name: "my-map",
                                areas: this.state.routeData
                            }
                        } width={1000}
                            onLoad={() => this.load()}
                            onClick={area => this.clicked(area)}
                            onMouseEnter={area => this.enterArea(area)}
                            onMouseLeave={area => this.leaveArea(area)}
                            onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                            onImageClick={evt => this.clickedOutside(evt)}
                            onImageMouseMove={evt => this.moveOnImage(evt)}
                        />
                        {
                            this.state.hoveredArea &&
                            <span className="tooltip"
                                style={{ ...this.getTipPosition(this.state.hoveredArea) }}>
                                {this.state.hoveredArea && this.state.hoveredArea.name}
                            </span>
                        }
                    </div>
                    </div>
                    : null}
                <div>

                    <Modal centered isOpen={this.state.toggleModal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Route Details</ModalHeader>
                        <ModalBody>
                            <form>
                                <FormGroup>
                                    <Label for="exampleSelect"><center>Type</center></Label>
                                    <ModalBody>
                                    <center>{this.routeType}</center>
                                    </ModalBody>
                                    <Label for="exampleSelect"><center>Difficulty</center></Label>
                                    <ModalBody>
                                        <center>{this.routeDiff}</center>
                                    </ModalBody>
                                    <Label for="exampleSelect"><center>Set Date</center></Label>
                                    <ModalBody>
                                        <center>{this.routeSet}</center>
                                    </ModalBody>
                                    <Label for="exampleSelect"><center>Tear Down Date</center></Label>
                                    <ModalBody>
                                        <center>{this.routeExpire}</center>
                                    </ModalBody>
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default Home 
