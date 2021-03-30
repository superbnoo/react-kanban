const dummyData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Old fashioned recipe for preventing allergies and chemical sensitivities', subtitle: '', tags:['orange']},
    'task-2': { id: 'task-2', content: 'Home business advertising ideas', subtitle: 'Successful businesses know the importance of building and maintaining good working.', tags:['darkblue', 'red', 'violet', 'lightgreen']},
    'task-3': { id: 'task-3', content: 'Unmatched toner cartridge quality 20 less than oem price', subtitle: 'Why read motivational sayings? For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new.', tags:['blue', 'orange']},
    'task-4': { id: 'task-4', content: 'Types of paper in catalog printing', subtitle: 'Branding is no longer simply about visual appeal (or the cherry in the apple pie example, as given in my earlier article).', tags:['violet', 'red', 'blue']},
    'task-5': { id: 'task-5', content: 'There is no competition', subtitle: 'This article is floated online with an aim to help you find the best dvd printing solution.', tags:['darkblue', 'lightgreen']},
    'task-6': { id: 'task-6', content: 'Linux or windows which is it', subtitle: 'Saving money – is something we would all like.', tags:['blue', 'red']},
    'task-7': { id: 'task-7', content: 'At home treatments for beauty on a budget', subtitle: 'The holidays bring with them thoughts of carving and serving delicious turkey dinners to your family and friends. Tradition has its fans, but perhaps this year you’d like to try a twist to your turkey recipe.', tags:['orange', 'red', 'violet']},
    'task-8': { id: 'task-8', content: 'Home business advertising ideas', subtitle: 'Successful businesses know the importance of building and maintaining good working.', tags:['violet', 'lightgreen']},
    'task-9': { id: 'task-9', content: 'Tips for choosing the perfect gloss for your lips', subtitle: 'With MySpace becoming more popular every day, there is the constant need to be different. There are millions of users.', tags:['blue', 'orange']},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Design',
      taskIds: ['task-1', 'task-2']
    },
    'column-2': {
      id: 'column-2',
      title: 'Prototype',
      taskIds: ['task-3']
    },
    'column-3': {
      id: 'column-3',
      title: 'Trello',
      taskIds: ['task-4', 'task-5']
    },
    'column-4': {
      id: 'column-4',
      title: 'Test',
      taskIds: ['task-6']
    },
    'column-5': {
      id: 'column-5',
      title: 'Final',
      taskIds: ['task-7', 'task-8', 'task-9']
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5']
}

export default dummyData;
