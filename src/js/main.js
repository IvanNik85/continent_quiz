import {getData, images, continents} from "./data";
import {topScores, scoresList} from "./scoresList"
import canvasData from "./canvas";

export function main() {

    $(function () {                    
        let noRepeat = [];              
        let tempArr = [];
        let rightAnswer; 
        let score = 0;  
        let date = new Date().toLocaleDateString();        
        let allThree = [".one",".two",".three"];
        let questionNum = [".one .name", ".two .name", ".three .name"];            
        let result = {
            date: "",
            score: ""
        }       
        
        // Cache DOM
        const $mainScreen = $(".mainScreen");
        const $htmlBody = $('html, body');
        const $one = $mainScreen.find(".one");
        const $two = $mainScreen.find(".two");
        const $three = $mainScreen.find(".three");
        const $question = $mainScreen.find(".question");
        const $questionNum = $mainScreen.find(".questionNum");
        const $nextBtn = $mainScreen.find(".next"); 
        const $finishPage = $(".finishPage"); 
        const $finalScore = $finishPage.find("h5"); 
        const $finishBtn = $('.finishBtn');       
        const $oneCheck = $question.find(".oneCheck");
        const $twoCheck = $question.find(".twoCheck");
        const $oneCross = $question.find(".oneCross");
        const $twoCross = $question.find(".twoCross");
        const $home = $('.home');
        const $hide = $home.find(".hide");  
        const $play = $home.find(".play");  
        let page = $questionNum.html();

        // Bind Events
        $nextBtn.on("click", nextQuestion);
        $finishBtn.on("click", finish);
        $play.on("click", play);

        function clickEvents() {
            $one.click(rightAns);
            $two.click(rightAns);
            $three.click(rightAns);
        }   

        clickEvents();
        canvasData();
        getData();     

        // Display not repeating questions and correct answer image------------------------
        function showQuestions() {        
            const randNum = Math.floor(Math.random() * images.length);
            $mainScreen.find("img").attr("src", `${images[randNum]}`);
            rightAnswer = continents[randNum];
            continents.splice(randNum, 1);
            images.splice(randNum, 1);
            noRepeat = [...noRepeat, rightAnswer];           
            // Add two more random questions to the noRepeat array
            while (noRepeat.length < 3) {
                let rand = continents[Math.floor(Math.random() * continents.length)];
                if (noRepeat.indexOf(rand) == -1) {
                    noRepeat.unshift(rand);
                }
            }
            
            shuffle(noRepeat);
           // Display shuffled questions
            for (let i in questionNum) {
                $(`${questionNum[i]}`).html(tempArr[i]);
            }
        }

        // Calculating correct answers scores and trigering animations----------------------
        function rightAns() {
            let $this = $(this);            
            $this.addClass('focus');    
            let answer = $this.find(".name").html();            
            setTimeout(function () {
                $nextBtn.css('display', 'block');
            }, 700)
            // Animating correct answer on its place
            allThree.forEach(function(a) {    
                const $a = $(a); 
                if($a.find(".name").html() === rightAnswer) {
                    $a.find(".oneCheck").css('animation','checkedOne .5s forwards');
                    $a.find(".twoCheck").css('animation','checkedTwo .5s forwards');
                }      
            })
            // Adding correct scores to result or animating wrong answer       
            if (answer === rightAnswer) {
                score += 750;
            } else {
                $this.find(".oneCross").css({
                    "animation": "crossOne .5s forwards"
                }).parent().css('margin-right', '6px');
                $this.find(".twoCross").css({
                    "animation": "crossTwo .5s forwards"
                });
            }       

            $htmlBody.delay(800).animate({
                scrollTop: $(document).height()
            }, 1200);

            (function unbindEvents() {
                $one.unbind('click', rightAns);
                $two.unbind('click', rightAns);
                $three.unbind('click', rightAns);
            })();                  
        }

        //******************************** NEXT QUESTION ********************************/        
        function nextQuestion() {
            tempArr.length = 0;
            $question.removeClass('focus');            
            $(this).hide();
            showQuestions();
            // Show result on page 6, filter results by score and date and storage them
            if (page !== 5)  {
                $questionNum.html(++page);
                $htmlBody.animate({
                    scrollTop: "0px"
                }, 650);
            } else {        
                let final = topScores;                   
                $finalScore.html(score);
                result.score = score,
                result.date = date;
                final = [...final, result];               
                final.sort((a, b) => b.score - a.score);
                final.sort((a, b) => {
                    if(a.score === b.score) {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    }                    
                });
                final.length > 3 && final.pop();
                localStorage.setItem("topScores", JSON.stringify(final));
                $finishPage.show();
                $mainScreen.hide();
                runCounter();
            } 
            
            clickEvents();   
            // Remove added animation styles        
            const animData = [$oneCheck, $twoCheck, $oneCross, $twoCross];            
            for(let i of animData) {
                i.removeAttr("style");
                i.parent().removeAttr("style");
            }                  
        }
        
        // Start counter-----------------------------------------------------------------
        function runCounter() {
            $finalScore.counterUp({
                delay: 10,
                time: 1500
            });
        }
        // Shuffle display order of questions
        function shuffle(array) {           
            for (let i = 0; i < 3; i++) {
                tempArr.push(array.splice(Math.floor(Math.random() * array.length), 1));
            }          
        }
        // Display scores
        function finish() {
            scoresList();
        }

        // Reveal questions and hide home screen
        function play() {
            $home.hide();
            $mainScreen.show();
            showQuestions();
        }

        // Reveal home screen
        $hide.delay(700).fadeIn(1600);
    })

}