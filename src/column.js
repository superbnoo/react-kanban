import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
  margin: 8px;
  background-color: white;
  border-radius: 2px;
  width: 362px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin: auto 0px;
  height: 50px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const TaskList = styled.div`
  padding: 8px 0px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`;

const TitleComponent = ({title}) => {
  return (
    <>
      <div>
        {title}
      </div>
      <div>
        . . .
      </div>
    </>
  );
};


class InnerList extends React.PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.tasks === this.props.tasks) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} index={index} task={task} />
    ));
  }
}

export default class Column extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            innerRef={provided.innerRef}
          >
            <Title {...provided.dragHandleProps}>
              <TitleComponent title={this.props.column.title} />
            </Title>

            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
