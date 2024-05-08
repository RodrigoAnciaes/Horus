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
    var connectionsList = document.createElement('ul');
    connectionsList.style.position = 'fixed';
    connectionsList.style.top = '0';
    connectionsList.style.right = '0';
    connectionsList.style.backgroundColor = 'black';
    connectionsList.style.color = 'white';
    connectionsList.style.padding = '10px';
    connectionsList.style.listStyle = 'none';
    connectionsList.style.zIndex = '999999';
    connections.forEach(function(connection) {
        var listItem = document.createElement('li');
        listItem.textContent = connection;
        connectionsList.appendChild(listItem);
    });
    document.body.appendChild(connectionsList);
    console.log("Third party connections: ");
    console.log(connections);
    }

new Horus(); // Initialize Horus






