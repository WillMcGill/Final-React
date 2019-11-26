import React from 'react';
import Axios from 'axios';


class Admin extends React.Component{

constructor(props){
    super(props)

    this.state = {
        data : []
    }

    this.getAllRoutes = this.getAllRoutes.bind(this)
}

getAllRoutes(){

Axios.get('http://localhost:8000/api/active')
    .then(res=>{
        this.setState({data: res.data})
    })
}

componentDidMount(){
    this.getAllRoutes()
}

    render(){

        const tableData = this.state.data.map((item) =>{
            return(
                <tr>
                    <td>{ item.wall_location }</td>
                    <td>{ item.type }</td>
                    <td>{ item.difficulty}</td>
                    <td>{ item.set_date }</td>
                    <td>{ item.expire_date }</td>
                </tr>
            )
        });
        
        console.log(this.state.data)
        return(
            <>
            {tableData}
            </>
        )
    }
    
}

export default Admin