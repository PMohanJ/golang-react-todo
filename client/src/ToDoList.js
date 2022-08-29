import React from "react";
import axios from "axios"
import {Card, Header, Icon, Form, Input} from "semantic-ui-react"
import "./ToDoList.css"

let endPoint = "http://localhost:9000"
export default function ToDoList(){

    // Holds the card elements to render on the page 
    const [state, setState] = React.useState({
        items:[],
    })
    const [taskstate, setTaskState] = React.useState({
        task: "",
    })

    // After first rendering of the page make function call 
    React.useEffect(()=>{
        getTask()
    })
    
    function onChange(event){
        setTaskState({
            [event.target.name] : event.target.value,
        })
    }

    // submit the data to store in db
    function onSubmit(event){
        let task = taskstate.task
        if(task){
            axios.post(endPoint+"/api/tasks", 
            {task,},
            {headers:{
                "Content-Type": "applicationx-www-form-urlencoded",
                },
            }).then((res)=>{
                console.log(res)
                //Updating the page 
                getTask()
                
                // Clear the text from input 
                setTaskState({
                        task:"",
                })

            })
        }
    }

    // The received data from api is list of objects so using map to iterate over 
    // each object; creating card element and storing them in items array   
    function getTask(){
        axios.get(endPoint+"/api/task").then((res=>{
            if(res.data){
                setState({
                    items: res.data.map((item)=>{

                        // setting up some colors and style for text in card
                        let color= "yellow"
                        let style = {
                            wordWrap: "break-word",
                        }

                        if(item.status){
                            color = "green"
                            style["textDecoration"] = "line-through"
                        }
                        return(
                            <Card key={item._id} color={color} className="rough" fluid>
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={style}>{item.task}</div>
                                    </Card.Header>

                                    <Card.Meta textAlign="right">
                                        <Icon name="check circle"
                                              color="blue"
                                              onClick={()=>updateTask(item._id)}
                                        />
                                        <span style={{paddingRight:10}}>Done</span>

                                        <Icon name="undo alternate"
                                              color="yellow"
                                              onClick={()=>undoTask(item._id)}
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

        }))
    }

    // After performing any CRUD operation perform getTask() 
    // to update the UI

    function undoTask(id){
        axios.put(endPoint+"/api/undoTask/"+id,{
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res)
            getTask()
        })
    }

    function updateTask(id){
        axios.put(endPoint+"/api/tasks/"+id,{
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res)
            getTask()
        })
    }

    function deleteTask(id){
        axios.delete(endPoint+"/api/deleteTask/"+id,{
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res)
            getTask()
        })
    }

    
    return(
        <div>
            <div className="row">
                <Header className="header" as="h2" color="yellow">
                    To Do List
                </Header>
            </div>

            <div className="row">
                <Form onSubmit={onSubmit}>
                    <Input type="text" name="task"
                           onChange={onChange} 
                           value={taskstate.task}
                           fluid
                           placeholder="Create a todo"
                    />
                </Form>
            </div>

            <div className="row">
                    <Card.Group>{state.items}</Card.Group>
            </div>
        </div>
    )
}