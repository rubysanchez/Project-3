import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import os
from sqlalchemy import desc
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hospitalacquiredinfections.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
HAI = Base.classes.CMSHAI

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/hospitalnames<br/>"
        f"/api/hospitaldata<br/>"
        f"/api/hospitalmeasures<br/"
        f"/api/hospitaltopten<br/"
        f"/api/hospitalbottomten"
    )

@app.route("/api/hospitalnames")
def hospitalnames():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all state names"""
    # Query all states
    results = session.query(HAI.Facility_Name).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/hospitaldata")
def hospitaldata():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of hospital data"""
    # Query all passengers
    results = session.query(HAI.Facility_Name, HAI.Facility_ID, HAI.City, HAI.State, HAI.Latitude, HAI.Longitude, HAI.Pct_Hospital_Acquired_Infections, HAI.Total_Numerator, HAI.Total_Denominator).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_data = []
    for Facility_Name, Facility_ID, City, State, Latitude, Longitude, Pct_Hospital_Acquired_Infections, Total_Numerator, Total_Denominator in results:
        data_dict = {}
        data_dict["name"] = Facility_Name
        data_dict["id"] = Facility_ID
        data_dict["city"] = City
        data_dict["state"] = State
        data_dict["lat"] = Latitude
        data_dict["lng"] = Longitude
        data_dict["pct_infections"] = Pct_Hospital_Acquired_Infections
        data_dict["numerator"] = Total_Numerator
        data_dict["denominator"] = Total_Denominator
        all_data.append(data_dict)

    return jsonify(all_data)

@app.route("/api/hospitalmeasures")
def hospitalmeasures():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of hospital data"""
    # Query all passengers
    results = session.query(HAI.Facility_Name, HAI.Facility_ID, HAI.State, HAI.Pct_Catheter_Associated_Urinary_Tract_Infections, HAI.Pct_Central_Line_Associated_Bloodstream_Infections, HAI.Pct_Clostridium_Difficile_CDiff_Infections, HAI.Pct_MRSA_Bacteremia_Infections, HAI.Pct_Abdominal_Hysterectomy_Infections, HAI.Pct_SSI_Colon_Surgery_Infections).all()
    

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_measures = []
    for Facility_Name, Facility_ID, State, Pct_Catheter_Associated_Urinary_Tract_Infections, Pct_Central_Line_Associated_Bloodstream_Infections, Pct_Clostridium_Difficile_CDiff_Infections, Pct_MRSA_Bacteremia_Infections, Pct_Abdominal_Hysterectomy_Infections, Pct_SSI_Colon_Surgery_Infections in results:
        measures_dict = {}
        measures_dict["name"] = Facility_Name
        measures_dict["id"] = Facility_ID
        measures_dict["state"] = State
        measures_dict["pct_cath_UTI"] = Pct_Catheter_Associated_Urinary_Tract_Infections
        measures_dict["pct_cntrl_line"] = Pct_Central_Line_Associated_Bloodstream_Infections
        measures_dict["pct_cdiff"] = Pct_Clostridium_Difficile_CDiff_Infections
        measures_dict["pct_mrsa"] = Pct_MRSA_Bacteremia_Infections
        measures_dict["pct_ab_hyst"] = Pct_Abdominal_Hysterectomy_Infections
        measures_dict["pct_ssi_colon"] = Pct_SSI_Colon_Surgery_Infections

        
        all_measures.append(measures_dict)

    return jsonify(all_measures)

@app.route("/api/hospitaltopten")
def hospitaltopten():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of hospital data"""
    # Query all passengers
    results = session.query(HAI.Facility_Name, HAI.Facility_ID, HAI.Pct_Hospital_Acquired_Infections, HAI.Total_Numerator, HAI.Total_Denominator).\
    order_by(HAI.Pct_Hospital_Acquired_Infections).limit(10)

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    topten_list = []
    for Facility_Name, Facility_ID,  Pct_Hospital_Acquired_Infections, Total_Numerator, Total_Denominator in results:
        topten_dict = {}
        topten_dict["name"] = Facility_Name
        topten_dict["id"] = Facility_ID
        topten_dict["pct_infections"] = Pct_Hospital_Acquired_Infections
        topten_dict["numerator"] = Total_Numerator
        topten_dict["denominator"] = Total_Denominator
        topten_list.append(topten_dict)
        
    return jsonify(topten_list)

@app.route("/api/hospitalbottomten")
def hospitalbottomten():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of hospital data"""
    # Query all passengers
    results = session.query(HAI.Facility_Name, HAI.Facility_ID, HAI.Pct_Hospital_Acquired_Infections, HAI.Total_Numerator, HAI.Total_Denominator).\
    order_by(desc(HAI.Pct_Hospital_Acquired_Infections)).limit(10)

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    bottomten_list = []
    for Facility_Name, Facility_ID,  Pct_Hospital_Acquired_Infections, Total_Numerator, Total_Denominator in results:
        bottomten_dict = {}
        bottomten_dict["name"] = Facility_Name
        bottomten_dict["id"] = Facility_ID
        bottomten_dict["pct_infections"] = Pct_Hospital_Acquired_Infections
        bottomten_dict["numerator"] = Total_Numerator
        bottomten_dict["denominator"] = Total_Denominator
        bottomten_list.append(bottomten_dict)
        
    return jsonify(bottomten_list)

if __name__ == '__main__':
    app.run(debug=True)
