// Return result from dropDown
console.log("Refresh 16");


function changedOption(selectOption){
    // d3.event.preventDefault();
    console.log("changedOption : selectOption = ",selectOption);
    var addText = d3.select("#demographic");
    console.log("addText before: ",addText)
    addText.html=""; 
    demographicInfo(selectOption);
};

function demographicInfo(selectOption){
    // d3.event.preventDefault();
    var addText = d3.select("#demographic");
    d3.selectAll("p").remove();
    d3.json('Resources/samples.json').then((data)=>{ 
        var demoInfo = data.metadata.filter(row => row.id == selectOption);
        // console.log("Print demographicInfo : demoInfo= ",demoInfo)
        
        Object.entries(demoInfo[0]).forEach(([key,value])=>{
            // console.log("Print Object.entries : ",[key,value])  
                
            addText.append('p').text(`${key} : ${value}`);
        });
        
        var sampleBarChart = data.samples.filter(row => row.id == selectOption);
        console.log("sampleBarchart = ",sampleBarChart)
        
        var sample_values = sampleBarChart[0].sample_values;
        var sampleotu_ids = sampleBarChart[0].otu_ids.map(id=>`Otu Id ${id.toString()}`);

        console.log("Print sampleotu_ids ",sampleotu_ids);

        var slicedValue = sample_values.slice(0,10);
        console.log("Print slicedValue=",slicedValue);
        var slicedOtu = sampleotu_ids.slice(0,10);
       
        slicedValue.reverse();

        var trace1 = {
            x: slicedValue,
            y: slicedOtu,
            name: "Bar Chart",
            type: "bar",
            orientation: "h"
        };

        var data = [trace1];

        var layout = {
        
        };

        Plotly.newPlot("plot", data, layout)
    
        // console.log("sample_values = ",sample_values);
        // console.log("sampleotu_ids = ",sampleotu_ids);

        // console.log("sliceValue = ",slicedValue);
        // console.log("slicedOtu = ",slicedOtu);
        

        //Object.entries(sampleBarChart.sample_value)
        
        /*
        var sortedBySampleValue = sampleBarChart.sort((a,b)=> a.sample_values-b.sample_values);
        console.log("sortedBySampleValue=",sortedBySampleValue)
        var slickedSampleValues = sampleBarChart.slice(0,10)
        console.log("Print SlicedSampleValue=",slickedSampleValues);
        */
    });

}
    
function init(){
    //Import file from json
    d3.json('Resources/samples.json').then((data)=>{
    
        var sampleNames=data.names;
       
        var dropDown=d3.select('#select-otuId');
        sampleNames.forEach((sample)=>{
            dropDown.append('option')
                    .text(sample)
                    .property('this.value', sample);
        });
        
    });
    demographicInfo(941);
}
init();