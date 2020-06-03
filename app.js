// Fetching data from the JSON file 
var json_file = "samples.json";

function name_display(){
    // var json_file = "samples.json";
    d3.json(json_file).then(function(data) {
        var names = data.names
        var sample_ids =d3.select("#selDataset")
        console.log(data);        
        names.forEach((znames)=>{
            sample_ids.append("option").text(znames).property("value",znames)
        });
        var first_name = names[0]
        fetch_data(first_name)
        meta_data(first_name)
    })
}

function fetch_data(names){
// var json_file = "samples.json";
    d3.json(json_file).then(function(data) {
        console.log(data);
        var samples = data.samples
        var results = samples.filter(x =>x.id ==names)
        var result = results[0]
        console.log(results)
        console.log(result)


    //pull in otu id's, sample_values and labels
        var sample_ids = result.otu_ids.slice(0,10);
        console.log(sample_ids);
        var sample_values = result.sample_values.slice(0,10);
        console.log(sample_values);
        var sample_labels = result.otu_labels.slice(0,10);
        console.log(sample_labels);    
    // var OTU_ID = ["OTU ", sample_ids].join(" ");
        var OTU_ID = sample_ids.map(x => "OTU " + x);
    //plot chart
            var trace1 = {
                x: sample_values,
                y: OTU_ID,
                type:"bar",
                orientation:"h",
                text: sample_labels    
    };
    var plotdata = [trace1];
    Plotly.newPlot("bar-plot-1", plotdata);
// });

var trace2 = {
        x: result.otu_ids,
        y: result.sample_values,
        mode: "markers",
                marker: {
                    size: result.sample_values,
                    color: result.otu_ids
                },
                text:  result.otu_labels   
};
var plotdata = [trace2];
Plotly.newPlot("bubble", plotdata);
});
}
name_display()
function optionChanged(chosen_sample){
    fetch_data(chosen_sample)
    meta_data(chosen_sample)
}

function meta_data(names){
    d3.json(json_file).then(function(data) {
        var sample_meta = data.metadata
        var sample_ids =d3.select("#sample-metadata")
        var results_meta = sample_meta.filter(x =>x.id ==names)
        var result = results_meta[0]
        console.log(results_meta)
        console.log(result)

    Object.entries(result).forEach(function([key, value]) {        
        var row = sample_ids.append("tr");
        // console.log(key,value);
        row.append("td").html(`<strong><font size = '1'>${key}</font></strong>:`);
        // console.log(key,value);
        row.append('td').html(`<font size ='1'>${value}</font>`);
        // console.log(key,value);
    });
    });
}
        
