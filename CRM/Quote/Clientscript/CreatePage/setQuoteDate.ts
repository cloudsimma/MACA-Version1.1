
//var elem = ZDK.UI.getElementByID('Creator_Quotation_ID')
//elem.setVisibility(true);
var today = new Date(); //Mon Mar 07 2022 13:02:51
var mnth = today.toString().substr(4,3);
var date = today.toString().substr(8,2);
var year = today.toString().substr(11,4);

var month_map = '{"Jan": "01", "Feb": "02", "Mar": "03", "Apr":"04", "May": "05","Jun": "06","Jul":"07" , "Aug":"08", "Sep":"09", "Oct": "10" , "Nov": "11","Dec":"12" }';
var monthMap = JSON.parse(month_map);
//var date = mnth + " " + today.getDate() + ", " + today.getFullYear(); // Mar dd YYYY 
var TodayDate = year +"-"+monthMap[mnth] + "-" + date;   //yyy-mm-dd
console.log("TodayDate" + TodayDate);
ZDK.Page.getField("Quotation_Date").setValue(TodayDate);
