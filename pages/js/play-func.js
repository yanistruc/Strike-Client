function handlePlay() {
    var version = document.getElementById("version_dropdown").value;
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
        alert("Communication error with Launcher.");
    }
}

function disconnect() {
    var version = document.getElementById("version_dropdown").selectedIndex;
    storeVersion(version)
    window.location.href = "login.html";
}

function closeLauncher() {
    var version = document.getElementById("version_dropdown").selectedIndex;
    storeVersion(version)
    sendAction("closeLauncher")
}

function openmods() {
    sendAction("open-mods")
}

function storeVersion(value) {
    var version = value;
    if (version) {
        localStorage.setItem("user_version", version);
    }
}

function getVersion() {
    var version = localStorage.getItem("user_version");
    if (version) {
        return version;
    } else {
        return document.getElementById("version_dropdown").selectedIndex;
    }
}

function onStart() {
    var version = getVersion();
    document.getElementById("version_dropdown").selectedIndex = version;
}

let selectedIndex = getVersion();

const version_dropdown = document.getElementById('version_dropdown');

version_dropdown.addEventListener('change', function() {
    storeVersion(document.getElementById("version_dropdown").selectedIndex);
    version_dropdown.selectedIndex = getVersion();
});