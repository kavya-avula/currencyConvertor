const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn=document.querySelector("form button");
  const fromCurr=document.querySelector(".from select");
  const toCurr=document.querySelector(".to select");
  const msg=document.querySelector(".msg");
  const updateExchangeRate = async () => {
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
   // console.log(amtVal);
    if(amtVal == "" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
   // console.log(fromCurr.value,toCurr.value);
   const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
   let response = await fetch(url);
   // console.log(response);
   let data=await response.json();
   let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   let finalAmount = amtVal * rate;
   msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

   for(let select of dropdowns){
//     //console.log(code,countryList[code]);
   for(currCode in countryList){
   let newoption=document.createElement("option");
   newoption.innerText=currCode;
   newoption.value=currCode;
   if (select.name === "from" && currCode==="USD"){
       newoption.selected="selected";
  }else if(select.name === "to" && currCode === "INR"){
       newoption.selected="selected";
    }
     select.append(newoption);
}
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
 }


 const updateFlag = (element) => {
    let currCode=element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
 };


btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
   updateExchangeRate();
});

document.addEventListener("load", () => {
    updateExchangeRate();
});