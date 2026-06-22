BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let convertedAmount = document.querySelector(".to input");
let btn = document.querySelector(".convert-button button");
let msg = document.querySelector(".exchange-rate p")

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
    
    if(select.name==="from"&&currCode==="USD"){
        newOption.selected = "selected";
    }
    if(select.name==="to"&&currCode==="INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
}
select.addEventListener("change",(evt) =>{
    updateFlag(evt.target);
});
}

const updateFlag = async (element)=> {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


const convertCurrency = async () => {
    let amount = document.querySelector(".from input");
    let amtVal = amount.value;
    if (amtVal===""){
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = await data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal*rate;

    convertedAmount.value = finalAmount;

    msg.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`
}
btn.addEventListener("click", (evt)=>{
        evt.preventDefault();
        convertCurrency();
    });


window.addEventListener("load", () => {
  convertCurrency();
});
