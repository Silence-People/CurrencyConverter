const Base_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList){
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;
    
    if(select.name === "from" && currCode ==="AUD"){
        newOption.selected = "selected";
    }else if(select.name === "to" && currCode ==="NPR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
}
select.addEventListener("change", (evt) =>{
    updateFlag(evt.target);
});

}
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        alert("Please enter a valid amount");
        amtVal = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(amtVal);
    console.log(fromCurr.value);
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

