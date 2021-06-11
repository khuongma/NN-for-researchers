var x = 0;
var array = Array();

function readURL(input, y) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("blah-"+y).setAttribute("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}


function add_element_to_array() {
    array[x] = {
        name: document.getElementById("text1").value, 
        title: "",
        description: ""};

    if (array[x].name != "") {
        document.getElementById("text1").value = "";
        x++;
        var e = "<br/>";

        var t = ""

        var i = ""

        for (var y = 1; y < array.length + 1; y++) {
            
            t = `
            <br/>
            <div class="image-upload">
                <label for="file-class-${y}">
                    <img style="cursor: pointer;" src="./assets/upload512.png" id="blah-${y}" width="50px" height="50px" />
                </label>
            
            <input type="file" id="file-class-${y}" name="files" accept="image/jpg, image/png, image/jpeg" onchange="readURL(this, ${y});" multiple />
            </div>
            `
            // i += `
            
            // <img src="./assets/arrow-right.png" height="30px" />
            // <img src="./assets/training-layer.png" height="80px" /> 
            // <img src="./assets/arrow-right.png" height="30px" />
            // <br/><br/>`
            e += "Class " + y + ": <b>" + array[ y - 1 ].name + "</b><br/><br/>";
            
            console.log("Class " + y + ": " + array[y - 1].name + " added");
        }
        document.getElementById("Result").innerHTML = e;
        // document.getElementById("input-images").innerHTML = i;
        
    }

}

// click button1 if enter key is clicked function
var input = document.getElementById("text1");
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard and check if text1 is not empty
    if (event.keyCode === 13 && document.getElementById("text1").value !== "") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("button1").click();
    }
});

function start_teachable_machine() {
    /* global tm */
    const wizard = new tm.Wizard({
        classes: array,
        onLoad: () => {
            console.log("model has loaded");
        },
        onPrediction: predictions => {
            const images = document.querySelectorAll('.prediction-image');
            let highestProb = Number.MIN_VALUE;
            let highestIndex = -1;
            predictions.forEach((pred, i) => {
                if (pred.probability > highestProb) {
                    highestProb = pred.probability;
                    highestIndex = i;
                }
            });
            images.forEach((img, i) => {
                if (i === highestIndex) {
                    img.classList.remove('hidden');
                } else {
                    img.classList.add('hidden');
                }
            });
        },
        onSampleAdded: added => {
            console.log(added);
        },
        onTrain: () => console.log("train begins"),
        onReady: () => {
            const inferenceCamera = wizard.createInferenceCamera({
                size: 0
            });
            const cameraContainer = document.querySelector('#inference-camera-container');
            cameraContainer.appendChild(inferenceCamera);
            mainEl.classList.add('ready');
        }
    });
    wizard.open()
}

function addHere() {
    document.getElementById('addHere').appendChild(  document.getElementsByTagName('ta-wizard')[0] )
}

function removeHere() {
    var myobj = document.getElementsByTagName('ta-wizard')[0];
    myobj.remove();
}

function setValuesPerma() {
    try {
        document.getElementById("hidden-layer-img").setAttribute("src", "./assets/dense-layer.gif");
        document.getElementById("button1").remove();
        document.getElementById("addClasses").remove();

        document.getElementById("epochs-add").innerHTML = "<b>"+document.getElementById("epochs").value+"</b>";
        document.getElementById("learningRate-add").innerHTML = "<b>"+document.getElementById("learningRate").value+"</b>";
        document.getElementById("denseUnits-add").innerHTML = "<b>"+document.getElementById("denseUnits").value+"</b>";
        document.getElementById("batchSize-add").innerHTML = "<b>"+document.getElementById("batchSize").value+"</b>";

        document.getElementById("epochs-add").setAttribute("title", document.getElementById("epochs").value)
        document.getElementById("learningRate-add").setAttribute("title", document.getElementById("learningRate").value)
        document.getElementById("denseUnits-add").setAttribute("title", document.getElementById("denseUnits").value)
        document.getElementById("batchSize-add").setAttribute("title", document.getElementById("batchSize").value)

        document.getElementById("epochs_").remove();
        document.getElementById("learningRate_").remove();
        document.getElementById("denseUnits_").remove();
        document.getElementById("batchSize_").remove();
        document.getElementById("file-class-"+i).remove();
        
        
    } catch (error) {
        console.log("ignore for now "+error)
    }
    
}