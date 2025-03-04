function handlePlay() {
    var version = document.getElementById("version").value;
    sendAction("play", version)
}

var pythonBackend = null;

new QWebChannel(qt.webChannelTransport, function(channel) {
    pythonBackend = channel.objects.pythonBackend;
});

function sendAction(action, value, str) {
    if (pythonBackend) {
        pythonBackend.handle_action(action, value, str);
    } else {
        alert("Erreur de communication avec le Launcher.");
    }
}

function disconnect() {
    window.location.href = "login.html";
}

function openmods() {
    sendAction("open-mods")
}