var pythonBackend = null;

        new QWebChannel(qt.webChannelTransport, function(channel) {
            pythonBackend = channel.objects.pythonBackend;
        });

        function premium() {
            var email = getEmail();
            var change_account;
            if (email == null) {
                while (email==null) {
                    storeEmail(prompt("Please enter your email"));
                }
            } else {
                while (change_account !== "Y" && change_account !== "N") {
                    change_account = prompt("Do you want to use the last account used? (Y/N)");
                }
                if (change_account === "N") {
                    var email = null;
                    while (email==null) {
                        email = prompt("Please enter your email");
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
                alert("Error : ", pythonBackend);
            }
        }