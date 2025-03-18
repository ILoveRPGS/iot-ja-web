const call = async () => {
    try{
        const response = await fetch('http://api.weatherapi.com/v1/current.json?key=489e117e4e00452988491921251803&q=Tampere&aqi=no', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.error) {
            console.error(data.error.message);
            return;
        }
        //create a linear gradient background for different weather conditions
        let weather = data['current']['condition']['text'];
       // weather = 'Sunny'; // For testing purposes
        let gradient = '';
        switch (weather) {
            case 'Sunny':
                gradient = 'linear-gradient(to right, #fbc531, #e84118)';
                break;
            case 'Partly cloudy':
                gradient = 'linear-gradient(to right, #dcdde1, #f5f6fa)';
                break;
            case 'Partly Cloudy':
                gradient = 'linear-gradient(to right, #dcdde1, #f5f6fa)';
                break;
            case 'Cloudy':
                gradient = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
                break;
            case 'Overcast':
                gradient = 'linear-gradient(to right, #636e72, #2d3436)';
                break;
            case 'Mist':
                gradient = 'linear-gradient(to right, #dfe4ea, #ced6e0)';
                break;
            case 'Patchy rain possible':
                gradient = 'linear-gradient(to right, #45aaf2, #2d98da)';
                break;
            case 'Patchy snow possible':
                gradient = 'linear-gradient(to right, #dff9fb, #c7ecee)';
                break;
            case 'Patchy sleet possible':
                gradient = 'linear-gradient(to right, #778beb, #546de5)';
                break;
            case 'Patchy freezing drizzle possible':
                gradient = 'linear-gradient(to right, #c7ecee, #95afc0)';
                break;
            case 'Thundery outbreaks possible':
                gradient = 'linear-gradient(to right, #353b48, #fbc531)';
                break;
            case 'Blowing snow':
                gradient = 'linear-gradient(to right, #dff9fb, #f5f6fa)';
                break;
            case 'Blizzard':
                gradient = 'linear-gradient(to right, #ffffff, #dcdde1)';
                break;
            case 'Fog':
                gradient = 'linear-gradient(to right, #636e72, #b2bec3)';
                break;
            case 'Freezing fog':
                gradient = 'linear-gradient(to right, #dcdde1, #b2bec3)';
                break;
            case 'Patchy light drizzle':
                gradient = 'linear-gradient(to right, #74b9ff, #0984e3)';
                break;
            default:
                gradient = 'linear-gradient(to right, #95a5a6, #7f8c8d)'; // Default for unknown conditions
                break;
        }
        document.getElementById('weather-station').style.background = gradient;
        console.log(data);
        document.getElementById('loading').style.display = 'none';
        const location = data['location'];
        const current = data['current'];
        console.log(location);
        console.log(current);
        document.getElementById('weather-icon').src = 'http://'+ current['condition']['icon'];
        //format the date to month/day
        let date = new Date(location['localtime']);
        let month = date.getMonth() + 1;
        //month into text
        switch (month) {
            case 1:
                month = 'Jan';
                break;
            case 2:
                month = 'Feb';
                break;
            case 3:
                month = 'Mar';
                break;
            case 4:
                month = 'Apr';
                break;
            case 5:
                month = 'May';
                break;
            case 6:
                month = 'Jun';
                break;
            case 7:
                month = 'Jul';
                break;
            case 8:
                month = 'Aug';
                break;
            case 9:
                month = 'Sep';
                break;
            case 10:
                month = 'Oct';
                break;
            case 11:
                month = 'Nov';
                break;
            case 12:
                month = 'Dec';
                break;
            default:
                month = 'Unknown';
                break;
        }
        let day = date.getDate();
        //display week day
        let weekDay = date.getDay();
        switch (weekDay) {
            case 0:
                weekDay = 'Sunday';
                break;
            case 1:
                weekDay = 'Monday';
                break;
            case 2:
                weekDay = 'Tuesday';
                break;
            case 3:
                weekDay = 'Wednesday';
                break;
            case 4:
                weekDay = 'Thursday';
                break;
            case 5:
                weekDay = 'Friday';
                break;
            case 6:
                weekDay = 'Saturday';
                break;
            default:
                weekDay = 'Unknown';
                break;
        }
        let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        document.getElementById('time').innerHTML = time;
        document.getElementById('date').innerHTML = month + '/' + day + ' ' + weekDay;
        document.getElementById('city').innerHTML = location['name'];
        document.getElementById('temperature').innerHTML = current['temp_c'] + '°C';
        document.getElementById('feels-like').innerHTML = 'FL: '+ current['feelslike_c'] + '°C';
        document.getElementById('dew-point').innerHTML = 'D-P: ' +current['dewpoint_c'] + '°C';
        document.getElementById('weather-text').innerHTML = current['condition']['text'];
        document.getElementById('humidity').innerHTML = 'H: '+ current['humidity'] + '%';
        //change the wind speed from km/h to m/s
        let windSpeed = current['wind_kph'] / 3.6;
        document.getElementById('wind-speed').innerHTML = 'WS: '+ windSpeed.toFixed(2) + ' m/s';
        document.getElementById('wind-direction').innerHTML = 'WD: ' + current['wind_dir'];
        //change the pressure from mb to bar
        let pressure = current['pressure_mb'] / 1000;
        document.getElementById('pressure').innerHTML = 'Air P: ' + pressure + ' bar';

    } catch (error) {
        console.error('Error:', error);
    }
}

call();