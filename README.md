# Strike-Client
A Python Launcher for Premium and Crack accounts without Minecraft Launcher.

## How to compile with PyInstaller

If you want to compile this Python project into a standalone executable, you can use **PyInstaller**. Follow the steps below to do so:

### Step 1: Install PyInstaller
Make sure that **Python** is installed on your machine. Then, install **PyInstaller** via **pip**. Open a console or terminal and run the following command:

```bash
pip install pyinstaller
```

### Step 2: Compile the Launcher
Make sure that **PyInstaller** is installed on your machine. Open a console or terminal and run the following command:

```bash
PyInstaller .\main.py --add-data "pages;pages" --onefile
```

### Step 3: Start the executable file
Once the compilation is complete, the executable file will be located in the "dist" folder