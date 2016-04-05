var scanningInterval;

function initUIEvents() {
	var isMobile = ( /(android|ipad|iphone|ipod)/i.test(navigator.userAgent) );
	var press = isMobile ? 'touchstart' : 'mousedown';
	

function scanAndSend() {
	if(window.plugins && window.plugins.WifiAdmin) {
		var wf = window.plugins.WifiAdmin;
		wf.getWifiInfo(function(data){
			console.log( JSON.stringify(data) );
			
			var wifiConnected = data['activity'];
			var wifiList = data['available'];
			
			var html = "";
			if(wifiConnected != null) {
				html += "Connected to:<br/>" +
					"SSID: " + wifiConnected['SSID'] + "<br/>" +
					"BSSID: " + wifiConnected['BSSID'] + "<br/>" + 
					"Mac Addr: " + wifiConnected['MacAddress'] + "<br/>" + 
					"IP: " + ipIntToString( wifiConnected['IpAddress'] ) + "<br/>" +
					"Speed: " + wifiConnected['LinkSpeed'] + " Mbps<br/>"; 
			} else {
				html += "Not connected.<br/>";
			}
			
			html += "<br/>Available Wifi:<br/>";
			network_data = []
			while(wifiList.length >0) {
				var item = wifiList.shift();
				html += item['BSSID'] + '(' + item['level'] + 'dB, feq:' + (item['frequency']/1000.0).toFixed(2) + 'GHz)';
				if(item['BSSID'] === wifiConnected['BSSID']) html += '(*)';
				html += '<br/>';
				network_data.push({"mac": item['BSSID'],"rssi": item['level']})
			}
			var data = {
	            "group": "find",
	            "username": "zack",
	            "password": "none",
	            "location": "office",
	            "time": Date.now(),
	            "wifi-fingerprint": network_data
	        }
			$('div#wifilist').html( JSON.stringify(network_data) );

			$.ajax({
			   type: "POST",
			   url: "https://ml.internalpositioning.com/track",
			   dataType: "json",
			   data: JSON.stringify(data),
			   success: function(data) {
			     $('div#wifilist').html( JSON.stringify(data) );
			   },
			   error: function(e) {
			     $('div#wifilist').html('Error: ' + e.message);
			   }
			});

					
		}, function(){});
	}
}

	$('button#openwifi').on(press, function(){
		if(window.plugins && window.plugins.WifiAdmin) {
			var wf = window.plugins.WifiAdmin;
			wf.enableWifi(true);
		}
	});

	$('button#closewifi').on(press, function(){
		if(window.plugins && window.plugins.WifiAdmin) {
			var wf = window.plugins.WifiAdmin;
			wf.enableWifi(false);
		}
	});

	function ipIntToString(ip) {
		var str = "";
		for(var i=0; i<4; i++) {
			str += ip % 256;
			ip = Math.floor(ip / 256);
			if(i < 3) str += '.';
		}
		return str;
	}
	
	$('button#scanwifi').on(press, function(){
		console.log('button#scanwifi');
		scanAndSend();

	});

	$('button#connectwifi').on(press, function(){
		scanningInterval = setInterval(scanAndSend,2000);
		$('div#scanning').html("scanning");
	});

	$('button#disconnectwifi').on(press, function(){
		clearInterval(scanningInterval);
		$('div#scanning').html("not scanning");
	});
}

function main() {
	initUIEvents();

	document.addEventListener('deviceready', function () {
	    // Android customization
	    cordova.plugins.backgroundMode.setDefaults({ text:'FIND is running.'});
	    // Enable background mode
	    cordova.plugins.backgroundMode.enable();

	    // Called when background mode has been activated
	    cordova.plugins.backgroundMode.onactivate = function () {

	    }
	}, false);

}
