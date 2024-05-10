// Path: Horus.js
// Extension to detect and show third party conects and domains

function Horus() { // Constructor
  this.init();
}

Horus.prototype.init = function() { // Initialize Horus
    this.addEventListeners();
    }

Horus.prototype.addEventListeners = function() { // Add event listeners
    var self = this;
    window.addEventListener('load', function() {
        var thirdPartyConection = self.detectThirdPartyConnections();
        var cookies = self.detectCookies();
        var localStorage = self.detectLocalStorage();
        var sessionStorage = self.detectSessionStorage();
        var canvasFingerprint = self.detectCanvasFingerprint();
        self.showAll(thirdPartyConection, cookies, localStorage, sessionStorage, canvasFingerprint);
    });
    }

Horus.prototype.detectThirdPartyConnections = function() { // Detect third party connections
    var self = this;
    var allElements = document.getElementsByTagName('*');
    var allElementsArray = Array.prototype.slice.call(allElements);
    var allConnections = allElementsArray.map(function(element) {
        return self.getConnections(element);
    });
    var allConnectionsArray = [].concat.apply([], allConnections);
    var uniqueConnections = this.UniqueFilter(allConnectionsArray);
    var onlyThirdPartyConnections = uniqueConnections.filter(function(connection) {
        return connection.indexOf(window.location.hostname) === -1;
    });
    return onlyThirdPartyConnections;
    }

Horus.prototype.getConnections = function(element) { // Get connections
    var connections = [];
    if (element.tagName === 'SCRIPT') {
        connections.push(element.src);
    }
    if (element.tagName === 'IMG') {
        connections.push(element.src);
    }
    if (element.tagName === 'IFRAME') {
        connections.push(element.src);
    }
    if (element.tagName === 'LINK') {
        connections.push(element.href);
    }
    if (element.tagName === 'A') {
        connections.push(element.href);
    }
    return connections;
    }

Horus.prototype.UniqueFilter = function(connections) { // Get unique connections
    var uniqueConnections = connections.filter(function(connection, index, self) {
        return self.indexOf(connection) === index;
    });
    return uniqueConnections;
    }


Horus.prototype.detectCookies = function() { // Detect cookies
    var self = this;
    var cookies = document.cookie.split(';');
    var uniqueCookies = this.getUniqueCookies(cookies);
    return uniqueCookies;
    }

Horus.prototype.getUniqueCookies = function(cookies) { // Get unique cookies
    var uniqueCookies = cookies.map(function(cookie) {
        return cookie.split('=')[0].trim(); // Get cookie name
    });
    var uniqueCookies = this.UniqueFilter(uniqueCookies);
    return uniqueCookies;
    }


Horus.prototype.detectLocalStorage = function() { // Detect local storage
    var localStorage = Object.keys(window.localStorage);
    return localStorage;
    }



Horus.prototype.detectSessionStorage = function() { // Detect session storage
    var sessionStorage = Object.keys(window.sessionStorage);
    return sessionStorage;
    }


Horus.prototype.detectCanvasFingerprint = function() { // Detect canvas fingerprint
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var txt = 'BrowserLeaks,com <canvas> Fingerprint';
    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial"';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = '#069';
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(txt, 4, 17);
    var canvasData = canvas.toDataURL();
    return canvasData;
    }


Horus.prototype.showAll = function(thirdPartyConnections, cookies, localStorage, sessionStorage, canvasFingerprint) { // Show all
    var popup = document.createElement('div');
    popup.id = 'horus-popup';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.right = '0';
    popup.style.width = '300px';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'white';
    popup.style.zIndex = '999999';
    popup.style.overflow = 'scroll';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.fontFamily = 'Arial';
    popup.style.fontSize = '12px';
    popup.style.color = 'black';
    popup.style.textAlign = 'left';
    popup.style.lineHeight = '1.5';
    popup.style.boxSizing = 'border-box';

    popup.innerHTML = '<h1>Canvas Fingerprint</h1>';
    var img = document.createElement('img');
    img.src = canvasFingerprint;
    popup.appendChild(img);
    
    document.body.appendChild(popup);

    popup.innerHTML += '<h1>Amount of cookies added by this page: ' + cookies.length + '</h1>';
    popup.innerHTML += '<h1>Current Page Cookies</h1>';
    var cookiesList = document.createElement('ul');
    cookies.forEach(function(cookie) {
        var li = document.createElement('li');
        li.innerHTML = cookie;
        cookiesList.appendChild(li);
    });
    popup.appendChild(cookiesList);
    
    popup.innerHTML += '<h1>Local Storage</h1>';
    var localStorageList = document.createElement('ul');
    localStorage.forEach(function(item) {
        var li = document.createElement('li');
        li.innerHTML = item;
        localStorageList.appendChild(li);
    });
    popup.appendChild(localStorageList);
    
    popup.innerHTML += '<h1>Session Storage</h1>';
    var sessionStorageList = document.createElement('ul');
    sessionStorage.forEach(function(item) {
        var li = document.createElement('li');
        li.innerHTML = item;
        sessionStorageList.appendChild(li);
    });
    popup.appendChild(sessionStorageList);


    popup.innerHTML += '<h1>Amount of third party connections: ' + thirdPartyConnections.length + '</h1>';
    popup.innerHTML += '<h1>Third Party Connections</h1>';
    
    var thirdPartyConnectionsList = document.createElement('ul');
    thirdPartyConnections.forEach(function(connection) {
        var li = document.createElement('li');
        li.innerHTML = connection;
        thirdPartyConnectionsList.appendChild(li);
    });
    popup.appendChild(thirdPartyConnectionsList);
}

new Horus(); // Initialize Horus






