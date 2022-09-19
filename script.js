


// Setting Variables
let taskInput = document.querySelector(".input")
let taskButton = document.querySelector(".submit")
// li
let taskList = document.querySelector(".task")

// Empty Array To Store The Tasks
let arrayOfTasks = [];
// Check If There is Tasks in Local Storage
if(localStorage.getItem("tasks")) {
    // 
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    createTask(arrayOfTasks)
};


taskButton.addEventListener("submit", function(e) {
  // prevent the page from reloading when submitting the form
  e.preventDefault();
  console.log("button clicked");
//   if input have value add the value as parmeter to addTaskToArray() function
  if (taskInput.value != "") {
    addTaskToArray(taskInput.value);
    // clear the input 
    taskInput.value = "";
  }
});
taskButton.onkeyup = function (e) {
    if(e.key === "Enter" && taskInput.value != "") {
        addTaskToArray(taskInput.value); // Add Task To Array Of Tasks
        taskInput.value = ""; // Empty input Field
    }
};

function addTaskToArray (taskText) {

    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    };
    arrayOfTasks.push(task);
    console.log(arrayOfTasks);
    // createTask();
    addToLocalStorage(arrayOfTasks);

}

function createTask (arrayOfTasks){
    taskList.innerHTML = "";

    arrayOfTasks.forEach((task)=> {
       
        const li = document.createElement('li')
         taskList. classList.add('flex','flex-col-reverse')

        const container = document.createElement('div')
        container.classList.add ('mt-7','ml-3','flex','justify-between');
       
        

        const label = document.createElement('label')
        label.classList.add('inline-flex','items-center')

        let checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.setAttribute('data-id', task.id)

        checkbox.classList.add('h-6', 'w-5', 'accent-violet-200',  'hover:accent-violet-200', 'border-0', 'rounded-md', 'focus:ring-0')

        const textspan = document.createElement('span')

       

        textspan.appendChild(document.createTextNode(task.title))
        textspan.classList.add('text', 'ml-4', 'text-lg')

        const divButtons = document.createElement('div')
        divButtons.setAttribute('data-id', task.id)
        divButtons.innerHTML += `

                  <button class="delete  text-purple-700 hover:text-white hover:bg-purple-600 p-1 px-2 rounded">
                   <i class="delete pointer-events-none fa fa-regular fa-trash" ></i>
                  </button>
        `
        if(task.completed){
            // className go through
            textspan.classList.add('line-through','italic')
            checkbox.checked = true
        }
        label.appendChild(checkbox)
        label.appendChild(textspan)
        container.appendChild(label)
        container.appendChild(divButtons)
        li.appendChild(container)
        taskList.appendChild(li)

        

    })
}

function addToLocalStorage(arrayOfTasks) {
    localStorage.setItem('tasks', JSON.stringify(arrayOfTasks))
    createTask(arrayOfTasks);
}

function deleteTodo(id) {
    arrayOfTasks = arrayOfTasks.filter(function(item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
      });
addToLocalStorage(arrayOfTasks)
}

function editItem (id){
    // const span = taskList.getElementsByClassName('text')
  
}




taskList.addEventListener('click', function (e){
   
    if(e.target.type === 'checkbox'){
         
        toggle(e.target.getAttribute('data-id'))
         
    }
    if (e.target.classList.contains('delete')){
        console.log("delete clicked")
        deleteTodo(e.target.parentElement.getAttribute('data-id'))

    }
 
})

// toggle the value to completed and not completed
function toggle(id) {
    arrayOfTasks.forEach((task)=> {
        if (task.id == id){
            task.completed = ! task.completed
        
        }
    })
    addToLocalStorage(arrayOfTasks);

}


  