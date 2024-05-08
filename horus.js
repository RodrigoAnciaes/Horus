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
        self.detectThirdPartyConnections();
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
    var uniqueConnections = this.getUniqueConnections(allConnectionsArray);
    this.showConnections(uniqueConnections);
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

Horus.prototype.getUniqueConnections = function(connections) { // Get unique connections
    var uniqueConnections = connections.filter(function(connection, index, self) {
        return self.indexOf(connection) === index;
    });
    return uniqueConnections;
    }

    
Horus.prototype.showConnections = function(connections) { // Show connections
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
    popup.innerHTML = '<h1>Third Party Connections</h1>';
    var ul = document.createElement('ul');
    connections.forEach(function(connection) {
        var li = document.createElement('li');
        li.innerHTML = connection;
        ul.appendChild(li);
    });
    popup.appendChild(ul);
    document.body.appendChild(popup);

    }

new Horus(); // Initialize Horus






