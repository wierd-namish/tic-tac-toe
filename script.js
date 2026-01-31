let Audioturn = new Audio("turn.mp3");
let music= new Audio("music.mp3");
let gameover = new Audio("gameover.mp3"); 
let turn = "X";
let isgameover = false;
const  changeTurn = ()=>{
    return turn === "X"? "0": "X"
}
function checkwin() {
    let boxtexts = document.getElementsByClassName("boxText");
    let win = [
        [0, 1, 2, 5, 5, 0],       // Top Row
        [3, 4, 5, 5, 15, 0],      // Middle Row
        [6, 7, 8, 5, 25, 0],      // Bottom Row
        [0, 3, 6, 5, 15, 90],     // Left Col
        [1, 4, 7, 15, 15, 90],    // Middle Col
        [2, 5, 8, 25, 15, 90],    // Right Col
        [0, 4, 8, 5, 5, 45],      // Diag 1
        [2, 4, 6, 5, 25, 135]     // Diag 2
    ];

    win.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && 
            (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && 
            (boxtexts[e[0]].innerText !== "")) {
            
            document.querySelector(".Info").innerText = boxtexts[e[0]].innerText + " Won!";
            isgameover = true;
            
            // Show GIF
            document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width = "250px";
            
            // Draw Line - Fixed "transform" spelling and syntax
            let line = document.querySelector(".line");
            line.style.width = "20vw"; 
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
    });
}

// Inside your Reset listener, add this to hide the line:
document.getElementById("Reset").addEventListener("click", () => {
    // ... your existing reset code ...
    document.querySelector(".line").style.width = "0vw"; // Hide the line on reset
});


music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxText = element.querySelector(".boxText");
    element.addEventListener("click",()=>{
        if(boxText.innerText === ''){
            boxText.innerText = turn;
            turn = changeTurn();
            Audioturn.play();
            checkwin();
            if (!isgameover){
            document.getElementsByClassName("Info")[0].innerText = "Turn for " + turn;}
        }
        })
}) 
document.getElementById("Reset").addEventListener("click",()=>{
        let boxtexts = document.querySelectorAll(".boxText");
        Array.from(boxtexts).forEach(element=>{
            element.innerText="";
        });
        turn = "X";
        isgameover= false;
        document.getElementsByClassName("Info")[0].innerText = "Turn for " + turn;
        document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width = "0px";        
})