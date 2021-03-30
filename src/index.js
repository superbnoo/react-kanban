import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useMediaQuery } from 'react-responsive'
import './index.css';
import "@atlaskit/css-reset";
import styled from 'styled-components';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dummyData from "./dummy-data";
import Column from "./column";
import LogoComponent from "./logo";


const Container = styled.div`
  padding: 8px;
  overflow-x: auto;
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

const Navbar = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
`

const UserAvatar = () => (
  <img className="user-avatar"
    src="https://i.ibb.co/jb8LN6W/user-5.png"
    alt="card preview"
  />
)

const DashboardIconComponent = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24">
    <defs>
      <style>{".a{fill:#f4f4f4;}.b{opacity:0.2;}"}</style>
    </defs>
    <g transform="translate(24 24) rotate(180)">
      <rect className="a" width={24} height={24} rx={3} />
      <rect
        className="b"
        width={7.32}
        height={10.5}
        rx={1.44}
        transform="translate(13.56 3.12)"
      />
      <rect
        className="b"
        width={7.32}
        height={16.5}
        rx={1.44}
        transform="translate(3.12 3.12)"
      />
    </g>
  </svg>
);


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
    <>
    <Navbar>
      <div className="logo">
        <LogoComponent />
        <div className="vl"></div>
        <DashboardIconComponent />
        <div className="dashboard-title">Boards</div>
        <div className="vl"></div>
      </div>
      <UserAvatar />

    </Navbar>
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
    </>
  );

}






ReactDOM.render(<App />, document.getElementById("root"));
