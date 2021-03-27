import React, { Component } from 'react'
import Card from './userCard'
import API from '../api'
import Button from './Button';
import Input from './Input'
import Edit from './EditCom'
import { toast } from 'react-toastify';
import validator from 'validator'
import Spinner from './Spinner'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class users extends Component {
    constructor(props) {
        super();

        this.state = {
            people: [],
            newName: '',
            newURL: '',
            error : false,
            errorMsg : '',
            currentEdit: {
                id: null,
                name: '',
                url: '',
                isShow: 0
            },
            loading : false
        }
    }

     notification = (text, where) => {
         toast.info(text , {position: where , autoClose:3000})
    }

     updateMyApi = async() => {
         this.setState({loading : true})
        const response = await API.get('/')
        this.setState(
            {
                 people: response.data ,
                 newName: '',
                  newURL: '' ,
                  currentEdit: {id: null ,name: '', url: '', isShow: 0 } ,
                   loading : false})
    }

    componentDidMount = async () => {
       this.updateMyApi();
    }

    DeleteAction = (e) => {
        let theID = e.target.id
        API.delete(`/${theID}`)
            .then(() => {                           
                this.updateMyApi();
                this.notification(`Item ${theID} has been deleted` , toast.POSITION.TOP_CENTER)
            })
    }


    handleNewInput = (e) => {
        this.setState({error : false})
        this.setState({ [e.target.id]: e.target.value })
    }

    PostAction = () => {
        if(this.state.newName.length > 4) {
            if (validator.isURL(this.state.newURL)) {
                API.post('/', { name: this.state.newName, avatar: this.state.newURL })  
            .then(() => {
                this.updateMyApi();
                this.notification(`New Item has been created succesfuly` , toast.POSITION.TOP_LEFT)
            })
              } else {
                this.setState({error : true , errorMsg : 'Not a valid URL'})
              }
        } else {this.setState({error : true , errorMsg : 'Name must be at least 5 chars'})}  
    } 

    EditAction = (e) => {
        let myState = this.state.people;
        let requested = myState.filter(item => {
            return item.id === e.target.id
        })
        let newCurrent = {
            id: requested[0].id,
            name: requested[0].name,
            url: requested[0].avatar,
            isShow: 1
        }
        this.setState({ currentEdit: newCurrent })
    }

    CompleteEdit = () => {
        API.put(`/${this.state.currentEdit.id}` , {name : this.state.currentEdit.name , avatar : this.state.currentEdit.url})
        .then(() => {
            this.updateMyApi();
            this.notification(`Item has been edited successfuly` , toast.POSITION.TOP_LEFT )
        })
       
    }

    handleChangeName = (e) => {
        let updaded = Object.assign({} , this.state.currentEdit , {name: e.target.value})
        this.setState({ currentEdit:updaded })
    }
    handleChangeURL = (e) =>{
        let updaded = Object.assign({} , this.state.currentEdit , {url: e.target.value})
        this.setState({ currentEdit:updaded })
    }
    DiscardEdit = () => {
        let updated = {...this.state.currentEdit , isShow:0}
        this.setState({currentEdit: updated})
    }

    render() {
        return (
            <div>
                <div className="newUser">
                    <h2>Insert new User:</h2>
                <Input name="Name:" id="newName" value={this.state.newName} onChange={this.handleNewInput} />
                <Input name="Picture URL:" id="newURL" value={this.state.newURL} onChange={this.handleNewInput} />
                <Button onClick={this.PostAction} title="Add" />
                {this.state.error && <p style={{color:'red'}}>{this.state.errorMsg}</p>}
                </div>
                <div className="userGrid">
                    {this.state.people.map(item => {
                        return (
                            <Card key={item.id} id={item.id} name={item.name} title="Delete"
                             title2="Edit" pic={item.avatar} onClick={this.DeleteAction} onClick2={this.EditAction} />
                        )
                    })}
                    {this.state.loading === true && <Spinner/>}
                </div>
                 {this.state.currentEdit.isShow === 1 && 
                <Edit id={this.state.currentEdit.id} name="Name:" name2="PictureURl:" 
                value1={this.state.currentEdit.name} value2={this.state.currentEdit.url} onChange={this.handleChangeName}
                onClick={this.CompleteEdit} onClick2={this.DiscardEdit} onChange2={this.handleChangeURL} />}
            </div>

        )

    }
}


export default users
