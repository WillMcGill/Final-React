import React from 'react';
import Axios from 'axios';
import ImageMapper from 'react-image-mapper';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            'hoveredArea' : ''
        }
        this.test = 
        [{ name: "1", shape: "circle", coords: [44, 494, 10], preFillColor: "red" },
        { name: "2", shape: "circle", coords: [49, 447, 10] , preFillColor: "green"},
        { name: "3", shape: "circle", coords: [69, 405, 10] , preFillColor: "blue" },
        { name: "5", shape: "circle", coords: [93, 321, 10] , preFillColor: "orange"},
        { name: "4", shape: "circle", coords: [93, 365, 10], preFillColor: "purple" },
        { name: "6", shape: "circle", coords: [93, 277, 10] , preFillColor: "yellow" },
        { name: "7", shape: "circle", coords: [93, 233, 10], preFillColor: "white" },
        { name: "8", shape: "circle", coords: [73, 199, 10] , preFillColor: "black"},
        { name: "9", shape: "circle", coords: [44, 163, 10] , preFillColor: "pink" },
        { name: "10", shape: "circle", coords: [44, 113, 10], preFillColor: "red" },
        { name: "11", shape: "circle", coords: [57, 70, 10] , preFillColor: "green"},
        { name: "12", shape: "circle", coords: [103, 60, 10] , preFillColor: "blue" },
        { name: "13", shape: "circle", coords: [149, 60, 10], preFillColor: "purple" },
        { name: "14", shape: "circle", coords: [195, 60, 10] , preFillColor: "orange"},
        { name: "15", shape: "circle", coords: [235, 90, 10] , preFillColor: "yellow" },
        { name: "16", shape: "circle", coords: [240, 135, 10], preFillColor: "white" },
        { name: "17", shape: "circle", coords: [253, 179, 10] , preFillColor: "black"},
        { name: "18", shape: "circle", coords: [282, 210, 10] , preFillColor: "pink" },
        { name: "19", shape: "circle", coords: [305, 230, 10] , preFillColor: "orange"},
        { name: "20", shape: "circle", coords: [328, 250, 10], preFillColor: "red" },
        { name: "21", shape: "circle", coords: [353, 270, 10] , preFillColor: "green"},
        { name: "22", shape: "circle", coords: [383, 270, 10] , preFillColor: "blue" },
        { name: "23", shape: "circle", coords: [413, 270, 10], preFillColor: "purple" },
        { name: "24", shape: "circle", coords: [443, 270, 10] , preFillColor: "orange"},
        { name: "25", shape: "circle", coords: [473, 270, 10] , preFillColor: "yellow" },
        { name: "26", shape: "circle", coords: [503, 270, 10], preFillColor: "white" },
        { name: "27", shape: "circle", coords: [525, 250, 10] , preFillColor: "black"},
        { name: "28", shape: "circle", coords: [545, 230, 10] , preFillColor: "pink" },
        { name: "29", shape: "circle", coords: [565, 210, 10], preFillColor: "red" },
        { name: "30", shape: "circle", coords: [585, 190, 10] , preFillColor: "green"},
        { name: "31", shape: "circle", coords: [605, 170, 10] , preFillColor: "blue" },
        { name: "32", shape: "circle", coords: [615, 130, 10], preFillColor: "purple" },
        { name: "33", shape: "circle", coords: [645, 94, 10] , preFillColor: "orange"},
        { name: "34", shape: "circle", coords: [697, 63, 10] , preFillColor: "yellow" },
        { name: "35", shape: "circle", coords: [730, 63, 10], preFillColor: "white" },
        { name: "36", shape: "circle", coords: [763, 63, 10] , preFillColor: "black"},
        { name: "37", shape: "circle", coords: [798, 80, 10] , preFillColor: "pink" },
        { name: "38", shape: "circle", coords: [801, 119, 10], preFillColor: "red" },
        { name: "39", shape: "circle", coords: [782, 145, 10] , preFillColor: "green"},
        { name: "40", shape: "circle", coords: [769, 178, 10] , preFillColor: "blue" },
        { name: "41", shape: "circle", coords: [769, 218, 10], preFillColor: "purple" },
        { name: "42", shape: "circle", coords: [794, 252, 10] , preFillColor: "orange"},
        { name: "43", shape: "circle", coords: [803, 283, 10] , preFillColor: "yellow" },
        { name: "44", shape: "circle", coords: [803, 313, 10], preFillColor: "white" },
        { name: "45", shape: "circle", coords: [803, 343, 10] , preFillColor: "black"},
        { name: "46", shape: "circle", coords: [792, 385, 10] , preFillColor: "pink" },
        { name: "47", shape: "circle", coords: [789, 416, 10], preFillColor: "red" },
        { name: "48", shape: "circle", coords: [789, 446, 10] , preFillColor: "green"},
        { name: "49", shape: "circle", coords: [803, 483, 10] , preFillColor: "blue" },
        { name: "50", shape: "circle", coords: [818, 507, 10], preFillColor: "purple" },
        { name: "51", shape: "circle", coords: [848, 507, 10] , preFillColor: "orange"},
        { name: "52", shape: "circle", coords: [875, 484, 10] , preFillColor: "yellow" },
        { name: "53", shape: "circle", coords: [875, 444, 10], preFillColor: "white" },
        { name: "54", shape: "circle", coords: [875, 404, 10] , preFillColor: "black"},
        { name: "55", shape: "circle", coords: [875, 364, 10] , preFillColor: "pink" },
        { name: "56", shape: "circle", coords: [875, 324, 10], preFillColor: "red" },
        { name: "57", shape: "circle", coords: [875, 284, 10] , preFillColor: "green"},
        { name: "58", shape: "circle", coords: [875, 244, 10] , preFillColor: "blue" },
        { name: "59", shape: "circle", coords: [875, 204, 10], preFillColor: "purple" },
        { name: "60", shape: "circle", coords: [875, 164, 10] , preFillColor: "orange"},
        { name: "61", shape: "circle", coords: [875, 124, 10] , preFillColor: "yellow" },
        { name: "62", shape: "circle", coords: [875, 84, 10], preFillColor: "white" },
        { name: "63", shape: "circle", coords: [918, 63, 10] , preFillColor: "black"},
        { name: "64", shape: "circle", coords: [959, 83, 10] , preFillColor: "pink" },
        { name: "65", shape: "circle", coords: [959, 123, 10], preFillColor: "red" },
        { name: "66", shape: "circle", coords: [959, 163, 10] , preFillColor: "green"},
        { name: "67", shape: "circle", coords: [959, 203, 10] , preFillColor: "blue" },
        { name: "68", shape: "circle", coords: [959, 243, 10], preFillColor: "purple" },
        { name: "69", shape: "circle", coords: [959, 283, 10] , preFillColor: "orange"},
        { name: "70", shape: "circle", coords: [959, 323, 10] , preFillColor: "yellow" },
        { name: "71", shape: "circle", coords: [959, 363, 10], preFillColor: "white" },
        { name: "72", shape: "circle", coords: [959, 403, 10] , preFillColor: "black"},
        { name: "73", shape: "circle", coords: [959, 443, 10] , preFillColor: "pink" },
        { name: "74", shape: "circle", coords: [959, 473, 10] , preFillColor: "red"},
        { name: "75", shape: "circle", coords: [959, 503, 10] , preFillColor: "green" }]

    
        this.URL1 = "./GymOverview2.png";
        this.MAP1 = {
            name: "my-map",
            areas:  this.test

            
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
        Axios.get('http://localhost:8000/api/show')
            .then(res => {
                const data = res.data
                this.test = data
                console.log((this.test))
                localStorage.setItem('routes', JSON.stringify(data))
                
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
