import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router,  Link , Route} from "react-router-dom";
import Pagination from "react-js-pagination";
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
export default class Listing extends Component {
    constructor()
    {
        super();
        this.state={
            categories:[],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed:3
        }
        this.HandlePageChange=this.HandlePageChange.bind(this);
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/category')
        .then(response=>{
            this.setState({
                categories:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }
    onDelete(category_id){
        axios.delete('http://127.0.0.1:8000/api/category/delete/'+category_id)
        .then(response=>{
            var categories = this.state.categories;
            for(var i=0; i< categories.length; i++){
                if(categories[i].id==category_id){
                    categories.splice(i,1);
                    this.setState({categories:categories});
                }
            }
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"});
        })
       
    }
    HandlePageChange(pageNumber){
        console.log('active page is '+{pageNumber});
      axios.get('http://127.0.0.1:8000/api/category?page='+pageNumber)
      .then(response=>{
          this.setState({
              categories:response.data.data,
              itemsCountPerPage:response.data.per_page,
              totalItemsCount:response.data.total,
              activePage:response.data.current_page
          });
      });
    }
    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message=="success"?<SuccessAlert/>:null}
                {this.state.alert_message=="error"?<ErrorAlert/>:null}
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Created  At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map(category=>
                                {
                                    return(
                                    <tr key={category.id}>
                                        <td scope="row">{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.active==1?("active"):("Inactive")}</td>
                                        <td>{category.created_at}</td>
                                        <td>{category.updated_at}</td>
                                        <td>
                                            <Link to={'/category/edit/'+category.id}>Edit</Link> | 
                                            <a href="#" onClick={this.onDelete.bind(this,category.id)}>Delete</a>
                                            </td>
                                    </tr>
                                    )
                                })
                        }
                        
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                    onChange={this.HandlePageChange}
                    itemsClass='page-item'
                    linkClass='page-link'
                    />
                </div>
            </div>
        );
    }
}

