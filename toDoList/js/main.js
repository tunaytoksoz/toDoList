
const inputText = document.querySelector('#input-text');
const clearButton = document.querySelector('.button-clear');
const textCheck = document.querySelector('.text-check');
const taskList2 = document.querySelector('.task-list-text');

clearButton.addEventListener('click',deleteAll);


document.addEventListener("DOMContentLoaded",loadAllTodos)
taskList2.addEventListener('click',deleteTodo);




function loadAllTodos (){

    let done = getDoneFromStorage();

    done.forEach(function(check){
        
        doneCheck(check)
    })




    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}






var counter = 2;

function add() {
    counter += 1;
}


function showAlert(message) {
    const alert = document.createElement('div');
    const alertInfo = document.querySelector('.alert-info');
    alert.className = "alert";
    alert.textContent = message;
    alertInfo.appendChild(alert);
    alert.style.margin = '15px 0 0 0';
    setTimeout(function () {
        alert.remove();
    }, 2500);


}


function deleteTodo(e){
    if(e.target.className === "far fa-trash-alt"){
        if(confirm('Silmek İstediğine Emin misin ?')){

        e.target.parentElement.remove();
      }  
    
       
    }
    deleteTodoFromStorage(e.target.parentElement.textContent);
}



function AddTask() {
    

    const newTodo = inputText.value.trim();


    if (newTodo === '') {
        showAlert("Lütfen Bir Not giriniz")

    } else {

        addTodoToStorage(newTodo)
        addTodoUI(newTodo)

    }



}


function addTodoUI(newTodo){
    var liElement = document.createElement("LI"); //Li elementi oluşturdum
    liElement.className = "liText";


    var cElement = document.createElement("INPUT"); // li elementinin içinde kullanacağımız checkbox elementini de oluşturdum
    cElement.setAttribute("type", "checkbox");
    cElement.className = "check";

    liElement.appendChild(cElement);// checkbox elementini li elementinin textinden önce ekledim


    var input = document.getElementById("input-text").value; // li elementine text eklemek için inputtan aldığımız texti input değişkeninine atadım
    // liElement.innerHTML += " " + input;


    var iElement = document.createElement("i"); // iconumuzu oluşturup sınıfını belirttim
    iElement.className = "far fa-trash-alt";
    iElement.id = counter;
    liElement.appendChild(document.createTextNode(newTodo)); //LOCALSTORAGE ELEMANLAR
    liElement.appendChild(iElement);
     //icon elementini de ekledim.

   
    document.getElementById("text").appendChild(liElement); // En son li elementimizi ul ye ekledim.
    inputText.value = "";
}


function selectAll() {
    var all = document.getElementsByClassName('check');
    for (let i = 0; i < all.length; i++) {
        let current = all[i];
        
        if (!(current.checked)) {
            current.checked = true;
            deleteTodoFromStorage(current);
            localStorage.clear(current);
        }else{
            current.checked = false;
        }
    }
}





function deleteList()  {
    var text = document.getElementById("text");
    var all = document.getElementsByClassName('check');

    let i =0;
    while(i<all.length)
    {
        if(!(all[i].checked)){
            i++;
        }
        else{
            text.removeChild(all[i].parentElement);
         
        }
    }

}


function doneCheck(newDone) {
    console.log(newDone);
    const ul = document.querySelector('.text-check');
    const li = document.querySelector('.text-check-item');
    var all = document.getElementsByClassName('check');

   


    for (let i = 0; i < all.length; i++) {
        let current = all[i];
        if (current.checked) {
           
            var liElement = document.createElement("li"); //Li elementi oluşturdum
            
            liElement.className = "text-check-item";
           
            let complated = current.parentElement;
            liElement.appendChild(document.createTextNode(newDone));
            liElement.innerText = complated.innerText;
           
            ul.appendChild(liElement);
            
        
            addDoneToStorage(complated.innerText);
         
        }
    }
    deleteList();




}






function deleteAll(e){
    
    if(e.target.className === "button-clear"){
        if(confirm('Hepsini Silmek İstediğine Emin misin ?')){
            textCheck.remove();
            
            var ulElement = document.createElement("UL"); //ul elementi oluşturdum ki yeni eklemeler de ul.append kullanabilelim
            ulElement.className = "text-check";
            ulElement.id = "text-check";
            var completedTaskText = document.querySelector(".completed-tasks-text"); // Bir üst parentı olan dive eklemek için onu seçtim
            completedTaskText.appendChild(ulElement); // oluşturduğumuz ul elementini dive ekledim.
           
        }
  

    
    }

e.preventDefault();

}



function getTodosFromStorage(){// STORAGE todoları alıcak


    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    return todos;

}

function getDoneFromStorage(){// STORAGE todoları alıcak


    let done;

    if(localStorage.getItem('done') === null){
        done = [];

    }else{
        done = JSON.parse(localStorage.getItem('done'));
    }


    return done;

}


function addDoneToStorage(newDone){
let done = getDoneFromStorage();

done.push(newDone);
localStorage.setItem('done',JSON.stringify(done));
}




function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);  //eklediğimiz elemanları güncellemek için
 
    localStorage.setItem('todos',JSON.stringify(todos));
    


}



function deleteTodoFromStorage(text){
    
     let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === text){
            todos.splice(index,1); // Arrayden değeri silebiliriz hem localden hemde listeden
        }
    });

    localStorage.setItem('todos',JSON.stringify(todos));
}

// taskList=taskList.filter(x=>x.id!=li.id);
// localStorage.setItem("taskList",JSON.stringify(taskList));