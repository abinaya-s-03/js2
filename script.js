const events = [
 {title:"Football Match",date:"2026-02-02",category:"Sports",desc:"Inter college match"},
 {title:"Web Workshop",date:"2026-02-04",category:"Workshop",desc:"Learn Web Dev"},
 {title:"AI Guest Lecture",date:"2026-02-06",category:"Lecture",desc:"AI Trends"},
 {title:"Basketball",date:"2026-02-08",category:"Sports",desc:"Finals"},
 {title:"Python Workshop",date:"2026-02-10",category:"Workshop",desc:"Basics"},
 {title:"Career Talk",date:"2026-02-12",category:"Lecture",desc:"Placement guide"},
 {title:"Cricket",date:"2026-02-14",category:"Sports",desc:"Friendly match"}
];

let currentPage = 1;
const perPage = 5;

const search = document.getElementById("search");
const category = document.getElementById("category");
const dateFilter = document.getElementById("dateFilter");

search.addEventListener("input",render);
category.addEventListener("change",render);
dateFilter.addEventListener("change",render);

document.getElementById("prev").onclick=()=>{if(currentPage>1){currentPage--;render();}}
document.getElementById("next").onclick=()=>{currentPage++;render();}

function render(){

let filtered=[...events];

if(category.value!=="All")
 filtered=filtered.filter(e=>e.category===category.value);

if(search.value)
 filtered=filtered.filter(e=>e.title.toLowerCase().includes(search.value.toLowerCase())||e.date.includes(search.value));

const today=new Date();

if(dateFilter.value==="today"){
 filtered=filtered.filter(e=>new Date(e.date).toDateString()===today.toDateString());
}

if(dateFilter.value==="week"){
 let week=new Date();
 week.setDate(today.getDate()+7);
 filtered=filtered.filter(e=>new Date(e.date)>=today && new Date(e.date)<=week);
}

const start=(currentPage-1)*perPage;
const paginated=filtered.slice(start,start+perPage);

if(start>=filtered.length && currentPage>1){
 currentPage--;
 render();
 return;
}

document.getElementById("events").innerHTML="";

paginated.forEach(e=>{
 document.getElementById("events").innerHTML+=`
 <div class="card">
 <h3>${e.title}</h3>
 <p>${e.date}</p>
 <p>${e.desc}</p>
 <button>View Details</button>
 </div>`;
});

document.getElementById("page").innerText=`Page ${currentPage}`;
}

render();
