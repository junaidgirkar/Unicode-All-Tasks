//Decalring the Different Variable and Objects
let new_cases = document.getElementById("new_case");
let new_death = document.getElementById("new_death");
let total_death = document.getElementById("total_death");
let total_recovered = document.getElementById("total_recovered");
let total_cases = document.getElementById("total_cases");
let table = document.getElementById('countries_stat')
    // Fetching the Data from the server

//Fetching the World Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
        }
    })
    .then(response => response.json().then(data => {
        console.log(data);
        total_cases.innerHTML = data.total_cases;
        new_cases.innerHTML = data.new_cases;
        new_death.innerHTML = data.new_deaths;
        total_death.innerHTML = data.total_deaths;
        total_recovered.innerHTML = data.total_recovered;

    })).catch(err => {
        console.log(err);
    });

//Fetching The Case by Country Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "53009286a0mshdc8ec356f7aa205p1e0e80jsn5858f548ed53"
    }
})


//


.then(response => response.json().then(data => {
        //console.log(data)
        let countries_stat = data.countries_stat;
        //Getting all the country statistic using a loop
        for (let i = 0; i < countries_stat.length; i++) {
            console.log(countries_stat[i]);
            //we will start by inserting the new rows inside our table
            let row = table.insertRow(i + 1);
            let country_name = row.insertCell(0);
            let cases = row.insertCell(1);
            let deaths = row.insertCell(2);
            let serious_critical = row.insertCell(3);
            let recovered_per_country = row.insertCell(4);
            country_name.innerHTML = countries_stat[i].country_name;
            cases.innerHTML = countries_stat[i].cases;
            deaths.innerHTML = countries_stat[i].deaths;
            serious_critical.innerHTML = countries_stat[i].serious_critical;
            recovered_per_country.innerHTML = countries_stat[i].total_recovered;

        }
    }))
    .catch(err => {
        console.log(err);
    });










/*var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});*/