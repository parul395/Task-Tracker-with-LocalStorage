
import {  useState, useEffect } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
function App() {
  const LOCAL_STORAGE_KEY = "tasks";
const [showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks] = useState([
    {id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminder:true,
    
    },
    {id:2,
        text: 'Teacherss Appointment',
        day: 'Feb 7th at 4:30pm',
        reminder:true,
    
    },
    {
        id: 3,
        text: 'Study Group',
        day: 'Feb 15th at 2:30pm',
        reminder:false,
    }
    
    
    
    
    ]);

    useEffect(()=> {
      const retrieveTasks =JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));if (retrieveTasks) setTasks(retrieveTasks);},[]);

      useEffect(()=> {
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(tasks))},[tasks]);
    //Add task
    const addTask = (task) => {
const id = Math.floor(Math.random()*10000)+1
const newTask = { id, ...task}
setTasks([...tasks, newTask])
    }

    //Delete a Task
    const deleteTask =(id) =>{
setTasks(tasks.filter((task) => task.id !== id))
    }

    //toggle reminder
    const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id? {...task, reminder: !task.reminder} : task))
    }
  return (
    <div className ='container'>
<Header onAdd ={ () =>setShowAddTask(!showAddTask) }  showAdd = {showAddTask}/>
{showAddTask && <AddTask onAdd={addTask} />}
{tasks.length > 0 ?<Tasks tasks={tasks} onDelete={deleteTask}  onToggle = {toggleReminder}/>: 'NO TASKS TO SHOW'}
    </div>
  );
}

export default App;
