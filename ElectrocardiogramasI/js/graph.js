function plotGraph(xValues, yValues, graphName, csvName) {
    csvName = csvName.split("_")[0];

    var data = [{
        x: xValues,
        y: yValues,
        mode: 'lines',
        line: { color: 'red' }
    }];

    //Setting proper aspect ratio to ensure squares are always shown
    var minY = Math.min(...yValues);
    var maxY = Math.max(...yValues);

    var yAxisSquares = (Math.abs(minY - 0.2) + (maxY + 0.2)) * 2

    var heightAspectRatioAdjusted = yAxisSquares * 66.66;

    //Single graph
    var layout = {
        title: csvName,
        showlegend: false,
        grid: { rows: 1, columns: 1, pattern: 'independent' },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        width: 10000,
        height: heightAspectRatioAdjusted + 150,
        xaxis: {
            showgrid: true,
            zeroline: false,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            linecolor: 'black',
            linewidth: 2,
            mirror: true,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.2,
            fixedrange: true, // Set fixedrange to true for the x-axis
        },
        yaxis: {
            showgrid: true,
            zeroline: true,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            linecolor: 'black',
            linewidth: 2,
            mirror: true,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.5,
            autorange: false,
            range: [minY - 0.2, maxY + 0.2],
            showticklabels: true,
            fixedrange: true // Set fixedrange to true for the y-axis
        },
    };


    // Create a new graph container element
    var graphContainer = document.createElement('div');
    graphContainer.id = 'graph-' + graphName;
    graphContainer.classList.add('graph-container');

    // Set the container element for the graph
    var container = document.getElementById('graphContainer');
    container.appendChild(graphContainer);

    // Generate the first graph using Plotly
    Plotly.newPlot(graphContainer, data, layout);

    graphContainer.on('plotly_click', function (eventData) {
        var pointData = eventData.points[0]; // Get the data of the clicked point

        // Extract the x and y coordinates from the point data
        var xCoordinate = pointData.x;
        var yCoordinate = pointData.y;

        // Check if the coordinates element already exists
        var coordinatesElement = document.getElementById('coordinates-' + graphName);
        if (coordinatesElement) {
            // If it exists, replace the content with the new coordinates
            coordinatesElement.innerText = '(' + xCoordinate + ', ' + yCoordinate + ')';
        } else {
            // If it doesn't exist, create a new span element for the coordinates
            coordinatesElement = document.createElement('span');
            coordinatesElement.id = 'coordinates-' + graphName;
            coordinatesElement.style.color = 'red';
            coordinatesElement.innerText = '(' + xCoordinate + ', ' + yCoordinate + ')';

            // Append the coordinates element to the graphContainer
            graphContainer.appendChild(coordinatesElement);
        }

        // Attach the event listener to the download button
        var downloadButton = document.getElementById('pdfDownload');
        downloadButton.addEventListener('click', function () {
            if (downloadName.length === 1) {
                downloadGraphAsPDF(coordinatesElement, downloadName[0]);
            } else {
                downloadGraphAsPDF(coordinatesElement, downloadName[0] + ' & ' + downloadName[1]);
            }
        });
    });


    createPDFButton(graphContainer, [csvName]);
}

var loadedFiles = []; // Array to track loaded files

function handleFile() {
    var fileInput = document.getElementById('fileInput');
    var files = fileInput.files;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Check if the file has already been loaded
        if (isFileLoaded(file)) {
            alert(file.name + ' has already been loaded.'); // Alert the user
            continue; // Skip to the next file
        }

        var reader = new FileReader();

        reader.onload = (function (file) {
            return function (e) {
                var contents = e.target.result;
                var { xValues, yValues } = parseCSV(contents);
                var csvName = file.name.split("_")[0];
                plotGraph(xValues, yValues, file.name, csvName);
                trackLoadedFile(file); // Track the loaded file
                
                // Check if any file is loaded
                if (loadedFiles.length > 0) {
                    // Show the downloadAllDivs
                    var downloadAllDivs = document.getElementById('downloadAllGraphsDiv');
                    downloadAllDivs.style.display = 'block';
                }
            };
        })(file);

        reader.readAsText(file);
    }
}

function isFileLoaded(file) {
    return loadedFiles.includes(file.name);
}

function trackLoadedFile(file) {
    loadedFiles.push(file.name);
}

// ------------------ TWO ECGS ------------------

function handleTwoFiles() {
    var fileInput = document.getElementById('twoFileInput');
    var files = fileInput.files;

    var xValues = [];
    var yValues1 = [];
    var yValues2 = [];

    var loadedFiles = 0;

    var csvsName = [];

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        reader.onload = (function (file) {
            csvsName.push(file.name.split("_")[0]);

            return function (e) {
                var contents = e.target.result;
                var { xValues, yValues } = parseCSV(contents);

                if (loadedFiles === 0) {
                    yValues1 = yValues;
                } else if (loadedFiles === 1) {
                    yValues2 = yValues;
                    plotDoubleGraph(xValues, yValues1, yValues2, csvsName);
                }

                loadedFiles++;
            };
        })(file);

        reader.readAsText(file);
    }
}

