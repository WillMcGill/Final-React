import React from 'react';
import Axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ImageMapper from 'react-image-mapper';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hoveredArea: '',
            routeData: [],
            URL: "./Gym3DOverview.png",
            toggleModal: false
        }
        this.getActive = this.getActive.bind(this)
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

    componentDidMount() {
        this.getActive();
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
        this.toggle();
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
        console.log(area.name)
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
                {this.props.page <= 3 && this.state.routeData.length > 0 ?
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
                    : null}
                <div>

                    <Modal centered isOpen={this.state.toggleModal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Edit Route</ModalHeader>
                        <ModalBody>
                            <form>
                                <FormGroup>
                                    <Label for="exampleSelect">Type</Label>
                                    <ModalBody>
                                        Lead
                                    </ModalBody>
                                    <Label for="exampleSelect">Difficulty</Label>
                                    <ModalBody>
                                        <center>5.9</center>
                                    </ModalBody>
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onClick}>Save New Route</Button>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default Home 
