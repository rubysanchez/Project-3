function createoptions(data) {
    //Create reference to first select
    stateselect = d3.select("#stateselect");

    //Append options to first select
    //data-ref=<state abbreviation>

    data.forEach((facility) => {
        cityselect
            .append("option")
            .text(facility.state)
            .property("value", facility.city)
            .property("data-ref", facility.name);
    });
    // //second reference
    // cityselect = d3.select("#cityselect");
    // //Second append
    // //data-belong=<state abbr> & data-ref=<name of hospital>
    // data.forEach((facility) => {
    //     cityselect
    //         .append("option")
    //         .text(facility.city)
    //         .property("value", facility.city)
    //         .property("data-ref", facility.city)
    //         .property("data-belong", facility.state);
    // });
    //third reference
    hospitalselect = d3.select("#hospitalselect")
        //third append
        //data-belong=<hospital name>
    data.forEach((facility) => {
        hospitalselect
            .append("option")
            .text(facility.name)
            .property("value", facility.name)
            .property("data-belong", facility.city);
    });
};