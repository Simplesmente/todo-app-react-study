import React from 'react';
import axios from 'axios';
 
import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends React.Component {

    constructor(){
        super();
        this.state = {description:'',list:[]};
        
    }

    componentWillMount() {
        this.refresh();
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/`:'';

        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({ ...this.state, description, list: resp.data }) )
    }

    handleSearch() {
        this.refresh(this.state.description);
    }

    handleAdd() {
        const description = this.state.description;

        axios.post(URL, {description})
                 .then( resp => this.refresh() );        
    }

    handleRemove(data) {
        axios.delete(`${URL}/${data._id}`)
            .then( resp => this.refresh(this.state.description));
    }

    handleMarkAsDone(data) {
        axios.put(`${URL}/${data._id}`, { ...data, done: true })
            .then(resp => this.refresh(this.state.description));
    }

     handleMarkAsPending(data) {
        axios.put(`${URL}/${data._id}`, { ...data, done: false })
            .then(resp => this.refresh(this.state.description));
    }


     handleChange(e) {        
        this.setState({...this.state, description: e.target.value});
    }

    handleClear(){
        this.refresh();
    }

    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="cadastro" />
                <TodoForm description={this.state.description} 
                            handleChange={this.handleChange.bind(this)}
                            handleAdd={this.handleAdd.bind(this)}
                            handleSearch={this.handleSearch.bind(this)} 
                            handleClear={this.handleClear.bind(this)}/>

                <TodoList list={this.state.list} handleRemove={this.handleRemove.bind(this)}
                                                  handleMarkAsDone={this.handleMarkAsDone.bind(this)}
                                                   handleMarkAsPending={this.handleMarkAsPending.bind(this)} />
            </div>
        )
    }
}