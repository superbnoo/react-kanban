import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import dummyData from './dummy-data';
import Column from './column';

// const App = () => 'hello world';

class App extends React.Component {
  state = dummyData;

  render() {
    return this.state.columnOrder.map((columnId) => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

      return <Column key={column.id} column={column} tasks={tasks} />;
    });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
