// Return result from dropDown
console.log("Refresh 11");


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