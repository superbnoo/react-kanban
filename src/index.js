import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useMediaQuery } from 'react-responsive'
import './index.css';
import "@atlaskit/css-reset";
import styled from 'styled-components';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dummyData from "./dummy-data";
import Column from "./column";


const Container = styled.div`
  padding: 8px;
`

const PageContainer = styled.div`
  padding: 8px;
`

const PageTitle = styled.div`
  font-size:26px;
  font-family:Poppins-Medium, Poppins;
  font-weight:500;
  margin-bottom: 16px;
  margin-left: 16px;
`

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(
      (taskId) => taskMap[taskId]
    );
    return <Column column={column} tasks={tasks} index={index} />
  }
}

// class App extends React.Component {
function App() {
  const [state, setState] = useState(dummyData);
  const isBigScreen = useMediaQuery({ minWidth: 768 });

  const onDragEnd = (result) => {
    // console.log('on dragend ' + JSON.stringify(result));
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      }
      setState(newState);
      return;
    }


    // reorder task
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); // from this index, remove 1 item
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        }
      };
      setState(newState);
      return;
    }

    const startStartIds = Array.from(start.taskIds);
    startStartIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startStartIds
    }

    const finishStartIds = Array.from(finish.taskIds);
    finishStartIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishStartIds
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    };
    setState(newState);
  };


  return (
    <PageContainer>
    <PageTitle>Bracket</PageTitle>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container className={isBigScreen ? 'board-container' : 'board-container-mobile'}
            innerRef={provided.innerRef}
            {...provided.droppableProps}
          >
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];

              return <InnerList
                      key={column.id}
                      index={index}
                      column={column}
                      taskMap={state.tasks}
                    />;
            })}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
    </PageContainer>
  );

}



ReactDOM.render(<App />, document.getElementById("root"));
