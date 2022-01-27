from logging import debug
from flask import Flask, app, render_template
from flaskext.mysql import MySQL
import json

from werkzeug.utils import redirect


app = Flask(__name__)

mysql = MySQL()

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_PORT"] = 3306
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pass_root"
app.config["MYSQL_DATABASE_DB"] = "db_university"

mysql.init_app(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/a_Propos")
def A_propos():
    return render_template("about.html")


@app.route("/data")
def data():
    return render_template("info.html")


@app.route("/quit")
def quit():
    return redirect("about.html")


# -------------------------------------------------------------------------------------


@app.route("/api/number_std_per_year")
def get_nombre_par_année():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("select annee,count(matricule) from resultats group by annee")
    D1 = cursor.fetchall()
    row_headers = ["annee", "mat"]
    cursor.close()

    json_nombre = []
    for result in D1:
        json_nombre.append(dict(zip(row_headers, result)))

    return json.dumps(json_nombre)


# -------------------------------------------------------------------------------------


@app.route("/api/Evolution_per_spec")
def evo_spe():
    data = {"annee": [], "donnee": []}

    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("select distinct annee from resultats")
    année = cursor.fetchall()
    les_année = [item[0] for item in année]
    data["annee"] = les_année

    cursor.execute("select distinct specialite from resultats")
    specialite = cursor.fetchall()
    specialités = [item[0] for item in specialite]
    for spe in specialités:
        cursor.execute(
            " select count(matricule) from resultats where specialite='"
            + spe
            + "' group by annee"
        )
        nombre = cursor.fetchall()
        le_nombre = [item[0] for item in nombre]
        data["donnee"].append({"label": spe, "data": le_nombre})

    return json.dumps(data)


# -------------------------------------------------------------------------------------


@app.route("/api/losers_in_speciality")
def admis():
    data2 = {"annee": [], "donnee": []}

    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("select distinct annee from resultats")
    année = cursor.fetchall()
    les_année = [item[0] for item in année]
    data2["annee"] = les_année

    cursor.execute("select distinct specialite from resultats")
    specialite = cursor.fetchall()
    les_specialités = [item[0] for item in specialite]
    for spe in les_specialités:
        cursor.execute(
            " select count(matricule) from resultats where specialite='"
            + spe
            + "'and moyenne<10 group by annee"
        )
        nombre = cursor.fetchall()
        le_nombre = [item[0] for item in nombre]
        data2["donnee"].append({"label": spe, "data": le_nombre})

    return json.dumps(data2)


# -------------------------------------------------------------------------------------




if __name__ == "__main__":
    app.run(debug=True)
