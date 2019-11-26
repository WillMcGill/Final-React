import React from 'react';
import Axios from 'axios';
import ImageMapper from 'react-image-mapper';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hoveredArea: '',
            routeData: [],
            URL: "./GymOverview2.png"
        }
        this.getActive = this.getActive.bind(this)
    }
    getActive() {
        //check localstorage first, if not in localstorage, run axios, else set state from localstorage
        Axios.get('http://localhost:8000/api/show')
            .then(res => {
                const data = res.data
                localStorage.setItem('routes', JSON.stringify(data))
                this.setState({ routeData: data })
            })
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
        });
    }

    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });
    }

    render() {
        return (
            <>
                {this.props.page <= 3 && this.state.routeData.length > 0 ?
                    <>

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
                    </>
                    : null}

                {this.props.page !== 0 ? "Logged In Home Page" : null}
            </>
        )
    }
}

export default Home 
