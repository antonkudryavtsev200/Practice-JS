
$(function(){
    let buttonEnter = $('#enter');
    let userInput = $('#userInput');
    let ul =$('ul'); 
    let localstorage = window.localStorage;
    let todoMap=[
         {
                ind: 1,
                text: 'example'
         }
            ]
    // Для проверки на пустое поле ввода
    function inputLength() {
        return !!userInput.val();
       
    }
    
    // Для создания и последующего удаления заметки
    function createTodo() {
        let li = $("<li>"); // cоздадим новую заметку
        li.append(document.createTextNode(userInput.val()));

        ul.append(li);
        todoMap.push({ // cохранение данных в переменные
          ind : todoMap.length + 1,
          text : userInput.val()
        });
       localstorage.setItem('Todo_list',todoMap);
        userInput.val('')  ;
    
        let deleteButton = $('<button>'); // удалим заметку
        deleteButton.append(document.createTextNode('x'));
        li.append(deleteButton);
        deleteButton.click( deleteTodoItem)
    
        let doneButton = document.createElement('button');
       
        li.append(doneButton);
        doneButton.addEventListener('click', doneTodoItem)
        li.click=(() =>{
           li.toggleClass('done') 
        });
         
   
    function deleteTodoItem() {
        li.addClass('del');
        li.animate({
            'padding-top': '-5000px',
            'padding-bottom': '-1000px'
        }, 500).fadeOut(100).remove(100);
        
    }
}

    // Добавление заметки при нажатии на кнопку
    function changeListAfterButtonPress(event) {
        if (inputLength()) {
            createTodo();
        }
    }
    
    // Добавление заметки при нажатии на ENTER
    function changeListAfterKeypress(event) {
        if (inputLength() && event.which === 13) {
            createTodo();
        }
    }
    
    userInput.keypress(changeListAfterKeypress);

    buttonEnter.click (function() { 
        if (inputLength()) {
            createTodo();
        }
    });
    
})
