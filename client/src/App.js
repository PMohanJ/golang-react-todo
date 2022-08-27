import React from "react";
import ToDoList from "./ToDoList"
import {Container} from "semantic-ui-react"
import "./App.css"

export default function App(){
  return(
    <div>
      <Container>
        <ToDoList/>
      </Container>
    </div>
  )
}