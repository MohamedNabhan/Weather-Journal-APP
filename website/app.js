/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
let apiKey = '&appid=9de15a745db61e13b56676499b7d768b';



document.getElementById('generate').addEventListener('click', getUserCredentials);


function getUserCredentials(e) {
    const userZip = document.getElementById('zip').value;
    const userFav = document.getElementById('feelings').value;
    getUserTemp(baseURL,userZip,apiKey)

    .then((data) => {
        console.log(data);
        const day = data.list[0].dt_txt.slice(0,10);
        postData('/weather', {temp:data.list[0].main.temp,date:day, userRes: userFav})
        updateUI();
    })
}

const getUserTemp = async (baseURL,userZip,apiKey) => {
    const res = await fetch(baseURL+userZip+apiKey)
    try {
        const data = await res.json();
        console.log(data)
        return data;
      }  catch(error) {
        console.log("error", error);
      }
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log("newData",newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  const updateUI = async () => {
    const res = await fetch('/get')
    try {
        const userData = await res.json();
        document.getElementById('temp').innerHTML = "Your Temprature: " + userData[0].temp;
        document.getElementById('date').innerHTML = "Your Date: " + userData[0].date;
        document.getElementById('content').innerHTML = "Your MOOD: " + userData[0].userRes;

      }  catch(error) {
        console.log("error", error);
      }
}