function handleTwoFiles() {
    var fileInput1 = document.getElementById('fileInput1');
    var fileInput2 = document.getElementById('fileInput2');
    var file1 = fileInput1.files[0];
    var file2 = fileInput2.files[0];
    var csvsName = [];
    var downloadButton = document.getElementById('pdfDownloadDouble');
    
    if (file1 && file2) {
      if (file1.name === file2.name) {
        alert('Cannot choose the same file in both buttons.');
        return;
      }

      if(downloadButton) {
        downloadButton.remove();
      }
      
      var reader1 = new FileReader();
      var reader2 = new FileReader();
      
      reader1.onload = function(e) {
        var fileContent1 = e.target.result;
        var { xValues, yValues } = parseCSV(fileContent1);
        csvsName.push(file1.name.split("_")[0]);
        var yValues1 = yValues;
        
        reader2.onload = function(e) {
          var fileContent2 = e.target.result;
          var { xValues, yValues } = parseCSV(fileContent2);
          csvsName.push(file2.name.split("_")[0]);
          var yValues2 = yValues;
          
          plotDoubleGraph(xValues, yValues1, yValues2, csvsName);
        };
        
        reader2.readAsText(file2);
      };
      
      reader1.readAsText(file1);
    } else {
      alert('Two files must be selected.');
    }
  }  

function plotDoubleGraph(xValues, yValues1, yValues2, csvsName) {
    var trace1 = {
        x: xValues,
        y: yValues1,
        mode: 'lines',
        line: { color: 'blue' },
        name: csvsName[0]
    };

    var trace2 = {
        x: xValues,
        y: yValues2,
        mode: 'lines',
        line: { color: 'red' },
        name: csvsName[1]
    };

    var data = [trace1, trace2];

    //Setting proper aspect ratio to ensure squares are always shown
    var minY = Math.min(...yValues1, ...yValues2);
    var maxY = Math.max(...yValues1, ...yValues2);

    var yAxisSquares = (Math.abs(minY - 0.2) + (maxY + 0.2)) * 2

    var heightAspectRatioAdjusted = yAxisSquares * 66.66;

    //Double graph
    var layout = {
        title: csvsName[0] + " & " + csvsName[1],
        showlegend: false,
        grid: { rows: 1, columns: 1, pattern: 'independent' },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        width: 10000,
        height: heightAspectRatioAdjusted + 150,
        dragmode: 'pan', // Allow only panning (movement) of the graph
        selectdirection: false, // Disable selection
        xaxis: {
            showgrid: true,
            zeroline: false,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            linecolor: 'black',
            linewidth: 2,
            mirror: true,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.2,
            fixedrange: true // Set fixedrange to true for the x-axis
        },
        yaxis: {
            showgrid: true,
            zeroline: true,
            gridcolor: '#bdbdbd',
            gridwidth: 1,
            linecolor: 'black',
            linewidth: 2,
            mirror: true,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.5,
            autorange: false,
            range: [minY - 0.2, maxY + 0.2],
            showticklabels: true,
            fixedrange: true, // Set fixedrange to true for the y-axis
        },
    };

    var graphContainer = document.getElementById('doubleGraphContainer');

    var coordinatesCounter = 0; // Counter for the coordinates

    Plotly.newPlot(graphContainer, data, layout).then(function () {
        // Add event listener to the graph container
        graphContainer.on('plotly_click', function (eventData) {
            var pointData = eventData.points; // Get the data of all clicked points

            // Display the coordinates in a <p> tag
            var coordinatesElement = document.getElementById('doubleCoordinates');
            
            if (!coordinatesElement) {
                var divElement = document.createElement('div');
                var downlaodButton = document.getElementById('pdfDownloadDouble');

                divElement.id = 'double-coordinates-download-container';

                // If coordinates element doesn't exist, create a new one
                coordinatesElement = document.createElement('p');
                coordinatesElement.id = 'doubleCoordinates';
                divElement.appendChild(coordinatesElement);
                downlaodButton.parentNode.insertBefore(divElement, downlaodButton);
            }

            // Clear the content of the coordinates element
            coordinatesElement.innerHTML = '';

            // Iterate over the clicked points and create <span> elements for each coordinate
            pointData.forEach(function (point) {
                var xCoordinate = point.x;
                var yCoordinate = point.y;

                // Create a <span> element with the corresponding color
                var spanElement = document.createElement('span');
                spanElement.style.color = point.curveNumber === 0 ? 'blue' : 'red';
                spanElement.textContent = '(' + xCoordinate + ', ' + yCoordinate + ')';

                // Append the <span> element to the coordinates element
                coordinatesElement.appendChild(spanElement);
            });
        });
    });

    createDoublePDFButton(graphContainer, [csvsName[0], csvsName[1]]);
}

