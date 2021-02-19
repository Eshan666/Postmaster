console.log("Hello postman");



let jsonRadio = document.getElementById("jsonRadio");
let parameterRadio = document.getElementById("parameterRadio");

let requestJsonBox = document.getElementById("requestJsonBox");
let parametersBox = document.getElementById("parametersBox");

requestJsonBox.style.display = "block";
parametersBox.style.display = "none";

jsonRadio.addEventListener("click", () => {

    requestJsonBox.style.display = "block";
    parametersBox.style.display = "none";
})


parameterRadio.addEventListener("click", () => {

    requestJsonBox.style.display = "none";
    parametersBox.style.display = "block";
})

let addParam = document.getElementById("addParam");

let paramCount = 0;

addParam.addEventListener("click", () => {

    let extraParams = document.getElementById("extraParams");
    extraParams.innerHTML += ` 
                                 <div>
                                 <label for="url" class="col-sm-2 col-form-label">Parameter ${paramCount + 2}</label>
                                <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${paramCount + 2}" placeholder="Enter Parameter ${paramCount + 2} Key">
                                  </div>
                                     
                                    <div class="col-md-4">
                                        <input type="text" class="form-control" id="parameterValue${paramCount + 2}"
                                            placeholder="Enter Parameter ${paramCount + 2} Value">
                                            </div>
                                            <button class="btn btn-primary deleteParam">-</button>
                                    </div>
                                `;


    let deleteParam = document.getElementsByClassName("deleteParam");

    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            alert("Do you want to delete the parameter?");
            e.target.parentElement.remove();
        })

    }

    paramCount++;
})


let responseJsonText = document.getElementById("responseJsonText");

let submit = document.getElementById('submit');


submit.addEventListener("click", () => {

    responseJsonText.placeholder = "Fetching your API";
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name ='requestType']:checked").value;
    let contentType = document.querySelector("input[name ='contentType']:checked").value;

    if (contentType == 'parameter') {
        data = {};
        for (let i = 0; i < paramCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }

    else if (contentType == 'json') {
        data = document.getElementById("requestJsonText").value;
    }


    if (requestType == "GET") {
        fetch(url, {
            method: 'GET'
        }).then(
            (response) => {
               return response.text();
            }
        ).then((text) => {
            document.getElementById("responseJsonText").value = text;
        });
    }

   
    else if (requestType == "POST") {
        fetch(url, {
            method: 'POST',
            body : data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        }).then(
            (response) => {
               return response.text();
            }
        ).then((text) => {
            document.getElementById("responseJsonText").value = text;
        });
    }



    //console.log(data);


    console.log(url);
    console.log(requestType);
    console.log(contentType);
})

