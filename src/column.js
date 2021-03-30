import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
  margin-right: 8px;
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
  padding: 0px 16px;
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

const TitleLabel = styled.div`
  font-size:16px;
  font-family:Poppins-Medium, Poppins;
  font-weight:500;
`

const TitleComponent = ({title}) => {
  return (
    <>
      <TitleLabel>
        {title}
      </TitleLabel>
      <svg width={24} height={6} viewBox="0 0 24 6">
        <defs>
          <style>{".a{fill:#cdccca;}"}</style>
        </defs>
        <path
          className="a"
          d="M18,3a3,3,0,1,1,3,3A3,3,0,0,1,18,3ZM9,3a3,3,0,1,1,3,3A3,3,0,0,1,9,3ZM0,3A3,3,0,1,1,3,6,3,3,0,0,1,0,3Z"
        />
      </svg>
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
