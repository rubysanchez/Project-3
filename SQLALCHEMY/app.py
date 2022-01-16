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
        f"/api/hospitaltop10<br/"
        f"/api/hospitalbottom10"
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
    results = session.query(HAI.Facility_Name, HAI.Facility_ID, HAI.State, HAI.Pct_Catheter_Associated_Urinary_Tract_Infections, HAI.Pct_Central_Line_Associated_Bloodstream_Infections, HAI.Pct_Clostridium_Difficile_CDiff_Infections, HAI.Pct_MRSA_Bacteremia_Infections, HAI.Pct_Abdominal_Hysterectomy_Infections, HAI.Pct_SSI_Colon_Surgery_Infections, HAI.Catheter_Associated_Urinary_Tract_Infections_Numerator, HAI.Catheter_Associated_Urinary_Tract_Infections_Denominator, HAI.Central_Line_Associated_Bloodstream_Infection_Numerator, HAI.Central_Line_Associated_Bloodstream_Infection_Denominator, HAI.Clostridium_Difficile_CDiff_Numerator, HAI.Clostridium_Difficile_CDiff_Denominator, HAI.MRSA_Bacteremia_Numerator, HAI.MRSA_Bacteremia_Denominator, HAI.SSI_Abdominal_Hysterectomy_Numerator, HAI.SSI_Abdominal_Hysterectomy_Numerator, HAI.SSI_Abdominal_Hysterectomy_Denominator, HAI.SSI_Colon_Surgery_Numerator, HAI.SSI_Colon_Surgery_Denominator).all()
    

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_measures = []
    for Facility_Name, Facility_ID, State, Pct_Catheter_Associated_Urinary_Tract_Infections, Pct_Central_Line_Associated_Bloodstream_Infections, Pct_Clostridium_Difficile_CDiff_Infections, Pct_MRSA_Bacteremia_Infections, Pct_Abdominal_Hysterectomy_Infections, Pct_SSI_Colon_Surgery_Infections, Catheter_Associated_Urinary_Tract_Infections_Numerator, Catheter_Associated_Urinary_Tract_Infections_Denominator, Central_Line_Associated_Bloodstream_Infection_Numerator, Central_Line_Associated_Bloodstream_Infection_Denominator, Clostridium_Difficile_CDiff_Numerator, Clostridium_Difficile_CDiff_Denominator, MRSA_Bacteremia_Numerator, MRSA_Bacteremia_Denominator, SSI_Abdominal_Hysterectomy_Numerator, SSI_Abdominal_Hysterectomy_Denominator, SSI_Colon_Surgery_Numerator, SSI_Colon_Surgery_Denominator in results:
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
        measures_dict["cath_uti_num"] = Catheter_Associated_Urinary_Tract_Infections_Numerator
        measures_dict["cath_uti_dom"] = Catheter_Associated_Urinary_Tract_Infections_Denominator
        measures_dict["cntrl_line_num"] = Central_Line_Associated_Bloodstream_Infection_Numerator
        measures_dict["cntrl_line_dom"] = Central_Line_Associated_Bloodstream_Infection_Denominator
        measures_dict["cdiff_num"] = Clostridium_Difficile_CDiff_Numerator
        measures_dict["cdiff_dom"] = Clostridium_Difficile_CDiff_Denominator
        measures_dict["mrsa_num"] = MRSA_Bacteremia_Numerator
        measures_dict["mrsa_dom"] = MRSA_Bacteremia_Denominator
        measures_dict["ab_hyst_num"] = SSI_Abdominal_Hysterectomy_Numerator
        measures_dict["ab_hyst_dom"] = SSI_Abdominal_Hysterectomy_Denominator
        measures_dict["ssi_colon_num"] = SSI_Colon_Surgery_Numerator
        measures_dict["ssi_colon_dom"] = SSI_Colon_Surgery_Denominator

        
        all_measures.append(measures_dict)

    return jsonify(all_measures)

@app.route("/api/hospitaltop10")
def hospitaltop10():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of hospital data"""
    # Query all passengers
    results = session.query(HAI.Facility_Name, HAI.Facility_ID, HAI.Pct_Hospital_Acquired_Infections, HAI.Total_Numerator, HAI.Total_Denominator).\
    order_by(HAI.Pct_Hospital_Acquired_Infections).limit(10)

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    top10_list = []
    for Facility_Name, Facility_ID,  Pct_Hospital_Acquired_Infections, Total_Numerator, Total_Denominator in results:
        top10_dict = {}
        top10_dict["name"] = Facility_Name
        top10_dict["id"] = Facility_ID
        top10_dict["pct_infections"] = Pct_Hospital_Acquired_Infections
        top10_dict["numerator"] = Total_Numerator
        top10_dict["denominator"] = Total_Denominator
        top10_list.append(top10_dict)
        
    return jsonify(top10_list)

@app.route("/api/hospitalbottom10")
def hospitalbottom10():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of hospital data"""
    # Query all passengers
    results = session.query(HAI.Facility_Name, HAI.Facility_ID, HAI.Pct_Hospital_Acquired_Infections, HAI.Total_Numerator, HAI.Total_Denominator).\
    order_by(desc(HAI.Pct_Hospital_Acquired_Infections)).limit(10)

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    bottom10_list = []
    for Facility_Name, Facility_ID,  Pct_Hospital_Acquired_Infections, Total_Numerator, Total_Denominator in results:
        bottom10_dict = {}
        bottom10_dict["name"] = Facility_Name
        bottom10_dict["id"] = Facility_ID
        bottom10_dict["pct_infections"] = Pct_Hospital_Acquired_Infections
        bottom10_dict["numerator"] = Total_Numerator
        bottom10_dict["denominator"] = Total_Denominator
        bottom10_list.append(bottom10_dict)
        
    return jsonify(bottom10_list)

if __name__ == '__main__':
    app.run(debug=True)