// ------------------ SHARED FUNCTIONS ------------------

function parseCSV(csv) {
    let lines = replaceCommasForDots(csv);
    var xValues = [];
    var yValues = [];

    for (var i = 0; i < lines.length; i++) {
        var currentLine = lines[i].trim();
        var numberRegex = /^-?\d+(\.\d+)?$/;

        if (numberRegex.test(currentLine)) {
            var yValue = parseFloat(currentLine) / 1000;
            yValues.push(yValue);

            // Generate y-values based on the index and interval
            var xValue = i * 0.0019;
            xValues.push(xValue);
        }
    }

    return { xValues, yValues };
}

function replaceCommasForDots(data) {
    let lines = data.split("\n");
    let dataNoCommas = [];

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^-?\d+(,\d+)?$/)) {
            let currentLine = lines[i].replace(/,/g, ".");
            dataNoCommas.push(currentLine);
        }
    }

    return dataNoCommas;
}

function clearGraph(graphType) {
    if (graphType === 'single') {
        var graphContainer = document.getElementById('graphContainer');
        var coordinates = document.getElementById('coordinates');
        var downloadAllDivs = document.getElementById('downloadAllGraphsDiv');
        var firstChildDivId = graphContainer.firstElementChild.id;
        firstChildDivId = firstChildDivId.replace('graph-', '');

        loadedFiles = loadedFiles.filter(e => e !== firstChildDivId);
        graphContainer.innerHTML = '';
        coordinates.innerHTML = '';
        downloadAllDivs.style.display = 'none';
    } else if (graphType === 'double') {
        var doubleGraphContainer = document.getElementById('doubleGraphContainer');
        var coordinates = document.getElementById('doubleCoordinates');

        doubleGraphContainer.innerHTML = '';
        coordinates.innerHTML = '';
    }
}

function createPDFButton(graphContainer, downloadName) {
    var downloadButton = document.createElement('button');
    downloadButton.id = 'pdfDownload';
    downloadButton.innerText = "Exportar como PDF";
    downloadButton.addEventListener('click', function () {
        if (downloadName.length === 1) {
            downloadGraphAsPDF(graphContainer, downloadName[0]);
        } else {
            downloadGraphAsPDF(graphContainer, downloadName[0] + ' & ' + downloadName[1]);
        }
    });

    graphContainer.appendChild(downloadButton);
}

function createDoublePDFButton(graphContainer, downloadName) {
    var downloadButton = document.createElement('button');
    downloadButton.id = 'pdfDownloadDouble';
    downloadButton.innerText = "Exportar como PDF";
    downloadButton.addEventListener('click', function () {
        if (downloadName.length === 1) {
            downloadGraphAsPDF(graphContainer, downloadName[0]);
        } else {
            downloadGraphAsPDF(graphContainer, downloadName[0] + ' & ' + downloadName[1]);
        }
    });

    graphContainer.appendChild(downloadButton);
}

function downloadGraphAsPDF(graphContainer, csvName) {
    var graphDivId = graphContainer.id;
    var graphDiv = document.getElementById(graphDivId);

    // Get the child element with the class "plot-container" and "plotly"
    var childElement = graphDiv.querySelector('.plot-container.plotly');

    if (!childElement) {
        console.error('Child element not found with class "plot-container plotly"');
        return;
    }

    html2canvas(childElement, {
        scale: 1
    }).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');

        var pdf = new jspdf.jsPDF('l', 'mm', "a4");

        pdf.text(graphDivId, 10, 10)
        // Add the image with calculated dimensions
        pdf.addImage(imgData, 'PNG', 0, 15);
        
        // Save the PDF
        pdf.save(csvName + '.pdf');

    });
}

function downloadAllGraphsAsPDF() {
    var graphContainers = document.querySelectorAll('div[id^="graph-Derivacion"]');
    var pdf = new jspdf.jsPDF('l', 'mm', 'a4');

    var promises = [];

    for (var i = 0; i < graphContainers.length; i++) {
        var graphContainer = graphContainers[i];
        var graphDivId = graphContainer.id;
        var graphDiv = document.getElementById(graphDivId);

        var childElement = graphDiv.querySelector('.plot-container.plotly');

        var promise = html2canvas(childElement, { scale: 1 })
            .then(function (canvas) {
                var imgData = canvas.toDataURL('image/png');
                pdf.text(graphDivId, 10, 10)
                pdf.text("Veloc: 25 mm/s | Miemb: 10 mm/mV | Prec.: 10,0 mm/mV ", 10, 20)
                pdf.addImage(imgData, 'PNG', 0, 25);
                pdf.addPage();
            });

        promises.push(promise);
    }

    Promise.all(promises).then(function () {
        // Save the PDF
        pdf.save('all_graphs.pdf');
    });
}
