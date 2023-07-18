import { useSelector } from 'react-redux';
import { Text, Box } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';

import Task from './Task'

function TaskSection({ title }) {
    console.log({title})
     const { data: board } = useSelector(store => store.tasksManager);

     const [filteredTasks, setFilteredTasks] = useState([])

     const getFilteredTasks = () => {
          setFilteredTasks(board.tasks.filter(e => e.status === title));
     }

     useEffect(() => {
          getFilteredTasks();
     }, [board])

     return (<Droppable droppableId={title + "_section"}>
          {(provided, snapshot) =>
               <Box
               border={title=="Todo" ? "1px solid #635fc8" : title=="Doing"?"1px solid #ffa500":"1px solid #008e47"}
                    className={`task-section ${snapshot.isDraggingOver && 'task-dragging-over'}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
               >
                    <Text className='subHeading-text' data-title={title}>{title} ({filteredTasks?.length})</Text>
                    {
                         filteredTasks?.map((el, i) => <Task key={i} t={el} index={i} />)
                    }
                    {provided.placeholder}
               </Box>
          }
     </Droppable>)
}

export default TaskSection