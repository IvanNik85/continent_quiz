$(document).ready(function () {    
    let continents = [];
    let images = [];
    let noRepeat = [];    
    let finalScore = 0;
    let rightAnswer;
    let page = $(".questionNum").html(); 
    quizPage();      

    async function quizPage() {        
        let res = await fetch('https://api.myjson.com/bins/a6da9');
        const myJson = await res.json();
        let allImages = await images;

        for(var i in myJson) {                
            images.push(myJson[i].image);
            continents.push(myJson[i].continent)              
        }      
        
        const randNum =  Math.floor(Math.random() * images.length);                           
        $(".mainScreen img").attr("src", `${allImages[randNum]}`);
        $(".one .name").html(`${continents[randNum]}`);  
        rightAnswer = continents[randNum];
        console.log(rightAnswer)
        noRepeat = [...noRepeat, $(".one .name").html()];            
        let questionNum = [".one .name", ".two .name", ".three .name"];
        while(noRepeat.length < 3) {
            let rand = continents[Math.floor(Math.random() * continents.length)];
            if(noRepeat.indexOf(rand) == -1) {
                noRepeat.push(rand);                    
            } 
        }         
        console.log(noRepeat)                        
        for(let i in questionNum) {
            $(`${questionNum[i]}`).html(noRepeat[i]);
        }  
    }       
    
    function clickEvents() {
        $(".one").click(rightAns);
        $(".two").click(rightAns);
        $(".three").click(rightAns);
    }
    clickEvents();

    function rightAns() {
        $(".next").css('display', 'block');
        let answer = $(this).find(".name").html();
        if(answer == rightAnswer) {       
           $(this).children().last().children().html("check").css("color","green");
           finalScore += 750;         
       } else {
        $(this).children().last().children().html("clear").css("color","red");
       }      
        $(".one").unbind('click', rightAns);
        $(".two").unbind('click', rightAns);
        $(".three").unbind('click', rightAns);            
    }    
    console.log(finalScore)
    $(".next").click(function() {
        console.log(finalScore)
        quizPage();
        $(this).hide();
        $(".questionNum").html(++page);   
        if(page == 6) {           
            window.location.href = './finishPage.html'; 
            $(".centered h5").html(finalScore);
        }             
        noRepeat = [];

        $(".result i").html("");
        clickEvents();
    });    
})