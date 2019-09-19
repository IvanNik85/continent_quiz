$(document).ready(function () {    
    let continents = [];
    let images = [];
    let noRepeat = [];    
    let topScores = [];
    let tempArr = [];
    let score = 0;
    let rightAnswer;
    let page = $(".questionNum").html(); 
    quizPage();  
    let date = new Date().toLocaleDateString();
    let rank = [".no1", ".no2", ".no3"];    
    let result = {
        date: "",
        score: ""
    }   
    let insertComma = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
    
    if(localStorage.getItem("topScores")) {
        topScores = JSON.parse(localStorage.getItem("topScores"));
        console.log(topScores)
    } else {
        topScores = [];
    }
        
    async function quizPage() {         
        let res = await fetch('https://api.myjson.com/bins/a6da9');
        const myJson = await res.json();   
        for(let i in myJson) {                
            images.push(myJson[i].image);
            continents.push(myJson[i].continent)              
        }      
        for(let i=0; i<3;i++) {                       
            $(rank[i]).html(`<i class="material-icons">
            chevron_left
            </i><i class="material-icons">
            more_horiz
            </i><i class="material-icons">
            chevron_right
            </i>`);     
            $(rank[i]).prev().html(`<i class="material-icons">
            more_horiz
            </i>`);
        }
        for(let i in topScores) {            
            if(topScores.length > 0) { 
                $(rank[i]).html(insertComma('' + topScores[i].score, ",", 1) + ' pts');
                $(rank[i]).prev().html(`on ${topScores[i].date}`);
            }
        }        
         
        $(".centered h5").html(JSON.parse(localStorage.getItem("score")));

        const randNum =  Math.floor(Math.random() * images.length);                           
        $(".mainScreen img").attr("src", `${images[randNum]}`);         
        rightAnswer = continents[randNum];
        
        console.log(rightAnswer)
        noRepeat = [...noRepeat, rightAnswer];            
        let questionNum = [".one .name", ".two .name", ".three .name"];
        while(noRepeat.length < 3) {
            let rand = continents[Math.floor(Math.random() * continents.length)];
            if(noRepeat.indexOf(rand) == -1) {
                noRepeat.push(rand);                    
            } 
        }      
        shuffle(noRepeat);
                              
        for(let i in questionNum) {
            $(`${questionNum[i]}`).html(tempArr[i]);
        }  
    }        

    function clickEvents() {
        $(".one").click(rightAns);
        $(".two").click(rightAns);
        $(".three").click(rightAns);
    }
    clickEvents();

    function rightAns() {  
        $(this).addClass('focus');
        let allThree = $(this).parent().children();  
        console.log(allThree[0])  
        $(".next").css('display', 'block');
        let answer = $(this).find(".name").html();
        if(answer == rightAnswer) { 
            score += 750;           
        } else {
            $(this).children().last().children().html("clear").css("color","red");  
        }

        for(let i =0; i< 3; i++) {               
            if(allThree[i].lastElementChild.previousElementSibling.innerHTML == rightAnswer) {
                allThree[i].lastElementChild.firstElementChild.innerHTML = "check";                                   
            }                                 
        }   
        
        $(".one").unbind('click', rightAns);
        $(".two").unbind('click', rightAns);
        $(".three").unbind('click', rightAns);            
    }    
    $(".next").click(function() { 
        $(".question").removeClass('focus');             
        console.log(score);
        quizPage();
        $(this).hide();
        $(".questionNum").html(++page);         
        console.log(result)
        if(page == 6) {               
            localStorage.setItem("score", JSON.stringify(score));  
            result.score = score,
            result.date = date;            
            topScores = [...topScores, result];  
            topScores.sort((a, b) => b.score-a.score);
            topScores.length > 3 && topScores.pop();            
            localStorage.setItem("topScores", JSON.stringify(topScores));
            $(".finishPage").show();
            $('.mainScreen').hide();  
            runCounter();  
        }       
        $(".result i").html("").css("color", "");        
        clickEvents();        
        tempArr = [];
    });  

    function runCounter() {       
        $('.centered h5').counterUp({
            delay: 10,
            time: 1500           
        });        
    }    

    $(".hide").delay(700).fadeIn(1600);

    function shuffle(array) {       
        for(let i = 0; i < 3; i++) {
            tempArr.push(array.splice(Math.floor(Math.random() * array.length), 1));
        }   
        return tempArr;  
    }   

    $(".play").click(function() {
        $('.home').hide();
        $('.mainScreen').show();
    });
})

