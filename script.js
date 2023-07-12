// Define an array to store tasks
let tasks = [];

// Get references to the container
const container=document.querySelector('.container');
// Get references to the Form
const form = document.getElementById('todo-form');
// Get references to the form input
const input = document.getElementById('todo-input');
// Get references to the ul
const todoList = document.getElementById('todo-list');
// References to the tasks counter
const tasksCount=document.getElementById('tasks-counter');

const completedCount=document.getElementById('completed-count');



// function to show notification
function showNotification(text){
    alert(text);
}
// Function to Update the completed tasks
function updateCompletedCount(){
    const count=tasks.filter(task=>task.completed).length;
    completedCount.innerHTML=count;
}

// function addtaskToDom
function addTasktoDOM(task){
// create todo lists item => li , check btn, delete btn
const li=document.createElement('li');
const span=document.createElement('span');
// if task is toggle then add class checked to span
 if(task.completed){
    span.classList.add('checked');
   
 }
 const checkBtn=document.createElement('button');
const deleteBtn=document.createElement('button');
// add classes to these 
  checkBtn.classList.add('check-btn');
  deleteBtn.classList.add('delete-btn');
 
// inside content 
span.innerHTML=task.title;
checkBtn.innerHTML='<i class="fas fa-check"></i>';
deleteBtn.innerHTML='<i class="fas fa-trash"></i>'
//  add task id to checkBtn , data-id to deleteBtn
checkBtn.id=task.id;
deleteBtn.setAttribute('data-id', task.id);

  li.appendChild(span);
  li.appendChild(checkBtn);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

}

// function to render list
function renderList(){
   todoList.innerHTML="";
   for(let i=0; i<tasks.length; i++){
       addTasktoDOM(tasks[i]);
       
   }
    tasksCount.innerHTML=tasks.length;
     updateCompletedCount();
}

// Function to check Task
function toggleTask(taskId){

    const marktask=tasks.filter(function(task){
        return task.id===Number(taskId);
    })
    if(marktask.length>0){
        const currentTask=marktask[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        
        return;
    }

}

// Function to delete list
function deleteTask(taskId){
    const newTasks=tasks.filter(function(task){
        return task.id!==Number(taskId);
    })
    tasks=newTasks;
    renderList();
}

// Function to addTask
function addTask(task){
    
    tasks.push(task);
    renderList();
    showNotification('Added successfully');
   
    return;
}
    


// function to handle event when Enter Key pressed or  Add Button Clicked
function taskAddedHandler(e){
   e.preventDefault();
   const title=input.value;
   if(!title){
    showNotification('You must write something')
}else{
   const task={
    title:title,
    id:Date.now().toString(),
    completed:false
   }
   input.value='';
   addTask(task);
}
}
function handleClickEvent(e){
    const target=e.target;
    if(target.className==='delete-btn'){
        const taskID=target.dataset.id;
        deleteTask(taskID);
        return;
    }
    else if(target.className==='check-btn'){
        const taskID=target.id;
        toggleTask(taskID);
        return;
    }
}

function fetchTodos(){
    // Get request
     fetch('https://jsonplaceholder.typicode.com/todos')
     .then(function(response){
       return response.json();
     }).then(function(data){
        tasks=data.slice(0,4);
        renderList();
        
     })
     .catch(function(error){
        console.log('error', error);
     })
    
    }

// function to initialize the App
function initialize(){
 fetchTodos();
// event delegation
document.addEventListener('click', handleClickEvent);
// Event Listener for Form
form.addEventListener('submit',taskAddedHandler);
}
initialize();