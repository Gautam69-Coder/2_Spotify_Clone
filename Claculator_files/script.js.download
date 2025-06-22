let buttons = document.querySelectorAll(".btn");
let c=document.querySelector(".text");
for (let i = 0; i < buttons.length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", () => {
        let d = buttons[i]
        let f = d.innerText
        c= document.querySelector("input").value += f
        return c
    }
)
}
document.querySelector(".equal").addEventListener("click",()=>{
    document.querySelector("input").value=eval(c)
})

document.querySelector(".cut").addEventListener("click", () => {
    let input = document.querySelector("input");
    input.value = input.value.slice(0, -1); 
});

document.querySelector(".allcut").addEventListener("click", () => {
    let input = document.querySelector("input");
    input.value ="";
});



