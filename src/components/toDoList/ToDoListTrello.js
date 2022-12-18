import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Api from "../../axios/Axios";
import Card from "./Card";
import './ToDoListTrello.css'


export default function ToDoListPage({open, inProgress, finished, refresh}) {

      const [obj, setObj] = useState(
        {
                
            Todo: {
              name: "Aberto",
              color: "#f29c9690",
              items: open
            
            },
            In_Progress: {
              name: "Em Progresso",
              color: "#ede89f90",
              items: inProgress
            },
            Done: {
              name: "Finalizado",
              color: "#96d9ad90",
              items: finished
            }
          
    }
      );

    const aOpen = open
    const aInProgress = inProgress
    const aFinishid = finished





  function event(result) {
    const { destination, source } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newSourceObj = obj[source.droppableId];
      const copiedSObj = [...newSourceObj.items];
      const [reorderObj] = copiedSObj.splice(source.index, 1);

      const newDestinationObj = obj[destination.droppableId];
      const copiedDObj = [...newDestinationObj.items];
      copiedDObj.splice(destination.index, 0, reorderObj);

      setObj({
        ...obj,
        [source.droppableId]: {
          ...newSourceObj,
          items: copiedSObj
        },
        [destination.droppableId]: {
          ...newDestinationObj,
          items: copiedDObj
        }
      });
    } else {
      const newSourceObj = obj[source.droppableId];
      const copiedSObj = [...newSourceObj.items];
      const [reorderObj] = copiedSObj.splice(source.index, 1);
      copiedSObj.splice(destination.index, 0, reorderObj);
      setObj({
        ...obj,
        [source.droppableId]: {
          ...newSourceObj,
          items: copiedSObj
        }
      });
    }
  }

  
  const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
  };
  
  async function updateToDoList(id, status, position, title, description, category){
    console.log(description)
      const body = {id:id, status:status, position:position, title:title, description:description, category:category}
      await Api.patch('/user/todolist/', body, config)
  }
  useEffect(()=>{
      


    if(aOpen !== obj.Todo.items){
        obj.Todo.items.map((item, index)=>{
            updateToDoList(item.id ,1, index, item.title, item.description,item.category)
        })
        
    }
     if(aInProgress !== obj.In_Progress){
        obj.In_Progress.items.map((item, index)=>{
            updateToDoList(item.id ,2, index, item.title, item.description,item.category)
        })
        
    }
    if(aFinishid !== obj.Done.items){
        obj.Done.items.map((item, index)=>{
            updateToDoList(item.id ,3, index, item.title, item.description,item.category)
        })
        
    }
    


  },[obj])
  return (
      <>
      <div className="toDoList-page-tables">
        <DragDropContext onDragEnd={(result) => event(result)}>
          {Object.keys(obj).map((res, index) => {
            return (
              <Droppable droppableId={`${res}`} key={res}>
                {(provided, snapshot) => (
                  <div className="toDoList-page-simple-table" >
                    <span className="toDoList-page-table-title">
                      {obj[res].name}
                    </span>
                    <span className="toDoList-page-counter">
                      {obj[res].items.length}
                    </span>
                    <div {...provided.droppableProps} ref={provided.innerRef} >
                      {obj[res].items.map((res, index) => {
                        return (
                          <Draggable draggableId={(res.id).toString()} key={res.id} index={index} >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  ...provided.draggableProps.style
                                }}
                              >
                                  {<Card  item={res}  refresh={refresh}/>}

                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}
