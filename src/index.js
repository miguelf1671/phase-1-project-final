const gamesUrl = "http://localhost:3000/games";
const game_reviews = document.querySelector("#game_reviews");
const logo = document.querySelector("#logo");
const icon = document.querySelector("#icon");
let totalLikes = document.querySelector("#amount");
let commmentSection = document.querySelector("#comment-section");
let commentContainer = document.querySelector("#comment-container");
let dataList = document.querySelector("#data-list");
let comment = document.querySelector("#commentBox")
let userName = document.querySelector("#username");

let selectedGame;
fetch(gamesUrl)
.then((response) => response.json())
.then((games) => {
    games.forEach(game => {
        addGames(game);
    });
})

function addGames(game){
    let gameImg = document.createElement("img");
    gameImg.setAttribute('id','gameImg');
    gameImg.src = game.image;
    game_reviews.append(gameImg);

    gameImg.addEventListener('click',()=>{
        comment.style.borderColor = "black";
        dataList.textContent='';
        let gameTitle = document.querySelector("#title");
        gameTitle.textContent = game.name;
        let yearReleased = document.querySelector("#year-released");
        yearReleased.textContent = "Year Released: " + game.release_year;
        let systemReviewedOn = document.querySelector("#system-reviewed-on");
        systemReviewedOn.textContent ="Reviwed On: " + game.system_reviewed_on;
        let description = document.querySelector("#description");
        description.textContent = game.review;
        let clickedGameImage = document.querySelector("#game-image");
        clickedGameImage.src = game.image;
        totalLikes.textContent = game.likes;
        game.comments.forEach(comment => {
            let oldList = document.createElement("li");
            oldList.textContent = comment;
            dataList.appendChild(oldList);
            console.log(selectedGame);
        });

        selectedGame = game;
    }
    )}

    icon.addEventListener('click',(event)=>{
        event.preventDefault();
        selectedGame.likes += 1;
        totalLikes.textContent = selectedGame.likes;
    })

    commmentSection.addEventListener('submit',(event)=>{
        event.preventDefault()
        let userNameValue = userName.value;
        let commentValue = comment.value;
        let commentList = document.createElement("li");
        selectedGame.comments.push([userNameValue + ": " + commentValue]);
        selectedGame.comments.forEach(comment => {
            commentList.textContent = comment;
            dataList.appendChild(commentList);
            console.log(selectedGame);
        });
        const originalPlaceholder = comment.getAttribute('placeholder');
        // const originalPlaceholderUserName = userName.getAttribute('placeholder');
        // userName.value = '';
        // Reset the input value to an empty string
        comment.value = '';
      
        // After a brief delay (e.g., 2 seconds), restore the original placeholder text
        setTimeout(function () {
          comment.setAttribute('placeholder', originalPlaceholder);
          userName.setAttribute('placeholder', originalPlaceholderUserName);
        }, 2000); // Adjust the delay time as needed (in milliseconds)
        
    })

comment.addEventListener('focus', (event)=>{
    event.preventDefault();
    event.target.style.borderColor = "blue";


});





// logo.addEventListener('mouseover',()=>{
//     logo.style.backgroundColor = "blue";

// })