var pythonBackend = null;

        new QWebChannel(qt.webChannelTransport, function(channel) {
            pythonBackend = channel.objects.pythonBackend;
        });

        function premium() {
            var email = getEmail();
            var change_account;
            if (email == null) {
                while (email==null) {
                    storeEmail(prompt("Veuillez entrer votre E-mail"));
                }
            } else {
                while (change_account !== "Y" && change_account !== "N") {
                    change_account = prompt("Voulez-vous utiliser le dernier compte utilisé ? (Y/N)");
                }
                if (change_account === "N") {
                    var email = null;
                    while (email==null) {
                        email = prompt("Veuillez entrer votre E-mail");
                        storeEmail(email);
                    }
                }
            }
            sendAction("login", email);
            window.location.href = "play.html";
        }

        function crack() {
            var username = undefined;
            while (username==undefined) {
                username = prompt("Nom d'utilisateur");
            }
            sendAction("crack", username);
            window.location.href = "play.html";
        }

        function storeEmail(value) {
            var email = value;
            if (email) {
                localStorage.setItem("user_email", email);
            }
        }

        function getEmail() {
            var email = localStorage.getItem("user_email");
            if (email) {
                return email;
            } else {
                return null;
            }
        }

        function sendAction(action, value, str) {
            if (pythonBackend) {
                pythonBackend.handle_action(action, value, str);
            } else {
                alert("Erreur : ", pythonBackend);
            }
        }