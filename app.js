const app = document.querySelector('#app');

let state = {
    todo: [],
    complete: []
}

const createHeader = () => {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('headerContainer');

    const header = document.createElement('h1');
    header.classList.add('header');
    header.innerHTML = 'To-Do List'

    headerContainer.appendChild(header);
    headerContainer.appendChild(createForm());
    return headerContainer;    
}

const createForm = () => {
    const formContainer = document.createElement('form');
    formContainer.classList.add('formContainer');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('inputDiv');
    const input = document.createElement('input');
    input.classList.add('input');
    input.placeholder = 'groceries, clean garage, mow lawn';
    inputDiv.appendChild(input);
    formContainer.appendChild(inputDiv);
    formContainer.appendChild(createButton());
    return formContainer;
}

const createButton = () => {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');
    const submitButton = document.createElement('button');
    submitButton.classList.add('submitButton');
    submitButton.innerHTML = 'Add Task';

    buttonDiv.appendChild(submitButton);

    buttonDiv.addEventListener('click', ev => {
        ev.preventDefault();
        let textInput = document.querySelector('.input').value;
        state.todo.push(textInput);
        render();
    })
    return buttonDiv;
}

const createBody = () => {
    const bodyContainer = document.createElement('div');
    bodyContainer.classList.add('bodyContainer');

    bodyContainer.appendChild(createTodoContainer());
    bodyContainer.appendChild(createCompleteContainer());
    return bodyContainer;
}

const createTodoContainer = () => {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todoContainer');

    todoContainer.appendChild(todoItems());
    return todoContainer;
}

const todoItems = () => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');
    const todoHeader = document.createElement('h2');
    todoHeader.classList.add('bodyHeader');
    todoHeader.innerHTML = 'Things To Do:';
    todoDiv.appendChild(todoHeader);

    if (state.todo.length === 0) {
        const nothing =  document.createElement('div')
        nothing.classList.add('nothingMessage');
        nothing.innerHTML = 'Nothing to do :)'
        todoDiv.appendChild(nothing);
    } else {
        state.todo.forEach(item => {
            let newItem = createTodoItem(item);
            todoDiv.appendChild(newItem);
            // console.log(newItem);
        })       
    }
    return todoDiv;
}

const createTodoItem = (item) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todoItem');

    const span = document.createElement('span');
    span.innerHTML = item;



    todoItem.appendChild(span);
    todoItem.appendChild(createCompleteButton());

    todoItem.addEventListener('click', ev => {
        if (todoItem.className === 'highPriority') {
            todoItem.className = 'todoItem';
        } else {
            todoItem.className = 'highPriority';
        }
    })

    return todoItem;
}


const createCompleteButton = () => {
    const completeButton = document.createElement('button');
    completeButton.classList.add('completeButton');
    completeButton.innerHTML = 'Complete';

    completeButton.addEventListener('click', ev => {
        let itemToMove = completeButton.parentNode.querySelector('span').innerHTML;
        state.complete.push(itemToMove);
        state.todo.splice(state.todo.indexOf(itemToMove), 1);
        // console.log(newToDo);
        // state.todo = state.todo.splice(0, state.todo.indexOf())
        // console.log(state.todo);
        // state.todo = state.todo.splice(state.todo.indexOf(itemToMove), 1);
        console.log(state);
        render();
    })

    return completeButton;
}

const createCompleteContainer = () => {
    const completeContainer = document.createElement('div');
    completeContainer.classList.add('completeContainer');

    const completeHeader = document.createElement('h2');
    completeHeader.classList.add('bodyHeader');
    completeHeader.innerHTML = 'Completed Tasks';
    completeContainer.appendChild(completeHeader);

    completeContainer.appendChild(createResetButtonContainer());
    completeContainer.appendChild(completeItems());
    return completeContainer;
}

const createResetButtonContainer = () => {
    const resetButtonContainer = document.createElement('div');
    resetButtonContainer.classList.add('resetButtonContainer');

    resetButtonContainer.appendChild(createResetButton());
    return resetButtonContainer;
}

const createResetButton = () => {
    const resetButton = document.createElement('button');
    resetButton.classList.add('resetButton');
    resetButton.innerHTML = 'Clear Tasks';

    resetButton.addEventListener('click', ev => {
        state.complete = [];
        render();
    })

    return resetButton;
}

const completeItems = () => {
    const completeDiv = document.createElement('div');
    completeDiv.classList.add('completeItems');
    state.complete.forEach(item => {
        let completeItem = createCompleteItem(item);
        completeDiv.appendChild(completeItem);
    })
    return completeDiv;
}

const createCompleteItem = (item) => {
    const completeItemDiv = document.createElement('div');
    completeItemDiv.classList.add('completeItemDiv');

    const completeSpan = document.createElement('span');
    completeSpan.innerHTML = item;

    completeItemDiv.appendChild(completeSpan);
    return completeItemDiv;
}



const render = () => {
    app.innerHTML = '';
    app.appendChild(createHeader());
    app.appendChild(createBody());
}

render();