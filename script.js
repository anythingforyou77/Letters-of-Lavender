/* ======================================
   LETTERS OF LAVENDER

   Unlock system + animations + countdown

   Timezone: IST (Asia/Kolkata)

====================================== */


const unlockDates = {

  1: "2024-06-26T00:00:00+05:30",
  2: "2024-06-26T00:00:00+05:30",
  3: "2026-07-29T00:00:00+05:30",
  4: "2026-07-30T00:00:00+05:30",
  5: "2026-07-31T00:00:00+05:30",
  6: "2026-08-01T00:00:00+05:30",
  7: "2026-08-02T00:00:00+05:30",
  8: "2026-08-03T00:00:00+05:30",
  9: "2026-08-04T00:00:00+05:30",
  10:"2026-08-05T00:00:00+05:30",
  11:"2026-08-06T00:00:00+05:30",
  12:"2026-08-07T00:00:00+05:30"

};



const finalDate =
new Date("2026-08-07T00:00:00+05:30");



/* First visit intro */


function enterSite(){

  document
  .getElementById("intro")
  .classList.add("hidden");


  document
  .getElementById("main")
  .classList.remove("hidden");


  localStorage.setItem(
    "visited",
    "true"
  );

}



window.onload = ()=>{


  if(localStorage.getItem("visited")){

    document
    .getElementById("intro")
    .classList.add("hidden");


    document
    .getElementById("main")
    .classList.remove("hidden");

  }


  setupEnvelopes();

};





/* Envelope setup */


function setupEnvelopes(){


const envelopes =
document.querySelectorAll(".envelope");


envelopes.forEach(env=>{


let day =
Number(env.dataset.day);



env.onclick=()=>{


let now =
new Date();


let unlock =
new Date(unlockDates[day]);



if(now < unlock){


showLocked(day);


}

else {


openLetter(day);


}


};



});

}





/* Locked popup */


function showLocked(day){


let date =
new Date(
unlockDates[day]
);


alert(

"🔒 This letter is waiting for you.\n\n" +

"Opens on:\n" +

date.toLocaleString(
"en-IN",
{
dateStyle:"long",
timeStyle:"short",
timeZone:"Asia/Kolkata"
}

)

);


}






/* Open letter */


function openLetter(day){


let modal =
document.getElementById(
"letterModal"
);


modal.classList.remove(
"hidden"
);



document.getElementById(
"letterTitle"
)
.innerText =
"Day " + day;



document.getElementById(
"letterText"
)
.innerText =
letters[day];



localStorage.setItem(
"read-"+day,
"true"
);


startCountdown();


}





/* Close letter */


function closeLetter(){

document
.getElementById("letterModal")
.classList.add("hidden");


updateReadStatus();

}





/* Make opened letters look read */


function updateReadStatus(){


document
.querySelectorAll(".envelope")
.forEach(env=>{


let day =
env.dataset.day;


if(
localStorage.getItem(
"read-"+day
)
){


env.classList.add(
"read"
);


env.querySelector(
"span"
).innerText =
"💌";


}


});


}





/* Countdown to August 7 */


function startCountdown(){


setInterval(()=>{


let now =
new Date();


let difference =
finalDate - now;



let box =
document.getElementById(
"countdown"
);



if(difference <=0){


box.innerHTML =
`
00 Days<br>
00 Hours<br>
00 Minutes<br>
00 Seconds
<br><br>
I'm back ❤️
`;

return;


}



let days =
Math.floor(
difference /
(1000*60*60*24)
);



let hours =
Math.floor(
(difference %
(1000*60*60*24))
/
(1000*60*60)
);



let minutes =
Math.floor(
(difference %
(1000*60*60))
/
(1000*60)
);



let seconds =
Math.floor(
(difference %
(1000*60))
/
1000
);



box.innerHTML =

`
${days} Days<br>
${hours} Hours<br>
${minutes} Minutes<br>
${seconds} Seconds
`;



},1000);


}





updateReadStatus();
