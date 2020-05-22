// Return result from dropDown
console.log("Refresh 15");


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

        var barChartData={};
        for (var i=0;i<sample_values.length;i++){
            // console.log("Print i=",i);
            var j=sampleotu_ids[i];
            barChartData[j]=+sample_values[i];
            // console.log("Print j=",j);
            // barChartData[`${j}`]=sample_values[i];
            
            // for(var r=0;r<sample_values.length;r++){
                
            //     barChartData["otuID"]=sampleotu_ids[i],
            //     barChartData["values"]=sample_values[i];
            // }; 
        };
        console.log("barChartData= ",barChartData);
        function sortByValue(jsobj){
            var sortedArray=[];
            var sortedObj={};
            for(var i in barChartData)
            {
                sortedArray.push({[jsobj[i]]:i});
                // console.log("before sorted= ",sortedArray)
                // why this doesn't work sortedArray.sort((a,b)=>{b-a})
                // sortedArray.sort(function(a,b){return b-a});
                // sortedObj[]
                // console.log("Print sortedArray=",sortedArray)
            }
            console.log("Print sortedArray=",sortedArray)
                sortedArray.sort(function(a,b){return b-a});
            console.log("Print after sortedfunction=",sortedArray)
            // sortedArray.forEach(e=>{
            //     sortedObj[e[0]]=e[1];
                
            // })
            // console.log("Print sortedObj=",sortedObj)
            // for (const [key,value] of Object.entries(barChartData)).sort(function(a,b){return b.value-a.value});
           
        }
        
        var sortedValue = sortByValue(barChartData)
        console.log("sortedArray = ",sortedValue)
        console.log("New forloop barCharData = ",barChartData);
        // var sortedValue=sortByKey(barChartData);
        // var sortedValue = barChartData.sort((a,b)=>b[1]-a[1]);
        // console.log("Print sortedValue", sortedValue)

        // console.log("sortedValue= ",sortedValue);

        var slicedValue = sample_values.slice(0,10);
        var slicedOtu = sampleotu_ids.slice(0,10);
        console.log("slicedValue=",slicedValue);
        console.log("slicedOtu=",slicedOtu);
        // reversedValue = slicedValue.reverse();
        // console.log("Print Reversed Value = ",reversedValue)
        // reversedOtu = slicedOtu.reverse();

        // var test = reversedValue.map(object=>object.sample_values);
        // console.log("test = ",test);

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
    
        console.log("sample_values = ",sample_values);
        console.log("sampleotu_ids = ",sampleotu_ids);

        console.log("sliceValue = ",slicedValue);
        console.log("slicedOtu = ",slicedOtu);
        

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