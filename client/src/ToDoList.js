import React from "react";
import axios from "axios"
import {Card, Header} from "semantic-ui-react"
import "./ToDoList.css"

let endPoint = "http://localhost:9000"
export default function ToDoList(){
    const [state, setState] = React.useState({
        task:"",
        items:[],
    })

    React.useEffect(()=>{
        getTask()
    })
    
    function onChange(event){
        setState(prevState => {
            return {
            [event.target.name] : event.target.value,
            items: prevState.items
            }
        })
    }

    function onSubmit(){
        let task = state.task
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

                setState(prevState=>{
                    return{
                        task:"",
                        items: prevState.items
                    }  
                })

            })
        }
    }

    function getTask(){
        
    }

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
                           value={state.task}
                           placeholder="Create a todo"
                    />
                </Form>
            </div>

            <div className="row">
                <Card>
                    <Card.Group>{state.items}</Card.Group>
                </Card>
                
            </div>
        </div>
    )
}