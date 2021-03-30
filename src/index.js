import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import styled from 'styled-components';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dummyData from "./dummy-data";
import Column from "./column";

const Container = styled.div`
  display: flex;
`

class InnerList extends React.PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   if (
  //     nextProps.column === this.props.column &&
  //     nextProps.taskMap === this.props.taskMap &&
  //     nextProps.index === this.props.index
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(
      (taskId) => taskMap[taskId]
    );
    return <Column column={column} tasks={tasks} index={index} />
  }
}

class App extends React.Component {
  state = dummyData;

  onDragEnd = (result) => {
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
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      }
      this.setState(newState);
      return;
    }


    // reorder task
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); // from this index, remove 1 item
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      };
      this.setState(newState);
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
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    };
    this.setState(newState);

  };

  render() {
    return (
      <PageContainer>
      <PageTitle>Bracket</PageTitle>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <Container
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];

                return <InnerList
                        key={column.id}
                        index={index}
                        column={column}
                        taskMap={this.state.tasks}
                      />;
              })}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      </PageContainer>
    );
  }
}

const PageContainer = styled.div`
  margin: 16px;
`

const PageTitle = styled.div`
  font-size:26px;
  font-family:Poppins-Medium, Poppins;
  font-weight:500;
  margin-bottom: 16px;
`


ReactDOM.render(<App />, document.getElementById("root"));
