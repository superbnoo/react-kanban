import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  padding: 16px;
  margin: auto 0px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: ${props => props.isDragging ? 'lightgreen' : '#f4f4f4'};
`;

const TagContainer = styled.div`
  display: flex;
`

const CardFooterContainer = styled.div`
  display: flex;
  margin: auto 0px;
  align-items: center;
  justify-content: space-between;
`

const AvatarContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 8px;
`

const StatContainer = styled.div`
  display: flex;
  margin: auto 0px;
  align-items: center;
  padding-top:8px;
`

const MsgImage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <defs>
      <style>{".cls-1{opacity:0.2;}.cls-2{opacity:0;}"}</style>
    </defs>
    <g className="cls-1">
      <rect id="Rectangle" className="cls-2" width="20" height="20"/>
      <circle id="Oval" cx="0.833" cy="0.833" r="0.833" transform="translate(9.167 8.333)"/>
      <circle id="Oval-2" data-name="Oval" cx="0.833" cy="0.833" r="0.833" transform="translate(12.5 8.333)"/>
      <circle id="Oval-3" data-name="Oval" cx="0.833" cy="0.833" r="0.833" transform="translate(5.833 8.333)"/>
      <path id="Shape" d="M.833,15.834A.838.838,0,0,1,0,15V2.5A2.5,2.5,0,0,1,2.5,0H14.167a2.5,2.5,0,0,1,2.5,2.5v8.333a2.5,2.5,0,0,1-2.5,2.5H5.426A.833.833,0,0,0,5,13.45L1.258,15.717A.832.832,0,0,1,.833,15.834ZM2.5,1.667a.834.834,0,0,0-.833.833V13.525l2.5-1.5a2.5,2.5,0,0,1,1.292-.358h8.708A.834.834,0,0,0,15,10.833V2.5a.834.834,0,0,0-.833-.833Z" transform="translate(1.667 2.5)"/>
    </g>
  </svg>
)

const HeartImage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <defs>
      <style>{".cls-1{opacity:0.2;}.cls-2{opacity:0;}"}</style>
    </defs>
    <g id="heart-outline" className="cls-1">
      <rect id="Rectangle" className="cls-2" width="20" height="20"/>
      <path id="Shape" d="M8.341,14.166H8.327a.827.827,0,0,1-.585-.241L1.268,7.441A4.36,4.36,0,0,1,7.434,1.274l.9.9.9-.9A4.361,4.361,0,0,1,15.4,7.441L8.926,13.925A.828.828,0,0,1,8.341,14.166Zm-4-12.5a2.653,2.653,0,0,0-1.891.784,2.706,2.706,0,0,0,0,3.808L8.334,12.15l5.884-5.892a2.706,2.706,0,0,0,0-3.808,2.766,2.766,0,0,0-3.8,0l-1.491,1.5a.827.827,0,0,1-.592.247.837.837,0,0,1-.591-.247L6.251,2.45a2.685,2.685,0,0,0-1.89-.784h-.02Z" transform="translate(1.666 3.334)"/>
    </g>
  </svg>

)

const AttachImage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <defs>
      <style>{".cls-1{opacity:0.2;}.cls-2{opacity:0;}"}</style>
    </defs>
    <g id="attach-outline" className="cls-1">
      <rect id="Rectangle" className="cls-2" width="20" height="20"/>
      <path id="Path" d="M5.252,15.834A5.192,5.192,0,0,1,1.56,14.268a5,5,0,0,1-.183-7.075L7.51,1a3.425,3.425,0,0,1,2.5-1,3.733,3.733,0,0,1,2.658,1.125,3.633,3.633,0,0,1,.125,5.108L6.627,12.426a2.117,2.117,0,0,1-1.508.625,2.267,2.267,0,0,1-1.625-.683,2.233,2.233,0,0,1-.067-3.142L9.119,3.509A.833.833,0,0,1,10.26,4.684L4.569,10.4a.567.567,0,0,0,.067.792.65.65,0,0,0,.442.192.467.467,0,0,0,.333-.133l6.158-6.192A1.967,1.967,0,0,0,11.444,2.3a1.983,1.983,0,0,0-2.725-.125L2.56,8.334a3.333,3.333,0,0,0,.183,4.725,3.517,3.517,0,0,0,2.5,1.075,3.058,3.058,0,0,0,2.175-.883l6.158-6.192A.834.834,0,0,1,14.76,8.234L8.6,14.426A4.708,4.708,0,0,1,5.252,15.834Z" transform="translate(2.49 1.666)"/>
    </g>
  </svg>

)

const TaskContentContainer = styled.div`
`

const TaskContent = ({task}) => {

  return (
    <TaskContentContainer key={task.id}>
      {task.img !== '' &&
        <img
          src={task.img}
          className="card-img"
          alt="card preview"
        />
      }
      <TagContainer>
        {task.tags.map((tag, index) => {
          const tagClass = `tag ${tag}`
          return (<div key={`key${index}`} className={tagClass}></div>)
        })}

      </TagContainer>
      <div className="card-title">
        {task.content}
      </div>
      <div className="card-subtitle">
        {task.subtitle}
      </div>
      <CardFooterContainer>
        <AvatarContainer>
          {task.users.map((avatar, index) => {
            return avatar !== '' ? (
              <div key={`avatar${index}`} className="avatarWrapper">
                <img
                  src={avatar}
                  className="avatar"
                  alt="card preview"
                />
              </div>) :(
                <div key={`avatar${index}`} className="avatarWrapper">
                  <svg height="30" width="30">
                    <circle cx="15" cy="15" r="15" fill="black" />
                  </svg>
                </div>
              )
          })}
        </AvatarContainer>
        <StatContainer>
          <div className="stat-text">{task.stat.comment}</div>
          <MsgImage />
          <div className="stat-text mar-left-8">{task.stat.like}</div>
          <HeartImage />
          <div className="stat-text mar-left-8">{task.stat.attach}</div>
          <AttachImage />
        </StatContainer>
      </CardFooterContainer>

    </TaskContentContainer>
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
            <TaskContent key={this.props.task.id} task={this.props.task}/>

          </Container>
        )}
      </Draggable>
    );
  }
}
