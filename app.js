// getting all required elements from document
const container = document.querySelector('.container');
const select = document.querySelector('select');
const filter = document.querySelector('#filter-btn');
const add = document.querySelector('#add-user');
const name = document.querySelector('#name');
const profession = document.querySelector('#profession');
const age = document.querySelector('#age');
// to get the last element's id
let lastId;

//default array
let array = [
    {id:1,name:"John",profession:"Developer",age:"18"},
    {id:2, name:"Jack", profession:"Developer",age:"20"},
    {id:3, name:"Karen",profession:"Admin",age:"19"}
];

//rendering default array
for(let i = 0; i< array.length; i++){
    let div = document.createElement('div');
    div.className = 'list';
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let span4 = document.createElement('span');
    
    span1.textContent = array[i].id;
    span2.textContent = 'Name: '+array[i].name;
    span3.textContent = 'Profession: '+array[i].profession;
    span4.textContent = 'Age: '+array[i].age;
    
    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
    div.appendChild(span4);
    container.appendChild(div);
    lastId = array[i].id;
}


//function to update and render the display list
function update(arr){
    container.innerHTML = '';
    for(let i = 0; i< arr.length; i++){
        let div = document.createElement('div');
        div.className = 'list';
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        let span3 = document.createElement('span');
        let span4 = document.createElement('span');
        
        span1.textContent = arr[i].id;
        span2.textContent = 'Name: '+arr[i].name;
        span3.textContent = 'Profession: '+arr[i].profession;
        span4.textContent = 'Age: '+arr[i].age;
        
        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(span3);
        div.appendChild(span4);
        container.appendChild(div);
    }
}


//adding event-listener for filter button
filter.addEventListener('click', ()=>{
    let selected = select.value;
    //if selected value is empty(profession), render the whole default array 
    //else filter based on profession value catched
    if(selected !== ''){
        let filtered = array.filter((element)=>{
            return (element.profession==selected);
        });
        update(filtered);
    }
    else if(selected===''){
       alert("Please select a profession from the dropdown list to filter the list!!!")
       return;
    }
})

//adding event-listener for add button
add.addEventListener('click', ()=>{
    let eName = name.value;
    let eProfession = profession.value;
    let eAge = age.value;

    //alert and return if inputs are empty
    if(eName=='' || eProfession==''||eAge==''){
        alert("Can't leave empty.... "+"\n\nEnter vallid user details!!");
        return;
    }

    //alert and return if age contains alphabets 
    if(eAge.match(/[a-zA-Z]/g)){
        alert("Age can't contain alphabet, enter vallid age!!");
        return;
    }

    //if enterd age is more than 60 or less than 18, alert and return
    let numAge = parseInt(eAge)
    if(numAge>60 || numAge<18){
        alert("Please enter vallid age details..."+" \n\nAge sholud be in between 18 to 60!");
        return;
    }

    //updating name and profession to always keep the first character in uppercase
    eName = eName[0].toUpperCase() + eName.slice(1);
    eProfession = eProfession[0].toUpperCase() + eProfession.slice(1);

    //if any new profession other than developer or admin added, 
    //option will be updated in dropdown
    if(eProfession !== "Developer" || eProfession !== "Admin"){
        let option = document.createElement('option');
        option.style.backgroundColor = "#65676d";
        option.style.color = "white";
        option.style.width = "100%";
        option.value = eProfession;
        option.innerText = eProfession;
        select.appendChild(option);
    }

    //creating object with the values catched and adding it to default-array 
    //then updating the list on document
    lastId++
    let obj = {
        id: lastId,
        name: eName,
        profession: eProfession,
        age: eAge
    };
    array.push(obj);

    //empty the inputs after pushing the values to the array
    name.value ='';
    profession.value ='';
    age.value = '';
    
    // alert message
    alert("User has been added!")

    //update and render the new list
    update(array);
})
