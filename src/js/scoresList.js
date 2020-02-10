export let topScores = [];
let rank = [".no1", ".no2", ".no3"];

// Set data in Local storage------------------------------------------------------
if (localStorage.getItem("topScores")) {
    topScores = JSON.parse(localStorage.getItem("topScores"));
} else {
    topScores = [];
}       

// Create list of scores on the main page-----------------------------------------
export function scoresList() {
    for (let i = 0; i < 3; i++) {
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

    for (let i in topScores) {
        if (topScores.length > 0) {
            $(rank[i]).html(insertComma('' + topScores[i].score, ",", 1) + ' pts');
            $(rank[i]).prev().html(`on ${topScores[i].date}`);
        }
    }
}

// Insert comma after first character in score list-------------------------------
let insertComma = (str, sub, pos) => {
    if (str.length > 3) {
        return `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
    }
    return str;
}