import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
export default class Add extends Component {
    constructor(){
        super();
        this.onChangeCategoryName=this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            category_name: '',
            alert_message : ''
        }
    }
    onChangeCategoryName(e){
        this.setState({
            category_name:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        const category={
            category_name: this.state.category_name
        }
        axios.post('http://127.0.0.1:8000/api/category/store',category)
        .then(res=>{
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"});
        })
    }
    render() { 
        return (
            <div>
                <hr />
                {this.state.alert_message=="success"?<SuccessAlert message={" tambah Berhasil"}/>:null}
                {this.state.alert_message=="error"?<ErrorAlert message={" tambah Gagal"} />:null}
                <form onSubmit = {this.onSubmit}>
				<div class="form-group">
                <p>Name</p>
                    <input type="text" class="form-control" 
                    value={this.state.category_name}
                    onChange={this.onChangeCategoryName}
                    id="category_name" aria-describedby="emailHelp" placeholder="Enter Category"/>
				</div>
					
				<div class="form-group">
					<button class="btn btn-success" type="submit" >Submit</button>
				</div>
			
		</form>
            </div>
        );
    }
}

