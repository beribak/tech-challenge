import ApexCharts from 'apexcharts'
import example from "./example.js";
example();

const cont = document.querySelector(".items-container");
let counter = 0;
// 1 GET DATA 
// 1.1 GET DATA FROM JSON FILE with fetch
fetch("http://localhost:8080/data.json")
.then(response => response.json())
.then(data => { 
    // 1.2 DISPLAY DATA
    // console.log(data); 
    
    // 2 MANIPULATE DATA
    // 2.1 CREATE CHARTS WITH https://apexcharts.com/ 
    data.profiles.forEach(item => {
        counter += 1;
        const values = [];
        const labels = [];

        item.data.forEach(entry => {
            values.push(entry.value);
            labels.push(entry.label);
        })
        
        // 2.1 Injecting data into charts with DOM manipulation   
        cont.insertAdjacentHTML('beforeend', 
            `<div id="chart${counter}" class="p-2 bg bg-primary mb-2">
                <div class="d-flex justify-content-between">
                    <h3>${item.title}</h3>
                    <div class="button" id="btn${counter}">Button</div>
                </div>
            </div>`        
        )

        var options = {
           series: values,
           chart: {
           type: 'donut',
           },
           labels: labels,
       };
       
       var chart = new ApexCharts(document.querySelector(`#chart${counter}`), options);
       chart.render();
       // 1. ADD AN EVENT LISTENER TO THE BUTTON
       const btn = document.querySelector(`#btn${counter}`)
       
       btn.addEventListener("click", () => {
            cont.insertAdjacentHTML('beforeend',
                `<div id="chart${counter + 1}" class="p-2 bg bg-primary mb-2">
                    <div class="d-flex justify-content-between">
                        <h3>${item.title}</h3>
                    </div>
                </div>`  
            )

            btn.outerHTML = "";

            var options = {
                series: values,
                chart: {
                type: 'donut',
                },
                labels: labels
            };

            var chart = new ApexCharts(document.querySelector(`#chart${counter + 1}`), options);
            chart.render();
        })

        // 2. DOM MANIPULATION, CREATE A CLONE ON THE BOTTOM OF THE CONTAINER
    })
})


// 3 DISPLAY DATA
    // 3.1 PUT COMPONENTS IN HTML
    

