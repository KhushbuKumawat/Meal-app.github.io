// Selectors
const favouriteMealContainer = document.getElementById(
  "favourite-meals-container"
);

// Event Listeners
document.addEventListener("DOMContentLoaded", getFavouriteMeals);
favouriteMealContainer.addEventListener("click", removeFromFavourites);

// Functions
// fetches and displays all favourite meals
function getFavouriteMeals() {
  let favouriteMealsId;

  if (localStorage.getItem("favourites") === null) {
    favouriteMealsId = [];
    return;
  } else {
    favouriteMealsId = JSON.parse(localStorage.getItem("favourites"));
  }

  let content = "";
  // loop over each meal ID and fetch for meals
  favouriteMealsId.forEach((mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => addfavouriteMeals(data.meals[0], content));
  });
}

// helper funtion that appends favourite meal to container
function addfavouriteMeals(meal, content) {
  content = `<div class = "meal-item d-flex flex-column align-items-center" id = "${meal.idMeal}">
    <div class = "meal-img">
        <img src = "${meal.strMealThumb}" alt = "food">
    </div>
    <div class = "meal-name">
        <h3>${meal.strMeal}</h3>
    </div>
    <button type="submit" class="btn btn-sm btn-outline-primary unfavourite-button"> Remove From Favourites </button>
    </div>`;
  favouriteMealContainer.innerHTML += content;
}

// to remove favourites from local storage
function removeFromFavourites(event) {
  if (!event.target.classList.contains("unfavourite-button")) {
    return;
  }
  // if unfavourite button is clicked get id of parent
  let favouriteMeal = event.target.parentElement;
  console.log(favouriteMeal);
  let mealId = favouriteMeal.id;
  let favouriteMealsId = JSON.parse(localStorage.getItem("favourites"));

  // find the id in the array of all favourite meals
  let idx = favouriteMealsId.indexOf(mealId);

  // remove the id from the array and save array in local storage
  favouriteMealsId.splice(idx, 1);
  localStorage.setItem("favourites", JSON.stringify(favouriteMealsId));

  // remove favourite meal element
  favouriteMeal.remove();
}
