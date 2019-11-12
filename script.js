document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=fe6e147802bb39363749e4b05067bcfe";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {	



        // Weather
        let results = "";
      results += '<fieldset><h1>Weather in ' + json.name + "</h1>";
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p><b>Description: </b>"
      for (let i=0; i < json.weather.length; i++) {
	results += json.weather[i].description
	if (i !== json.weather.length - 1)
	  results += ", "
      }
      results += "</p></fieldset>";
      document.getElementById("weatherResults").innerHTML = results;
      });



      // Forecast
      const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=fe6e147802bb39363749e4b05067bcfe";
      fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        let forecast = "";
        for (let i=0; i < json.list.length; i++) {
      forecast += "<fieldset><h2>" + moment(json.list[i].dt_txt).format('MMMM Do, h a') + "</h2>";
      forecast += "<p>Temperature: " + json.list[i].main.temp + " °F</p>";
      forecast += "<p>Wind Speed: " + json.list[i].wind.speed + " mph</p>";
      forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></fieldset>'
        }
        document.getElementById("forecastResults").innerHTML = forecast;;
    });
  
  });

