const firebaseConfig = {
apiKey: "AIzaSyChKJGRl22t2aTyI3aYyfFrUsyYroxRVY0",
authDomain: "sahibayehaiji.firebaseapp.com",
projectId: "sahibayehaiji",
storageBucket: "sahibayehaiji.firebasestorage.app",
messagingSenderId: "754829628769",
appId: "1:754829628769:web:853ccfa55bc02673f1e120",
measurementId: "G-JVZHYREJC3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let activeCounterTask = null;

let counterPanel = document.getElementById("counterPanel");
let counterValue = document.getElementById("counterValue");
let plusBtn = document.getElementById("plusBtn");
let minusBtn = document.getElementById("minusBtn");

let tasks = [];
let editingTaskId = null;

let container = document.getElementById("taskContainer");
let addBtn = document.getElementById("addTaskBtn");

let modal = document.getElementById("taskModal");
let modalInput = document.getElementById("modalInput");
let saveBtn = document.getElementById("saveTask");
let closeBtn = document.getElementById("closeModal");

db.collection("tasks").onSnapshot(snapshot=>{
tasks=[];
snapshot.forEach(doc=>{
let d=doc.data();
tasks.push({
id:doc.id,
text:d.text,
status:d.status,
count:d.count
});
});
renderTasks();
});

addBtn.onclick=function(){
editingTaskId=null;
modalInput.value="";
modal.style.display="flex";
modalInput.focus();
};

closeBtn.onclick=function(){
modal.style.display="none";
modalInput.value="";
};

saveBtn.onclick=function(){

let text=modalInput.value.trim();
if(!text) return;

if(editingTaskId!==null){

let task=tasks.find(t=>t.id===editingTaskId);
if(!task) return;

task.text=text;

db.collection("tasks").doc(editingTaskId).update({
text:text
});

}else{

let id=String(Date.now());

db.collection("tasks").doc(id).set({
text:text,
status:"active",
count:0
});

}

modalInput.value="";
modal.style.display="none";
editingTaskId=null;

};

function renderTasks(){

container.innerHTML="";

tasks.sort((a,b)=>b.count-a.count);

tasks.forEach(task=>{

let card=document.createElement("div");
card.className="task-card";
card.dataset.id=task.id;

card.innerHTML=`
<div class="task-top">
<div class="task-text">${task.text}</div>
<button class="edit-btn">E</button>
<button class="a-btn">A</button>
</div>

<div class="task-bottom">
<button class="stop-btn">Stop</button>
<button class="pending-btn">Pending</button>
<button class="done-btn">Done</button>
</div>
`;

if(task.status==="done") card.classList.add("done");
if(task.status==="pending") card.classList.add("pending");
if(task.status==="stopped") card.classList.add("stopped");

container.appendChild(card);

});

}

container.addEventListener("click",function(e){

let card=e.target.closest(".task-card");
if(!card) return;

let id=card.dataset.id;
if(!id) return;

let task=tasks.find(t=>t.id===id);
if(!task) return;

if(e.target.classList.contains("done-btn")){
task.status="done";
card.classList.remove("done","pending","stopped");
card.classList.add("done");

db.collection("tasks").doc(id).update({
status:"done"
});
}

if(e.target.classList.contains("pending-btn")){
task.status="pending";
card.classList.remove("done","pending","stopped");
card.classList.add("pending");

db.collection("tasks").doc(id).update({
status:"pending"
});
}

if(e.target.classList.contains("stop-btn")){
task.status="stopped";
card.classList.remove("done","pending","stopped");
card.classList.add("stopped");

db.collection("tasks").doc(id).update({
status:"stopped"
});
}

if(e.target.classList.contains("edit-btn")){
editingTaskId=id;
modalInput.value=task.text;
modal.style.display="flex";
modalInput.focus();
}

if(e.target.classList.contains("a-btn")){
activeCounterTask=task;
counterValue.textContent=task.count;
counterPanel.classList.add("show");
}

});

plusBtn.onclick=function(){

if(!activeCounterTask) return;

activeCounterTask.count++;

counterValue.textContent=activeCounterTask.count;

db.collection("tasks").doc(activeCounterTask.id).update({
count:activeCounterTask.count
});

renderTasks();

};

minusBtn.onclick=function(){

if(!activeCounterTask) return;

if(activeCounterTask.count>0){
activeCounterTask.count--;
}

counterValue.textContent=activeCounterTask.count;

db.collection("tasks").doc(activeCounterTask.id).update({
count:activeCounterTask.count
});

renderTasks();

};

document.getElementById("closeCounter").onclick=function(){
counterPanel.classList.remove("show");
};

const toggleBtn = document.getElementById('sbarb');
const sidebar = document.getElementById('sidebar');

toggleBtn.onclick = () => {
    sidebar.classList.toggle('show');
}
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn=>{

btn.addEventListener("click",()=>{

let target = btn.dataset.tab;

contents.forEach(div=>{
div.classList.remove("active");
});

document.getElementById(target).classList.add("active");

});

});
let backShafai= document.getElementById('closeShafai');
let ShafaiFatawa = document.getElementById('ShafaiFatawa');
let MazaahibTab = document.getElementById('Mazaahib');
let ShafaiTab = document.getElementById('cardd1');
let HanafiTab = document.getElementById('cardd2');
let MalikiTab = document.getElementById('cardd3')
let HambaliTab = document.getElementById('cardd4');

ShafaiTab.onclick= function(){
    MazaahibTab.style.display='none';
    ShafaiFatawa.style.display='block';
}
backShafai.onclick=function () {
    MazaahibTab.style.display='grid';
    ShafaiFatawa.style.display='none';
}
