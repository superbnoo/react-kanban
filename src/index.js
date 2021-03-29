import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import dummyData from "./dummy-data";
import Column from "./column";


class App extends React.Component {
  state = dummyData;

  onDragEnd = (result) => {
    // todo
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
