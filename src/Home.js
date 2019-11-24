import React from 'react';
import Axios from 'axios';
import ImageMapper from 'react-image-mapper';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            'hoveredArea' : ''
        }

        this.URL1 = "./GymOverview2.png";
        this.MAP1 = {
            name: "my-map",
            areas: [
                { name: "1", shape: "circle", coords: [44, 494, 10], preFillColor: "red" },
                { name: "2", shape: "circle", coords: [44, 469, 10] , preFillColor: "yellow" },
                { name: "3", shape: "circle", coords: [49, 447, 10] , preFillColor: "green"},
                { name: "4", shape: "circle", coords: [58, 425, 10], preFillColor: "white" },
                { name: "5", shape: "circle", coords: [69, 405, 10] , preFillColor: "blue" },
                { name: "6", shape: "circle", coords: [80, 385, 10] , preFillColor: "black"},
                { name: "7", shape: "circle", coords: [93, 365, 10], preFillColor: "purple" },
                { name: "8", shape: "circle", coords: [93, 343, 10] , preFillColor: "pink" },
                { name: "9", shape: "circle", coords: [93, 321, 10] , preFillColor: "orange"},
                { name: "10", shape: "circle", coords: [93, 299, 10], preFillColor: "red" },
                { name: "11", shape: "circle", coords: [93, 277, 10] , preFillColor: "yellow" },
                { name: "12", shape: "circle", coords: [93, 255, 10] , preFillColor: "green"},
                { name: "13", shape: "circle", coords: [93, 233, 10], preFillColor: "white" },
                { name: "14", shape: "circle", coords: [93, 211, 10] , preFillColor: "blue" },
                { name: "15", shape: "circle", coords: [73, 199, 10] , preFillColor: "black"},
                { name: "16", shape: "circle", coords: [53, 187, 10], preFillColor: "purple" },
                { name: "17", shape: "circle", coords: [44, 163, 10] , preFillColor: "pink" },
                { name: "18", shape: "circle", coords: [44, 137, 10] , preFillColor: "orange"},
                { name: "19", shape: "circle", coords: [44, 113, 10], preFillColor: "red" },
                { name: "20", shape: "circle", coords: [44, 89, 10] , preFillColor: "yellow" },
                { name: "21", shape: "circle", coords: [57, 70, 10] , preFillColor: "green"},
                { name: "22", shape: "circle", coords: [80, 60, 10], preFillColor: "white" },
                { name: "23", shape: "circle", coords: [103, 60, 10] , preFillColor: "blue" },
                { name: "24", shape: "circle", coords: [126, 60, 10] , preFillColor: "black"},
                { name: "25", shape: "circle", coords: [149, 60, 10], preFillColor: "purple" },
                { name: "26", shape: "circle", coords: [172, 60, 10] , preFillColor: "pink" },
                { name: "27", shape: "circle", coords: [195, 60, 10] , preFillColor: "orange"},
                { name: "28", shape: "circle", coords: [218, 70, 10], preFillColor: "red" },
                { name: "29", shape: "circle", coords: [235, 90, 10] , preFillColor: "yellow" },
                { name: "30", shape: "circle", coords: [240, 112, 10] , preFillColor: "green"},
                { name: "31", shape: "circle", coords: [240, 135, 10], preFillColor: "white" },
                { name: "32", shape: "circle", coords: [240, 158, 10] , preFillColor: "blue" },
                { name: "33", shape: "circle", coords: [253, 179, 10] , preFillColor: "black"},
                { name: "34", shape: "circle", coords: [267, 195, 10], preFillColor: "purple" },
                { name: "35", shape: "circle", coords: [282, 210, 10] , preFillColor: "pink" },
                { name: "36", shape: "circle", coords: [297, 225, 10] , preFillColor: "orange"},
                
                

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
    
    getActive() {
        Axios.get('http://localhost:8000/api/active')
            .then(res => {
                const data = res.data
                localStorage.setItem('routes', JSON.stringify(data.data))
            })
    }
    
    render() {

        console.log(this.state)
        return (
            <>
                {this.props.page === 0 ?
                    <>
                        <ImageMapper src={this.URL1} map={this.MAP1} width={1000}
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
