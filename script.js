$(document).ready(function() {
  const imgURL1 = `https://weather-image-api.herokuapp.com/img/fall/pm1/partlycloudy/brendan-beale-ZJh5GUgNngo-unsplash.jpg`
  const imgURL2 = `https://weather-image-api.herokuapp.com/img/fall/pm3/rain/quinn-battick-uEf5HA74Nao-unsplash.jpg`
  

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ]

  const days_of_week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  const upperBar = document.querySelector(".upperBar");
  const upperMiddleBar = document.querySelector(".upperMiddleBar");
  const middleBar = document.querySelector(".middleBar");
  const lowerMiddleBar = document.querySelector(".lowerMiddleBar");
  const lowerBar = document.querySelector(".lowerBar");

  const dateContainer = document.querySelector("#dateContainer");
  const dayOfWeek = document.querySelector("#dayOfWeek");
  const todaysDate = document.querySelector("#todaysDate");
  const detailedForecast = document.querySelector("#detailedForecast");
  const bigForecast = document.querySelector("#bigForecast");
  const medForecast = document.querySelector("#medForecast");
  const smallForecast = document.querySelector("#smallForecast");
  const timeContainer = document.querySelector("#timeContainer");
  const tempContainer = document.querySelector("#tempContainer");
  const currentTempContainer = document.querySelector("#tempContainer");
  const currentTemp = document.querySelector("#currentTemp");
  const degreeSymbol = document.querySelector("#degreeSymbol");
  const tempRangeContainer = document.querySelector("#tempRangeContainer");
  const lowTemp = document.querySelector("#lowTemp");
  const tempRangeBar = document.querySelector("#tempRangeBar");
  const highTemp = document.querySelector("#highTemp");
  const weatherIconContainer = document.querySelector("#weatherIconContainer");
  const weatherIcon = document.querySelector("#weatherIcon");
  const shortForecastDisplay = document.querySelector("#shortForecastDisplay");

  const dataObj = {
    aqi : {
      aqi_msg: "",
      aqi_val: null,
      co_msg: "",
      co_ppm: null,
      nh3_msg: "",
      nh3_val: null,
      no_msg: "",
      no_val: null,
      no2_msg: "",
      no2_val: null,
      o3_msg: "",
      o3_val: null,
      pm10_msg: "",
      pm10_val: null,
      pm2_5_msg: "",
      pm2_5_val: null,
      so2_msg: "",
      so2_val: null
    },
    current_weather : {
      chance_hail: null,
      chance_precip: null,
      chance_rain: null,
      chance_snow: null,
      chance_thunder: null,
      cloud_cover: null,
      gust_mph: null,
      humidity: null,
      pressure_mb: null,
      pressure_in: null,
      temp_curr_f: null,
      temp_high_f: null,
      temp_low_f: null,
      uv_index: null,
      visibility_mi: null,
      wind_dir: null,
      wind_speed_mph: null,
    },
    custom_message : "",
    forecast_weather : {
      forecast_detailed: "",
      forecast_short: "",
      rain_accum_max_in: null,
      rain_accum_min_in: null,
      snow_accum_max_in: null,
      snow_accum_min_in: null,
    },
    historical_weather : {
    },
    is_day: null,
    img : {
      weather_bg_url : "",
      weather_icon : "",
    },
    lunar : {
      moon_illumination : "",
      moon_phase : "",
      moonrise : "",
      moonset : "",
    },
    pollen : {
      grass: null,
      overall: null,
      tree: null,
      ragweed: null,
    },
    solar : {
      astronomical_twilight_begin: "",
      astronomical_twilight_end: "",
      civil_twilight_begin: "",
      civil_twilight_end: "",
      day_length: "",
      day_period: "", // Not in Solar API
      nautical_twilight_begin: "",
      nautical_twilight_end: "",
      solar_noon: "",
      sunrise : "",
      sunrise_display: "", // Not in Solar API
      sunrise_am_pm: "", // Not in Solar API
      sunset : "", 
      sunset_display: "", // Not in Solar API
      sunset_am_pm: "", // Not in Solar API
    },
    styles : {
      font_color: "",
      temp_min_color: "",
      temp_max_color: "",
      temp_range_gradient: ""
    },
    time_and_date : {
      cur_time: "",
      day_of_month: "",
      day_of_week: "",
      display_time: "",
      holiday: "",
      millis: null,
      month: "",
      season: "",
      seconds: "",
      year: "",
    },
    toggle_seconds : false,
    toggle_nightmode : false,
    weather_alerts : {
      advisory : false,
      advisory_msg : "",
      warning : false,
      warning_msg : "",
      watch : false,
      watch_msg: ""
    }
  }

  dataObj.current_weather.temp_curr_f = 46
  dataObj.current_weather.temp_low_f = 36
  dataObj.current_weather.temp_high_f = 49

  dataObj.current_weather.detailedForecast = "Life is what happens when you’re busy making other plans."

  // Initialize
  hideIfEmpty()
  renderBackground()
  renderWeatherData()


  // Iterative calls
  this.interval = setInterval(() => {
    setTimeAndDate(new Date())


    // Pseudo
    // dataObj.current_weather.temp_curr_f = Math.floor(Math.random() * 1.6) + 45
    // console.log(dataObj.current_weather.temp_curr_f) 


    // TEST DIFFERENT MAX, MIN, AND CURRENT TEMPS
    // dataObj.current_weather.temp_curr_f = Math.floor(Math.random() * 99)
    // dataObj.current_weather.temp_low_f = Math.floor(Math.random() * 99)
    // dataObj.current_weather.temp_high_f = Math.floor(Math.random() * 20) + dataObj.current_weather.temp_low_f

    renderDateAndTime()
    renderWeatherData()
    hideIfEmpty()




  }, 1000);

  function hideIfEmpty() {
    $(currentTemp).text() === "" ? $(degreeSymbol).hide() : $(degreeSymbol).show()
  }


  function setTimeAndDate(d) {
    dataObj.time_and_date.cur_time = d.toTimeString().substring(0, 5)
    dataObj.time_and_date.day_of_month = d.getDate()
    dataObj.time_and_date.day_of_week = days_of_week[d.getDay()]
    dataObj.time_and_date.display_time = d.toLocaleTimeString().match(/[0-9]+[:][0-9]+/g)[0]
    dataObj.time_and_date.holiday = getHoliday(d)
    dataObj.time_and_date.millis = Date.now()
    dataObj.time_and_date.month = monthNames[d.getMonth()]
    dataObj.time_and_date.season = getSeason(Date.now())
    dataObj.time_and_date.seconds = d.getSeconds()
    dataObj.time_and_date.year = d.getFullYear()
  }

  function getSeason(millis) {
      // 2021
  if (millis < 1632294000000) return "Summer"
  if (millis < 1640073600000) return "Fall"
  if (millis < 1647759600000) return "Winter"
  // 2022
  if (millis < 1655794800000) return "Spring"
  if (millis < 1663830000000) return "Summer"
  if (millis < 1671609600000) return "Fall"
  if (millis < 1679322240000) return "Winter"
  // 2023
  if (millis < 1687334220000) return "Spring"
  if (millis < 1695451740000) return "Summer"
  if (millis < 1703302020000) return "Fall"
  if (millis < 1710903960000) return "Winter"
  // 2024
  if (millis < 1718916600000) return "Spring"
  if (millis < 1727008980000) return "Summer"
  if (millis < 1734772740000) return "Fall"
  if (millis < 1742461260000) return "Winter"
  }

  function getHoliday(d) {

    const month = d.getMonth() + 1
    const day_of_week = days_of_week[d.getDay()].toLowerCase()
    const day_of_month = d.getDate()
  
    if (month === 1 && day_of_month === 1) return "nyd"// New Year's Day
    if (month === 1 && day_of_week === "monday" && day_of_month >= 15 && day_of_month <= 21) return "mlk"
    if (month === 2 && day_of_month === 14) return "vtd" // Valentine's Day
    if (month === 3 && day_of_month === 17) return "spd" // Saint Patrick's Day
    if (month === 4 && day_of_month === 1) return "afd" // April Fools' Day
    if (month === 5 && day_of_week === "monday" && day_of_month >= 25 && day_of_month <= 31) return "mmd" // Memorial Day
    if (month === 6 && day_of_month === 19) return "jth" // Juneteenth
    if (month === 6 && day_of_week === "friday" && day_of_month >= 22 && day_of_month <= 28) return "pri" // Pride
    if (month === 6 && day_of_week === "saturday" && day_of_month >= 23 && day_of_month <= 29) return "pri" // Pride
    if (month === 6 && day_of_week === "sunday" && day_of_month >= 24 && day_of_month <= 30) return "pri" // Pride
    if (month === 7 && day_of_month === 4) return "ipd" // Independence Day
    if (month === 9 && day_of_week === "monday" && day_of_month >= 1 && day_of_month <= 7) return "lbd" // Labor Day
    if (month === 10 && day_of_month === 31) return "hal" // Halloween
    if (month === 11 && day_of_week === "thursday" && day_of_month >= 22 && day_of_month <= 28) return "thk" // Thanksgiving
    if (month === 12 && day_of_month === 24) return "cme" // Christmas Eve
    if (month === 12 && day_of_month === 25) return "cms" // Christmas
    if (month === 12 && day_of_month === 31) return "nye" // New Year's Eve"
  
  
    // Return empty string if there is no holiday
    return "none"
  }

  function getRGB(temperature) {
    const tempInt = parseInt(temperature)
    switch (tempInt) {
      case -1:
        return "252,252,255"
      case 0:
        return "240,240,255"
      case 1:
        return "228,228,255"
      case 2:
        return "216,216,255"
      case 3:
        return "204,204,255"
      case 4:
        return "192,192,255"
      case 5:
        return "180,180,255"
      case 6:
        return "168,168,255"
      case 7:
        return "156,156,255"
      case 8:
        return "144,144,255"
      case 9:
        return "132,132,255"
      case 10:
        return "120,120,255"
      case 11:
        return "108,108,255"
      case 12:
        return "96,96,255"
      case 13:
        return "84,84,255"
      case 14:
        return "72,72,255"
      case 15:
        return "60,60,255"
      case 16:
        return "48,48,255"
      case 17:
        return "36,36,255"
      case 18:
        return "24,24,255"
      case 19:
        return "12,12,255"
      case 20:
        return "0,0,255"
      case 21:
        return "0,12,255"
      case 22:
        return "0,24,255"
      case 23:
        return "0,36,255"
      case 24:
        return "0,48,255"
      case 25:
        return "0,60,255"
      case 26:
        return "0,72,255"
      case 27:
        return "0,84,255"
      case 28:
        return "0,96,255"
      case 29:
        return "0,108,255"
      case 30:
        return "0,120,255"
      case 31:
        return "0,132,255"
      case 32:
        return "0,144,255"
      case 33:
        return "0,156,255"
      case 34:
        return "0,168,255"
      case 35:
        return "0,180,255"
      case 36:
        return "0,192,255"
      case 37:
        return "0,204,255"
      case 38:
        return "0,216,255"
      case 39:
        return "0,240,255"
      case 40:
        return "0,255,255"
      case 41:
        return "0,255,252"
      case 42:
        return "0,255,240"
      case 43:
        return "0,255,228"
      case 44:
        return "0,255,216"
      case 45:
        return "0,255,204"
      case 46:
        return "0,255,192"
      case 47:
        return "0,255,180"
      case 48:
        return "0,255,168"
      case 49:
        return "0,255,156"
      case 50:
        return "0,255,144"
      case 51:
        return "0,255,128"
      case 52:
        return "0,255,112"
      case 53:
        return "0,255,80"
      case 54:
        return "0,255,64"
      case 55:
        return "0,255,48"
      case 56:
        return "0,255,32"
      case 57:
        return "0,255,16"
      case 58:
        return "16,255,0"
      case 59:
        return "32,255,0"
      case 60:
        return "48,255,0"
      case 61:
        return "64,255,0"
      case 62:
        return "80,255,0"
      case 63:
        return "112,255,0"
      case 64:
        return "128,255,0"
      case 65:
        return "144,255,0"
      case 66:
        return "160,255,0"
      case 67:
        return "176,255,0"
      case 68:
        return "192,255,0"
      case 69:
        return "204,255,0"
      case 70:
        return "216,255,0"
      case 71:
        return "228,255,0"
      case 72:
        return "240,255,0"
      case 73:
        return "252,255,0"
      case 74:
        return "255,255,0"
      case 75:
        return "255,244,0"
      case 76:
        return "255,232,0"
      case 77:
        return "255,220,0"
      case 78:
        return "255,208,0"
      case 79:
        return "255,196,0"
      case 80:
        return "255,184,0"
      case 81:
        return "255,172,0"
      case 82:
        return "255,160,0"
      case 83:
        return "255,148,0"
      case 84:
        return "255,136,0"
      case 85:
        return "255,124,0"
      case 86:
        return "255,112,0"
      case 87:
        return "255,100,0"
      case 88:
        return "255,88,0"
      case 89:
        return "255,76,0"
      case 90:
        return "255,64,0"
      case 91:
        return "255,52,0"
      case 92:
        return "255,40,0"
      case 93:
        return "255,28,0"
      case 94:
        return "255,16,0"
      case 95:
        return "255,4,0"
      case 96:
        return "255,10,10"
      case 97:
        return "255,20,20"
      case 98:
        return "255,30,30"
      case 99:
        return "255,40,40"
      case 100:
        return "255,50,50"
      case 101:
        return "255,60,60"
      case 102:
        return "255,70,70"
      case 103:
        return "255,80,80"
      case 104:
        return "255,90,90"
      case 105:
        return "255,100,100"
      case 106:
        return "255,110,110"
      case 107:
        return "255,120,120"
      case 108:
        return "255,130,130"
      case 109:
        return "255,140,140"
      case 110:
        return "255,150,150"
      case 111:
        return "255,160,160"
      case 112:
        return "255,170,170"
      case 113:
        return "255,180,180"
      case 114:
        return "255,190,190"
      case 115:
        return "255,200,200"
      case 116:
        return "255,210,210"
      case 117:
        return "255,220,220"
      case 118:
        return "255,230,230"
      case 119:
        return "255,235,235"
      case 120:
        return "255,240,240"
      case 121:
        return "255,252,252"
      default:
        return "255,255,255"
    }
  }

  function renderDateAndTime() {
    
    $(dayOfWeek).text(`${dataObj.time_and_date.day_of_week}`);
    $(todaysDate).text(`${dataObj.time_and_date.month} ${dataObj.time_and_date.day_of_month}`);
    $(timeContainer).text(`${dataObj.time_and_date.display_time}`);
    $(currentTemp).text(`${dataObj.current_weather.temp_curr_f}`);

    $(bigForecast).text(`${dataObj.current_weather.detailedForecast}`);

    $(weatherIcon).addClass(`fas fa-cloud-rain`);
    $(shortForecastDisplay).text(`Heavy rain`);
  }

  function renderWeatherData() {


    $(lowTemp).text(dataObj.current_weather.temp_low_f).css("color", `rgb(${getRGB(dataObj.current_weather.temp_low_f)})`)
    $(tempRangeBar).css(
      "background-image",
      `linear-gradient(to right, rgb(${getRGB(dataObj.current_weather.temp_low_f)}), rgb(${getRGB(
        dataObj.current_weather.temp_high_f
      )}))`
    )
    $(highTemp).text(dataObj.current_weather.temp_high_f).css("color", `rgb(${getRGB(dataObj.current_weather.temp_high_f)})`)



  }



  function renderBackground() {
    $(".pageContainer").css('background-image', `url(${imgURL2})`);
  }


  // End jQuery
});