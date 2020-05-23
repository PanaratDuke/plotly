// Return result from dropDown
console.log("Refresh 17");


function changedOption(selectOption) {
    // d3.event.preventDefault();
    console.log("changedOption : selectOption = ", selectOption);
    var addText = d3.select("#demographic");
    console.log("addText before: ", addText)
    addText.html = "";
    demographicInfo(selectOption);
};

function demographicInfo(selectOption) {
    // d3.event.preventDefault();
    var addText = d3.select("#demographic");
    d3.selectAll("p").remove();
    d3.json('Resources/samples.json').then((data) => {
        var demoInfo = data.metadata.filter(row => row.id == selectOption);
        // console.log("Print demographicInfo : demoInfo= ",demoInfo)

        Object.entries(demoInfo[0]).forEach(([key, value]) => {
            // console.log("Print Object.entries : ",[key,value])  
            addText.append('p').text(`${key} : ${value}`);
        });

        // for guage chart
        // var wfreq = [];
        // Object.values(demoInfo[0]).forEach(v=>{
        //     console.log("print v=",v);
        //     wfreq = demoInfo[0].wfreq.push(v)});
        //     console.log('wfreq= ',wfreq)


        var sampleBarChart = data.samples.filter(row => row.id == selectOption);
        // console.log("sampleBarchart = ", sampleBarChart)

        // for bar chart
        var sample_values = sampleBarChart[0].sample_values;
        var sampleotu_ids = sampleBarChart[0].otu_ids.map(id => `Otu Id ${id.toString()}`);

        // for bubble chart
        var otu_ids = sampleBarChart[0].otu_ids

        

        // console.log("Print sampleotu_ids ", sampleotu_ids);

        var slicedValue = sample_values.slice(0, 10);
        // console.log("Print slicedValue=", slicedValue);
        var slicedOtu = sampleotu_ids.slice(0, 10);

        slicedValue.reverse();

        // Bar Chart
        var trace1 = {
            x: slicedValue,
            y: slicedOtu,
            marker:{
                color: ['rgb(209, 3, 250)', 'purple', ' rgb(70, 156, 255)','blue','rgb(56, 182, 6)','green', 'yellow','orange','red','rgb(150, 21, 3)']
              },
            name: "Bar Chart",
            type: "bar",
            orientation: "h"
        };
    
        // Bubble Chart
        var margin = { top: 10, right: 20, bottom: 30, left: 50 },
            width = 500 - margin.left - margin.right,
            height = 420 - margin.top - margin.bottom;

        var data = [trace1];
        var bar_layout = {
            title: 'Top 10 Bacteria Cultures Found', 
            margin: margin
        };

        var trace2 = {
            x: otu_ids,
            y: sample_values, 
            mode: 'markers', 
            marker: {
                size: sample_values.map(point=>point/3), 
                color: otu_ids, 
                colorscale: 'Earth'
            }
        };
        var data2=[trace2];
        var bubble_layout={
            title: 'Bacteria Cultures per Sample', 
            margin: {t:0}, 
            hovermode: 'closest', 
            xaxis: {
                title: 'OTU ID'
            }
        }
        Plotly.newPlot("plot", data, bar_layout);
        Plotly.newPlot("BubblePlot", data2, bubble_layout);
    });

}

function init() {
    //Import file from json
    d3.json('Resources/samples.json').then((data)=>{

        var sampleNames = data.names;

        var dropDown = d3.select('#select-otuId');
        sampleNames.forEach((sample) => {
            dropDown.append('option')
                .text(sample)
                .property('this.value', sample);
        });

    });
    demographicInfo(940);
}
init();