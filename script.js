//
// VARIABLES
//



//
// FUNCTIONS
//
function getTodaysDate() {
    const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const day = daysInWeek[date.getDay()];
    const today = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    document.getElementById("day").textContent = day;
    document.getElementById("date").textContent = `${today} ${month} ${year}`;
}


//
// EVENTS
//
getTodaysDate();