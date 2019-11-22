import React from 'react';
import Axios from 'axios';
import ImageMapper from 'react-image-mapper';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            'hoveredArea' : ''
        }

        this.URL = "./Dots.png";
        this.MAP = {
            name: "my-map",
            areas: [
                { name: "1", shape: "poly", coords: [25, 33, 27, 300, 128, 240, 128, 94], fillColor: "blue" },
                { name: "2", shape: "poly", coords: [219, 118, 220, 210, 283, 210, 284, 119]},
                { name: "3", shape: "circle", coords: [378, 131, 10], preFillColor: "green" },
                { name: "4", shape: "circle", coords: [356, 131, 10] , preFillColor: "red" },
                { name: "5", shape: "circle", coords: [334, 131, 10] , preFillColor: "blue"},
            ]
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
    }

    moveOnArea(area, evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `You moved on ${area.shape} ${
				area.name
			} at coords ${JSON.stringify(coords)} !`
		});
	}

    getActive() {
        Axios.get('http://localhost:8000/api/active')
            .then(res => {
                const data = res.data
                localStorage.setItem('routes', JSON.stringify(data.data))
            })
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

        console.log(this.state)
        return (
            <>
                {this.props.page === 0 ?
                    <>
                        <ImageMapper src={this.URL} map={this.MAP} width={500}
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

                {this.props.page !== 0 ?
                    <>
                        Logged In Home Page
                    </>
                    : null}
            </>
        )
    }
}

export default Home 
