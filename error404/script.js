const recommendedDisplay = document.getElementById("recommended");
const guess = document.getElementById("guess");

function levenshteinDistance(str1, str2) {
   const track = Array(str2.length + 1).fill(null).map(() =>
   Array(str1.length + 1).fill(null));
   for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
   }
   for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
   }
   for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
         const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
         track[j][i] = Math.min(
            track[j][i - 1] + 1, // deletion
            track[j - 1][i] + 1, // insertion
            track[j - 1][i - 1] + indicator, // substitution
         );
      }
   }
   return track[str2.length][str1.length];
};

const url = window.location.href
const page = url.slice(url.lastIndexOf('/') + 1);
const pages = ['home', 'games', 'wordlefinder', 'apps', 'minigames'];
const urls = ['home', 'games', 'apps/wordlefinder', 'apps', 'games/minigames'];

let recommended = null;
let recommendedDistance = 3;
for(i in pages){
  let distance = levenshteinDistance(page, pages[i]);
  if(distance <= recommendedDistance){
    recommended = i
    recommendedDistance = distance;
  }
}

if(recommended){
  recommendedDisplay.innerHTML = urls[recommended];
  recommendedDisplay.href = '/' + urls[recommended];
  guess.style.display = "block";
}
