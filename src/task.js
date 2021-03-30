import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  padding: 8px 16px;
  margin: auto 0px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: ${props => props.isDragging ? 'lightgreen' : '#f4f4f4'};
`;

const TagContainer = styled.div`
  display: flex;
`




const TaskContent = ({task}) => {
  return (
    <>
      <TagContainer>
        {task.tags.map((tag) => {
          const tagClass = `tag ${tag}`
          return (<div className={tagClass}></div>)
        })}

      </TagContainer>
      <div className="card-title">
        {task.content}
      </div>
      <div className="card-subtitle">
        {task.subtitle}
      </div>
    </>
  );
};



export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <TaskContent task={this.props.task}/>

          </Container>
        )}
      </Draggable>
    );
  }
}
