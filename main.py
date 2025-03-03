import sys
import os
from PyQt5.QtCore import QUrl, pyqtSlot, QObject
from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QPushButton, QWidget
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
import portablemc
import portablemc.cli
import threading
import subprocess

class PythonBackend(QObject):
    def __init__(self):
        super().__init__()
        self.crack = False
        self.username = None
        self.email = None

    @pyqtSlot(str, str)
    def handle_action(self, action, value):
        if action == "play":
            threading.Thread(target=self._start_game_thread, args=(value,)).start()
        elif action == "login":
            self.crack = False
            self.email = value
            def login_page():
                portablemc.cli.main(["login", self.email])
            threading.Thread(target=login_page).start()
        elif action == "crack":
            self.crack = True
            self.username = value
        elif action == "open-mods":
            mods_folder = os.path.join(os.getenv('APPDATA'), '.minecraft', 'mods')
            if os.path.exists(mods_folder):subprocess.run(['explorer', mods_folder])
            else:print("The mods folder doesn't exist.")

    def start_game(self, version):
        if self.crack:
            portablemc.cli.main(["start", version, "-u", self.username])
        else:
            portablemc.cli.main(["start", version, "-l", self.email])

    def _start_game_thread(self, version):
        try:
            self.start_game(version)
        except Exception as e:
            print(f"Error starting the game: {e}")


    def _start_game_thread(self, version):
        try:
            self.start_game(version)
        except Exception as e:
            print(f"Error starting the game: {e}")


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Strike Client")
        self.setGeometry(100, 100, 800, 600)
        script_dir = os.path.dirname(os.path.abspath(__file__))
        html_file_path = os.path.join(script_dir, 'pages/login.html')
        self.browser = QWebEngineView(self)
        self.browser.setUrl(QUrl.fromLocalFile(html_file_path))
        self.setCentralWidget(self.browser)
        self.channel = QWebChannel(self)
        self.backend = PythonBackend()
        self.channel.registerObject('pythonBackend', self.backend)
        self.browser.page().setWebChannel(self.channel)
        self.browser.loadFinished.connect(self.on_load_finished)

    def on_load_finished(self):
        pass

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
