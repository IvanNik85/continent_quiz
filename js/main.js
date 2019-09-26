$(document).ready(function () {    
    let continents = [];
    let images = [];
    let contCopy;
    let imgCopy;
    let noRepeat = [];    
    let topScores = [];
    let tempArr = [];
    let score = 0;
    let rightAnswer;
    let page = $(".questionNum").html(); 
    let date = new Date().toLocaleDateString();
    let rank = [".no1", ".no2", ".no3"];    
    let result = {
        date: "",
        score: ""
    }      
    quizPage();    

    let insertComma = (str,sub,pos) => {
        if(str.length > 3) {
            return `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
        } 
        return str;
    }
    
    if(localStorage.getItem("topScores")) {
        topScores = JSON.parse(localStorage.getItem("topScores"));        
    } else {
        topScores = [];
    }
        
    async function quizPage() { 
        let res = await fetch('https://api.myjson.com/bins/a6da9');
        const myJson = await res.json();   

        for(let i in myJson) {                
            images.push(myJson[i].image);
            continents.push(myJson[i].continent);
            if(continents.length == 35) {
                contCopy = [...continents];
                imgCopy = [...images];   
            }        
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
        
        const randNum =  Math.floor(Math.random() * imgCopy.length);                           
        $(".mainScreen img").attr("src", `${imgCopy[randNum]}`);
        rightAnswer = contCopy[randNum];        
        contCopy.splice(randNum, 1);
        imgCopy.splice(randNum, 1);        
        noRepeat = [...noRepeat, rightAnswer];            
        let questionNum = [".one .name", ".two .name", ".three .name"];
        while(noRepeat.length < 3) {
            let rand = contCopy[Math.floor(Math.random() * contCopy.length)];
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
        let allThree = $(".question").parent().children();
         
        $(".next").css('display', 'block');
        let answer = $(this).find(".name").html();
        if(answer == rightAnswer) { 
            score += 750;   
        } else {
            $(this).find(".one2").css({
                "animation":"animateOne .5s forwards"               
            }).parent().css('margin-right','10px'); 
            $(this).find(".two2").css({
                "animation":"animateTwo .5s forwards"
            }); 
        }
        
        for(let i =0; i< 3; i++) {      
            if(allThree[i].lastElementChild.previousElementSibling.innerHTML == rightAnswer) {
               allThree[i].lastElementChild.firstElementChild.firstElementChild.style.animation = `checked1 .5s forwards`;  
               allThree[i].lastElementChild.firstElementChild.firstElementChild.nextElementSibling.style.animation = `checked2 .5s forwards`;                                               
            }                     
        }   

        $(".one").unbind('click', rightAns);
        $(".two").unbind('click', rightAns);
        $(".three").unbind('click', rightAns);         
    }  
      
    $(".next").click(function() { 
        $(".question").removeClass('focus');            
        $(".questionNum").html(++page);
        $(this).hide();
        quizPage();        
       
        if(page == 6) {               
            localStorage.setItem("score", JSON.stringify(score));
            $(".centered h5").html(score); 
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

        $('.one1').attr("style","");  
        $('.two1').attr("style","");
        $('.one2').attr("style","");  
        $('.two2').attr("style","");
        $('.check1').attr("style","");
    });  

    function runCounter() {       
        $('.centered h5').counterUp({
            delay: 10,
            time: 1500           
        });        
    }    

    function shuffle(array) {       
        for(let i = 0; i < 3; i++) {
            tempArr.push(array.splice(Math.floor(Math.random() * array.length), 1));
        }   
        return tempArr;  
    }   

    $(".hide").delay(700).fadeIn(1600);

    $(".play").click(function() {
        $('.home').hide();
        $('.mainScreen').show();
    });

    $(".question").append(
        `<i class="material-icons">category</i>
        <span class="name"></span>
        <div class="result1">
            <div class="check1">                        
                <div class="one1"></div>
                <div class="two1"></div>
                <div class="one2"></div>
                <div class="two2"></div>
            </div>
        </div>`
    );
  
})

