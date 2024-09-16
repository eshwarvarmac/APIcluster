// function getCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }
// var viewMode = getCookie("view-mode");
// if(viewMode == "desktop"){
//     viewport.setAttribute('content', 'width=1024');
// }else if (viewMode == "mobile"){
//     viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
// }
const wordurl="https://api.dictionaryapi.dev/api/v2/entries/en/"
const type=document.querySelector(".submit .type")
const word=document.querySelector(".submit .word")
const submitButton=document.querySelector(".submit button")
async function wordInfo(word)
{
    const response=await fetch(wordurl+word);
    var data=await response.json();
    console.log(data);
    if(response.status===401)
    {
        document.querySelector(".error").style.display="block";
    }
    else
    {
        document.querySelector(".error").style.display="none";
    }
    if(data.title!=="No Definitions Found")
    {
        document.querySelector(".header").innerHTML=" "+data[0].meanings[0].definitions[0].definition
    }
    else
    {
        document.querySelector(".header").innerHTML="Sorry data not found"
    }
    
}
submitButton.addEventListener("click",()=>
{
        if(word.value.trim())
        {
            wordInfo(word.value);
        }
})
document.querySelector(".word").addEventListener("keypress", function(event) 
{
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".word-ele-click").click();
    }
});
wordInfo("Cluster");