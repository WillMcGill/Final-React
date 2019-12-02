import React from 'react';

class Pagination extends React.Component{

constructor(props){
    super(props);

    this.state = {
        data = []
    }
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
    

    render(){

        const tableData = this.state.data.map((item) => {

            return (
                <tr>
                    <td>{item.wall_location}</td>
                    <td>{item.type}</td>
                    <td>{item.difficulty}</td>
                    <td>{item.set_date}</td>
                    <td>{item.expire_date}</td>
                    <td><button id={item.id} type="button" class="btn btn-danger" onClick={this.toggle}>Edit</button></td>
                </tr>
            )
        });
        return(
            <>
            <div className="commentBox">
        <CommentList data={this.state.data} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
            </>
        )
    }
}

export default Pagination;