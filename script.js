// let home= document.getElementById('nav-bar a');
// let logo=document.getElementsByClassName('logo ')
// window.addEventListener('scroll',()=>{
//   let cureent=""
// })

let prev = document.getElementById('prev');
let next = document.getElementById('next');
let menus = document.querySelectorAll('.card');

let currentIndex = 0;
const cardsPerView = 3;

function updateCards() {
  menus.forEach((menu, index) => {
    if (index >= currentIndex && index < currentIndex + cardsPerView) {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  });
}
updateCards();

next.addEventListener('click', () => {
  if (currentIndex + cardsPerView < menus.length) {
    currentIndex += cardsPerView;
    updateCards();
  }
});

prev.addEventListener('click', () => {
  if (currentIndex - cardsPerView >= 0) {
    currentIndex -= cardsPerView;
    updateCards();
  }
});

//To Do list app
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }


  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  const head=document.createElement('h2')
  head.innerText="Task Details"
    head.style.textAlign="center";
  
  delBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Edit") {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = span.textContent;
      editInput.style.border="none"
      li.replaceChild(editInput, span);
      editBtn.textContent = "Save";
    } 
    else {
      const updatedText = li.querySelector("input").value.trim();
      if (updatedText === "") {
        alert("Task cannot be empty!");
        return;
      }
      span.textContent = updatedText;
      li.replaceChild(span, li.querySelector("input"));
      editBtn.textContent = "Edit";
    }
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  input.value = "";
});



// // let detail={
// //         name:"harsh",
// //         age:22,
// //         job:"intern",
// //         area:"gota",
// // }

// // console.log(detail.name+" is "+ detail.age)
// // document.querySelector(".next").innerHTML=detail
// // // Create an Object
// // const person = {
// //   name: "John",
// //   age: 30,
// //   city: "New York"
// // };

// // // Stringify Object
// // let myString = JSON.stringify(person);

// // // Display String
// // document.querySelector(".prev").innerHTML = myString;
// // hoisting part
// // console.log(a);
// // var a=10;
// // console.log(b);
// // let b=10;
// // console.log(c);
// // const c=30;

// function outer(){
//     let fname="harsh"
//     return function inner(){
//         console.log(fname)
//     }
// }
// const greet=outer();
// greet();



// let a=2,b=3
// const add=(a,b)=>a+b;
// // array
// // let arr=[1,2,3,4,'Harsh',22,'gota']
// // console.log(arr.copyWithin(2,0))
// // let num=[[1,2] ,[3,4] ,[5,6] ,[7,8]]
// // const newNum=num.flat()
// // console.log(newNum.reverse())
// // for(let i=0;i<=arr.length-1;i++){
// //     console.log(arr[i])
// // }

// let num=[1,2,3,4,5,6,7,8,]
// let square= num.map(nm=>nm*nm)
// console.log(square)
// let filter=num.filter(nmm=> nmm<8)
// console.log(filter)

// let user=[
//     {name:"harsh",active:"true"},
//     {name:"harsh",active:"false"},
//     {name:"harsh",active:"true"},
// ]

// let del= user.filter(us=>us.active=='true')
// console.log(del)

// // let score=[67,78,89,90]
// // let maxScore=score.reduce((max,curr)=curr > max ? curr : max ,score[0])
// // console.log(maxScore)
// // debugger;
// const d=new Date()
// console.log(d)
// let details ={
//     name:"harsh",
//     age:22,
//     city:"ahmedabad",
// }
// let{name,age,city}=details

// function why(){
//     let x=7
//     function y(){
//     console.log(x);
//     }
//     y();
// }
// why()
// function x(){
//     for(let i=0; i<=5;i++){
// setTimeout(function(){
//     console.log(i)
// },i*2000)
// }
// console.log("hello")
// }
// x()



