import React from 'react';
import Axios from 'axios';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap';
import ImageMapper from 'react-image-mapper';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hoveredArea: '',
            routeData: [],
            routeDetails: [],
            currentComments: [],
            URL: "./Gym3DOverview.png",
            toggleModal: false,
            tableData: null,
            render: 0
        }
        this.getActive = this.getActive.bind(this)
        this.getRouteDetails = this.getRouteDetails.bind(this)
        this.toggle = this.toggle.bind(this)
        this.autoUpdate = this.autoUpdate.bind(this)
    }
    getActive() {
        Axios.get('https://sloper.appspot.com/api/show')
            .then(res => {
                const data = res.data
                localStorage.setItem('routes', JSON.stringify(data))
                this.setState({ routeData: data })
            })

    }

    getRouteDetails() {
        Axios.get('https://sloper.appspot.com/api/active/')
            .then(res => {
                let routeDetails = res.data;
                this.setState({ routeDetails: routeDetails })
            })

    }
    getComments = async () => {
        let res = await Axios.get('https://sloper.appspot.com/api/comments/' + this.clickId);
        let data = res.data;
        this.setState({ currentComments: data });
        const commentTable = this.state.currentComments.data.map((item) => {
            return (
                <tr>
                    <td>{item.comments}</td>
                    <td>{item.rating}</td>
                </tr>
            )
        });

        this.setState({ tableData: <tbody>{commentTable}</tbody> });

    };

    componentDidMount() {
        this.getActive();
        this.getRouteDetails();
    }

    componentDidUpdate() {

    }


    clicked(area) {
        this.setState({
            msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
                area.coords
            )} !`
        });

        this.toggle();
        this.clickId = area.name;
        this.routeType = this.state.routeDetails[this.clickId - 1].type;
        this.routeDiff = this.state.routeDetails[this.clickId - 1].difficulty;
        this.routeSet = this.state.routeDetails[this.clickId - 1].set_date;
        this.routeExpire = this.state.routeDetails[this.clickId - 1].expire_date;
        this.getComments();

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
    autoUpdate() {
        setTimeout(() => {
            this.setState({ render: this.props.render })
            this.getActive();
            this.getRouteDetails();
        }, 1000)


        return (
            <>
            </>
        )
    }
    render() {
        return (
            <>

                <div className="jumbotron jumbotron-fluid h-20" id = "homebanner">
                    <div className="container">
                        <h1 className="display-3">Welcome to Sloper</h1>
                        <p className="lead">Click on the interactive map to view details or leave a comment below</p>
                    </div>
                </div>
                {this.props.render > this.state.render ? this.autoUpdate() : null}
                {this.props.page <= 3 && this.state.routeData.length > 0 ?
                    
                    <div className="row">
                        
                        <div className="mx-auto">
                            
                            <ImageMapper src={this.state.URL} map={
                                {
                                    name: "my-map",
                                    areas: this.state.routeData
                                }
                            } width={1000}
                                onClick={area => this.clicked(area)}
                                onMouseEnter={area => this.enterArea(area)}
                                onMouseLeave={area => this.leaveArea(area)}
                                onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                                onImageClick={evt => this.clickedOutside(evt)}
                                onImageMouseMove={evt => this.moveOnImage(evt)}
                            />

                            </div>
                            
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
                        <ModalHeader toggle={this.toggle}>Route Details At Position {this.clickId}</ModalHeader>
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
                                    <Label for="exampleSelect"><center>User Comments</center></Label>
                                    <ModalBody>
                                        <table className = "table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Comment</th>
                                                    <th>Rating</th>
                                                </tr>
                                            </thead>
                                        {this.state.tableData}
                                        </table>
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
