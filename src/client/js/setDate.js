setDate();

function setDate(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;

var afterTwoWeeks = new Date(+new Date + 1209600000);

var laterDate = afterTwoWeeks;
var ld = laterDate.getDate();
var lm = laterDate.getMonth()+1;
var lyyy = laterDate.getFullYear();

if(ld<10){
    ld='0'+ld
  } 
  if(lm<10){
    lm='0'+lm
  } 
  
  laterDate = lyyy+'-'+lm+'-'+ld;

document.getElementById("datefield").setAttribute("min", today);
document.getElementById("datefield").setAttribute("max", laterDate);

}
function suntractDates(tripDay)
{
  let today = new Date().toISOString().slice(0, 10);
  var day1 = new Date(today); 
  var day2 = new Date(tripDay);
  console.log(day1,day2);
  var difference= Math.abs(day2-day1);
  let days = difference/(1000 * 3600 * 24)
  return days;
}

export{suntractDates,setDate}