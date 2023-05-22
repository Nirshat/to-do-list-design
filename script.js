
const createInput = document.getElementById("createinput");
const listBox = document.getElementById("listBox");
const itemplate = document.getElementById("itemTemplate");
const addBtn = document.getElementById("addBtn");


// PROCESS 1:
// Get items and store it in array

let items = getItems();

function getItems(){
    const value = localStorage.getItem("todo") || '[]'; // to avoid null array
    
    return JSON.parse(value);
}

// PROCESS 2:
// Taking the items array 'items = getItems()' and converting it back to JSON 
function setItems(items){
    const itemsJson = JSON.stringify(items);

    // reseting JSON back
    localStorage.setItem("todo", itemsJson)
}


// function terminateItems(items){
//     const itemsJson = JSON.stringify(items);
//     // console.log(itemsJson);

//     // reseting JSON back
//     localStorage.removeItem("todo", itemsJson);
// }



function addList(){
    items.unshift({
        description: createInput.value, // input value
        completed: false,
        removeKey: createInput.value
    });

    setItems(items);
    refreshList();

    createInput.value = '';
}


function updateList(item, key, value){
    item[key] = value;
    
    setItems(items);
    refreshList();
}


// function removeEachItem(item, key, value){
//     item[key] = value;
//     // console.log(item[key])
    
//     terminateItems(items);
//     refreshList();
// }




function refreshList(){
    //  To-Do sort completed items
    items.sort((a, b) =>{
        if (a.completed){
            return 1;
        }

        if(b.completed){
            return -1;
        }

        // sort list items
        // return a.description < b.description ? -1 : 1;
    });

    listBox.innerHTML = "";



    var i = 0;

    // for every single item inside the items list
    for (const item of items){
        const itemElement = itemplate.content.cloneNode(true);
        const inputValue = itemElement.querySelector("#inputBox"); // input
        const doneTask = itemElement.querySelector("#check"); // checkbox
        // const delBtn = itemElement.querySelector('#remove'); remove button

        inputValue.value = item.description; // inputs inside list
        doneTask.checked = item.completed; // checkboxes inside list

        // update list
        inputValue.addEventListener('change', () => {
            updateList(item, "description", inputValue.value);
        });

        doneTask.addEventListener('change', () => {
            updateList(item, "completed", doneTask.checked);
        });

        // add in list box, render added items
        listBox.append(itemElement);


        // delete list
        // delBtn.addEventListener('click', () => {
        //     removeEachItem(item, "description", inputValue.value);
        // });
    }
}


// call add item function into the add button
addBtn.addEventListener('click', () => {
    if(createInput.value === ''){
        alert('Write something!')
    }

    else{
        addList();
    }
});




// render/display list items in browser
refreshList();