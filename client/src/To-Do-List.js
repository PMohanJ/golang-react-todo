import React from "react"
import axios from "axios"
import {Card, Header, Form, Input, Icon} from "semantic-ui-react"

let endPoint = "http://localhost:90000"

export default function ToDoList(){
    const [state, setState] = React.useState({
        task: "",
        items:[],
    })
    React.useEffect(()=>{
        getTask()
    })

    function onChange(event){
        setState({
            [event.target.name]: event.target.value
        });
    }

    function onSubmit(){
        let {task} = state
        if(task){
            axios.post(endPoint+"/api/task",
            {task,},
            {headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
        ).then((res) => {
            getTask()
            setState({
                task:""
            })
            console.log(res)
        })
        }
    }

    function getTask(){
        axios.get(endPoint + "/api/task").then((res)=>{
            if(res.data){
                setState({
                    items: res.data.map((item)=>{
                        let color = "yellow"
                        let style = {
                            wordWrap : "break-word",
                        }

                        if(item.status){
                            color = "green"
                            style["textDecorationLine"]= "line-thorugh";
                        }

                        return (
                            <Card key={item._id} color={color} fluid className="rough">
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={style}>{item.task}</div>
                                    </Card.Header>

                                    <Card.Meta textAlign="right">
                                        <Icon name="check circle"
                                              color="blue"
                                              onClick={()=> updateTask(item._id)}
                                        />
                                            <span style={{paddingRight:10}}>Undo</span>
                                            <Icon name="delete"
                                                  color="red"
                                                  onClick={()=>deleteTask(item._id)}
                                            />
                                            <span style={{paddingRight:10}}>Delete</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        )
                    })
                })
            }
            else{
                setState({
                    items:[],
                });
            }
        })
    }

    function updateTask(id){
        axios.put(endPoint+"/api/task"+id, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res) => {
            console.log(res)
            getTask()
        })
    }

    function undoTask(id){
        axios.put(endPoint+"api/undoTask"+ id, {
            headers:{
               "Content-Type": "application/x-www-form-urlencoded" 
            },
        }).then((res)=>{
            console.log(res)
            getTask()
        })
    }

    function deleteTask(id){
        axios.delete(endPoint+"/api/deleteTask"+id,{
            headers:{
                "Content-Type": "application/x-www-form-urlencoded" 
            },
        }).then((res)=>{
            console.log(res)
            getTask()
        })
    }

    return(
        <div>
            <div className="row">
                <Header className="header" as="h2" color="yello">
                    To Do List
                </Header>
            </div>

            <div className="row">
                <Form onSubmit={onSubmit}>
                    <Input type="text" name="task"
                            onChange={onChange}
                            value={state.task}
                            fluid
                            placeholder="Create task"
                            />
                    {/*<Button> create task</Button>*/}
                </Form>
                
                <div className="row">
                    <Card.Group>{state.items}</Card.Group>
                </div>
            </div>
        </div>
    )
}