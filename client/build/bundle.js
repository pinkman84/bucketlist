/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	  var Map = __webpack_require__(1)
	
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
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Map = function(latLng, zoom){
	
	  this.googleMap = new google.maps.Map( document.getElementById('map'), {
	    center: latLng,
	    zoom: zoom
	    // mapTypeId: google.maps.MapTypeId.SATELLITE
	  });
	
	  this.addInfoWindow = function(latLng, title) {
	    var marker = this.addMarker(latLng, title);
	    var infoWindow = new google.maps.InfoWindow({content: title})
	    marker.addListener('click', function(){
	      infoWindow.open(this.map, this)
	    })
	  };
	
	  this.addMarker = function(latLng, title) {
	
	    var marker = new google.maps.Marker({
	      position: latLng,
	      map: this.googleMap,
	      title: title
	    })
	    return marker
	  };
	
	  this.bindClick = function(){
	    google.maps.event.addListener(this.googleMap, 'click', function(event){
	      var latLng = {lat:event.latLng.lat(), lng: event.latLng.lng()}
	      this.addMarker(latLng, '!')
	    }.bind(this))
	  };
	
	  this.resetCenter = function(latLng){
	    this.googleMap.setCenter(latLng);
	  };
	
	}
	
	module.exports = Map;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map