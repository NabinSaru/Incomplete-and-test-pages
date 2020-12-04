dragElement(document.getElementById("mydrag"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  console.log(elmnt.id);
  if (document.getElementById(elmnt.id + "image")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "image").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if(elmnt.offsetTop - pos2<0)
    {
      elmnt.style.top=0+"px";
    }
    else{
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
    if((elmnt.offsetLeft - pos1)<0)
    {
      elmnt.style.left=0+"px";
    }
    else
    {
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }  
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//code below belongs to button operation
const button=document.getElementById('location');
const result=document.getElementById('result');

button.addEventListener('click',getLocationHandler);
// function getLocationHandler()
// {
//   let positionData;
//   getPosition().then(posData=>{
//     positionData=posData;
//     return setTimer(1000);
//   }, failCallbacks=>{
//     console.log(failCallbacks);
//   }).then
//   (data=>
//     {
//       console.log(data,positionData);
//     }).catch(err=>"User timeout");
//promise can be nested like .then(1).then(2) where .then(1) output is used as callback for promise2
//catch and the reject caught by then method i.e .then(..,2nd args) , 2nd arg is error callback
//   setTimer(1000)
//   .then(()=>
//   {
//     console.log("Timer Done!"); 
//   })
//   .then;
//   console.log("Getting Coordinates...");
//   //3parameters success function, error function, 3rd param is constraint like timeout
// }

//alternative for promise then method
//this executes automatically in browser
async function getLocationHandler(){
  let posData;
  let timeData;
  //since there is no error passing in await method and we can use traditional try catch method
  try{
    //posData and timeData isn't defined here due to scope block chain or we can define them as public
    posData= await getPosition();
    timeData= await setTimer(1000);
  }
  catch(error){
    posData='location not granted';
    console.log(error);
  }
  console.log(posData,timeData);
  //these codes doesn't run unless all await and upper code execute for async function unlike previous method
  //such method can be run simultaneously using async method in different function
  //also  inorder to use await method we need to wrap the await method wrapped by async function and IIFE it e.g

  // (async function example(){
  //   await setTimer(1);
  // })();

  setTimer(1000)
  .then(()=>
  {
    console.log("Timer Done!"); 
  })
  .then;

}

const setTimer= (duration)=>{
  const promise= new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('Done!');
    },duration);
  },error=>{
    reject(error);
  });
  return promise;
}
const getPosition =(options)=>{
  const promise= new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition(
      success=>{
        resolve(success);
      },error=>{
        reject('error message'); 
      },options);
     
  });
  return promise;
}
//race executes only one promise and that is the faster one and uses array of promises for inputs ie. in real result of slower one is ignored
//also it works only after initialization i.e it should be placed at last
Promise.race([getLocationHandler(),setTimer(1000)]).then(data=>{
  console.log(data);
}, failCallbacks=>{

});
//all on other hand consider all the promises and give the combined output
//if one rejected all would be rejected we can use try catch
Promise.all([getLocationHandler(),setTimer(1000)]).then(doneCallbacks=>console.log(doneCallbacks), failCallbacks=>{});
//allSettled can be used incase of partial selection of array only rejects when allpromises are rejected

//big int 
try {
  (6n-5);
} catch(e) {
  console.log(e);
}
console.log(6n-BigInt(5));
console.log(parseInt(6n)-5);

//infinity
console.log(Infinity+6);
//or can be defined as
console.log(Number.NEGATIVE_INFINITY+3);
console.log(Number.isFinite(Math.abs(-45)));
(function randomIntBetween(min,max){
  console.log(Math.floor(Math.random()*(max-min+1)+min));
}(1,10));

//regular expression Regex for email pattern 
const regex=/^\S+@\S+\.\S+$/;
console.log(regex.test('abc@gmail.com'));
console.log(regex.test('xyz.com'));
//starts with h or H
const name=new RegExp('(h|H)ello');
console.log(name.test('ello world'));
//for the string with any start symbol .ello
//exec checks which parts match at the index 0 of input array
console.log(regex.exec('asd@hhh.com'));