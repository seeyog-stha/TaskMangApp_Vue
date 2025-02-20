// type of task 
export interface taskProp {
    id: string,
    title: string,
    date: string|Date,
    priority: string,
    isCompleted: "Completed"|"Pending"|"In Progress",
  }