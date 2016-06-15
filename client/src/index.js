  var Map = require("./ajax_countries/public/map.js")

  var nations = JSON.parse(localStorage.getItem('nations')) || [];
  console.log(nations);

  window.onload = function(){

      style();
      setup();
      var mapdiv = document.getElementById('map')
      mappy = new Map({lat:27,lng:-4}, 2);
      mapdiv.innerHTML = mappy
      getMeth();

      }

      var style = function(){
        var body = document.querySelector('body')
        var text = document.querySelector('ul')
        var heading = document.querySelector('h1')
        body.style.backgroundColor = '#000';
        text.style.backgroundColor = 'grey'
        text.style.color = 'white'
        text.style.display = 'inline-block'
        text.style.borderRadius = '10px'
        text.style.padding = '10px'
        text.style.align = 'center'
        heading.style.backgroundColor = 'grey'
        heading.style.color = 'white'
        heading.style.display = 'block'
        heading.style.borderRadius = '10px'
        heading.style.textAlign = 'center'
      }

      var setup = function(){
                // var ul = document.getElementById('country-list')

                // ul.appendChild(p)
                countrySelector();
                }

  var countrySelector = function(){
    var url = "https://restcountries.eu/rest/v1"
    var request = new XMLHttpRequest();

    request.open("GET", url);
    request.onload = function(){
      if(request.status === 200){
        console.log("got the data");
        var jsonString = request.responseText;
        var countries = JSON.parse(jsonString);
        var ul = document.getElementById('country-list')      
        var form = document.createElement('form')
        var dropDown = document.createElement('select'  )
        var p = document.createElement('p')
        var cList = []

        dropDown.onchange = function(){
          var list = document.getElementById('list');

          for(var country of countries){
            if(country.name === dropDown.value){
              
              cList.push({name:country.name, latlng:country.latlng});
              var url = 'http://localhost:3000/list'
              var request = new XMLHttpRequest();
              request.open("POST", url);
              request.setRequestHeader("Content-Type", "application/json");
              request.onload = function() {
                if(request.status === 200) {

                }
              }
              request.send(JSON.stringify({name:country.name, latlng:country.latlng}))
              
              markMap(country)

            }
          }
          list.innerHTML = null;
          for (var i = cList.length - 1; i >= 0; i--) {
            var li = document.createElement('li')
            li.style.display = "inline-block"
            li.style.margin = "5px"
            li.innerText = cList[i].name + " | "
            list.appendChild(li)
          }

            ul.appendChild(p)
            
        }
           for (var country of countries)
           {
            var option = document.createElement('option')
            option.innerText = country.name         
            dropDown.appendChild(option);        
            }
        form.appendChild(dropDown);
        ul.appendChild(form);   
      }

    }

         request.send(null);
  }
var getMeth = function() {
  var list = document.getElementById('list');
  var url = 'http://localhost:3000/list'
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    console.log(request.responseText)
    if(request.status === 200){
      var listu = JSON.parse(request.responseText)
      console.log("cheese",listu);
      for (place of listu){
        var li = document.createElement('li')
        li.style.display = "inline-block"
        li.style.margin = "5px"
        li.innerText = place.name + " | "
        list.appendChild(li)
        markMap(place);
       }
      }
    }
    request.send(null);
  }
  var markMap = function(country){

    var center = {lat: country.latlng[0], lng: country.latlng[1]}
    // console.log(country);
    // console.log(map);
    mappy.addMarker(center,"1")

  }




