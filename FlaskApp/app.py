from flask import Flask
app = Flask("__name__")

@app.route("/")
def main():
    return "<img src='./images/batman.jpg'/>"
if __name__ == "__main__":
    app.run()
