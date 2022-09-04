


var arr = [];
var inputValue;
var input = document.querySelector('.input');
var form = document.querySelector('form');
var tod = document.querySelector('.todos');
var item = document.querySelector('.list');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    addElement()
});

input.addEventListener("input", function (e) {
    inputValue = e.target.value;
});

window.addEventListener("load", function () {
    load();
})

function checkedTheBox(k) {
    var check = document.querySelectorAll(".check")

    console.log(arr);
    check[k].addEventListener("click", function () {
        console.log("checked");
        checked(k);
    })

}
function del(k) {
    var button = document.querySelectorAll(".delete");
    button[k].addEventListener("click", function () {
        console.log("delete");
        deleteItem(k);

    })
}

function addElement() {
    const todo = { todoText: "", id: Math.floor(Math.random() * 10000), isFinished: false }
    const buttons = document.createElement("div");
    window['newDiv' + arr.length] = document.createElement("div");
    window['newDiv' + arr.length].className = ('list');
    const checkbox = document.createElement('button');
    checkbox.className = 'check';
    checkbox.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    deleteButton.className = 'delete';
    window['newContent' + arr.length] = document.createElement('div')
    window['newContent' + arr.length].innerHTML = inputValue
    window['newContent' + arr.length].classList.add('todoText')
    todo.todoText = inputValue
    buttons.appendChild(checkbox);
    buttons.appendChild(deleteButton);
    window['newDiv' + arr.length].appendChild(window['newContent' + arr.length]);
    window['newDiv' + arr.length].appendChild(buttons);

    window['newDiv' + arr.length].classList.add('tasks')

    const todos = document.querySelector(".todos");
    todos.appendChild(window['newDiv' + arr.length])
    arr.push(todo);
    window.localStorage.setItem('todos', JSON.stringify(arr));
    input.value = "";
    checkedTheBox(arr.length - 1)
    del(arr.length - 1);
}

function load() {

    const todos = window.localStorage.getItem('todos')
    if (todos) arr = JSON.parse(todos)

    for (var j = 0; j < arr.length; j++) {
        const buttons = document.createElement("div");
        window['newDiv' + j] = document.createElement("div");
        window['newContent' + j] = document.createElement('div')
        window['newContent' + j].classList.add('todoText')
        window['newContent' + j].innerHTML = arr[j].todoText;
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        deleteButton.className = 'delete';
        const done = arr[j].isFinished;
        if (done === true) {
            window['newContent' + j].classList.add("add");
        }
        window['newDiv' + j].className = ('list');
        const checkbox = document.createElement('button');
        checkbox.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        checkbox.className = 'check';
        checkbox.defaultChecked = arr[j].isFinished

        console.log(window['newContent' + j])
        buttons.appendChild(checkbox);
        buttons.appendChild(deleteButton);
        window['newDiv' + j].appendChild(window['newContent' + j]);
        window['newDiv' + j].appendChild(buttons)

        window['newDiv' + j].classList.add("tasks");
        const todos = document.querySelector(".todos");
        todos.appendChild(window['newDiv' + j])
        checkedTheBox(j)
        del(j);
    }

}

function checked(a) {

    let done = arr[a].isFinished;
    if (done === true) {
        done = false;
        arr[a].isFinished = done;
        window['newContent' + a].classList.remove("add");
    }
    else if (done === false) {
        done = true;
        arr[a].isFinished = done;
        window['newContent' + a].classList.add("add");
    }
    window.localStorage.setItem('todos', JSON.stringify(arr));
    console.log("checked");
}

function deleteItem(a) {
    const todos = document.querySelector(".todos");
    for (let j = 0; j < arr.length; j++) {
        todos.removeChild(window['newDiv' + j])
    }
    for (let j = a; j < arr.length - 1; j++) {
        arr[j] = arr[j + 1];

    }
    arr.pop();
    console.log(arr)
    window.localStorage.setItem('todos', JSON.stringify(arr));
    load();
}