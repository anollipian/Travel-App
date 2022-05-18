setDate();

function setDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;

  var afterTwoWeeks = new Date(+new Date + 1209600000);

  var laterDate = afterTwoWeeks;
  var ld = laterDate.getDate();
  var lm = laterDate.getMonth() + 1;
  var lyyy = laterDate.getFullYear();

  if (ld < 10) {
    ld = '0' + ld
  }
  if (lm < 10) {
    lm = '0' + lm
  }

  laterDate = lyyy + '-' + lm + '-' + ld;

  document.getElementById("datefield").setAttribute("min", today);
  document.getElementById("datefield").setAttribute("max", laterDate);
  document.getElementById("enddatefield").setAttribute("min", today);
}
function subtractDates(tripDay) {
  let today = new Date().toISOString().slice(0, 10);
  var day1 = new Date(today);
  var day2 = new Date(tripDay);
  var difference = Math.abs(day2 - day1);
  let days = difference / (1000 * 3600 * 24)
  return days;
}
function subtractTwoDates(startDate, EndDate) {
  var day1 = new Date(startDate);
  var day2 = new Date(EndDate);
  var difference = Math.abs(day2 - day1);
  let days = difference / (1000 * 3600 * 24);
  return days;
}

function validateDates(startDate, EndDate) {
  var day1 = new Date(startDate);
  console.log(day1);
  var day2 = new Date(EndDate);
  console.log(day2);
  var regExp = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/;
  if(parseInt(EndDate.replace(regExp, "$3$2$1")) > parseInt(startDate.replace(regExp, "$3$2$1"))){
 // if (parseInt(day2.replace(regExp, "$3$2$1")) > parseInt(day1.replace(regExp, "$3$2$1"))) {
    return true;
  }
  else
    return false;
}

export { subtractDates, setDate, subtractTwoDates,validateDates }