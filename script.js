
async function fetchAndRenderCategories() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  const data = await res.json();
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  data.categories.forEach((cat) => {
    container.innerHTML += `
          <div class="col-6 col-sm-4 col-md-3 mb-4">
            <div class="card scroll-animate" style="background-color: #FFF4F7;">
              <img src="${cat.strCategoryThumb}" class="card m-2 img" alt="${cat.strCategory}" />
              <div class="card-body px-2 pt-2">
                <h5 class="card-title fw-bold regular-text m-0 p-0 text-center" style="font-size: 1rem;">${cat.strCategory}</h5>
              </div>
            </div>
          </div>`;
  });
}
fetchAndRenderCategories();

const cardContainer = document.getElementById("cardContainer");

const loadMeals = async (category) => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category);
  const data = await response.json();
  cardContainer.innerHTML = "";

  if (data.meals) {
    cardContainer.innerHTML += `
          <div class="row justify-content-center">
            <div class="col text-center">
              <h3 class="header mx-1 mt-5 pt-3 mb-5 py-0" style="color: rgb(0, 0, 0)">
                <span class="header">TastyClick</span> Search Results:
              </h3>
            </div>
          </div>
        `;

    data.meals.forEach((meal) => {
      cardContainer.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center mb-5">
              <div class="card animate__animated animate__fadeInUp animate__slower" style="max-width: 600px; background-color: #FFF4F7;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <div style="height: 60px;" class="d-flex align-items-center justify-content-center">
                    <h5 class="card-title header text-center mb-0" style="color: #e65c87;">${meal.strMeal}</h5>
                  </div>
                  <div class="d-flex justify-content-center mt-3">
                    <a href="view.html?meal=${meal.idMeal}" class="btn btn-primary" target="_blank" style="font-size: 0.90rem;">View Recipe</a>
                  </div>
                </div>
              </div>
            </div>`;
    });
  } else {
    cardContainer.innerHTML = `<p class="text-center regular-text my-4 fw-bold">No meals found for the category "${category}"</p>`;
  }
  document.getElementById("resultsSection").scrollIntoView({ behavior: 'smooth' });
};

function searchMeals() {
  const category = document.getElementById("searchTerm").value;
  loadMeals(category);
}

function checkEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMeals();
  }
}

// Dark and Light Mode
var colorMode = "light";

function changeMode() {
  var bodyElement = document.getElementById("body");

  // Toggle the color mode
  colorMode = (colorMode === "dark") ? "light" : "dark";
  bodyElement.setAttribute("data-bs-theme", colorMode);

}

// Function to check if the element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event
function handleScroll() {
  const elements = document.querySelectorAll('.scroll-animate');
  elements.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add('visible'); // Add visible class when in viewport
    } else {
      element.classList.remove('visible'); // Remove visible class when out of viewport
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

var categoryColors = {
  Beef: "#3A3F50",
  Chicken: "#FFB6C1",
  Dessert: "#B86E7C",
  Lamb: "#D6456B",
  Miscellaneous: "#CC8A9D",
  Pasta: "#FF8C94",
  Pork: "#F26A7A",
  Seafood: "#FF6385",
  Side: "#C07B7F",
  Starter: "#FF7D7D",
  Vegan: "#6FC3C8",
  Vegetarian: "#68B468",
  Breakfast: "#FFC884",
  Goat: "#FFB400",
};

var areaColors = {
  American: "#44475a",
  British: "#5c5f74",
  Canadian: "#6e7a8a",
  Chinese: "#3b3d4a",
  Croatian: "#4a4c5c",
  Dutch: "#5a5c6a",
  Egyptian: "#464a50",
  Filipino: "#6c7b8f",
  French: "#3e4053",
  Greek: "#515769",
  Indian: "#585b6b",
  Irish: "#4b4e5f",
  Italian: "#525560",
  Jamaican: "#6a6d7d",
  Japanese: "#4c4e5a",
  Kenyan: "#5d5f6c",
  Malaysian: "#4e505a",
  Mexican: "#555764",
  Moroccan: "#6a6b7d",
  Polish: "#63667a",
  Portuguese: "#4f515f",
  Russian: "#5c5e6e",
  Spanish: "#515463",
  Thai: "#585b6b",
  Tunisian: "#4b4d59",
  Turkish: "#525560",
  Ukrainian: "#4e505b",
  Unknown: "#30333f",
  Vietnamese: "#5a5c6a",
};

var title = document.getElementById("title");
var mealArea = document.getElementById("meal-area");
var mealCategory = document.getElementById("meal-category");
var ingredientsList = document.getElementById("ingredients");
var instructionsList = document.getElementById("instructions");
var youtubeLink = document.getElementById("youtube-link");
var img = document.getElementById("img");

// Function to load and display meal details based on meal ID
const loadMeal = async (mealId) => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId);
  const data = await response.json();

  if (data.meals && data.meals.length > 0) {
    const meal = data.meals[0];

    // Set meal title, area, and category
    title.innerHTML = meal.strMeal;
    mealArea.innerHTML = meal.strArea;
    mealCategory.innerHTML = meal.strCategory;

    // Set background color for area and category, with fallback color
    mealArea.style.backgroundColor = areaColors[meal.strArea] || "#000";
    mealCategory.style.backgroundColor = categoryColors[meal.strCategory] || "#000";

    // Set meal image source
    img.src = meal.strMealThumb;

    // Display ingredients and measurements
    ingredientsList.innerHTML = "";
    for (let i = 1; i <= 30; i++) {
      const ingredient = meal["strIngredient" + i];
      const measurement = meal["strMeasure" + i];
      if (ingredient) {
        // Create table row for each ingredient and measurement
        const tr = document.createElement("tr");
        const measurementCell = document.createElement("td");
        const ingredientCell = document.createElement("td");
        measurementCell.textContent = measurement;
        ingredientCell.textContent = ingredient;
        tr.appendChild(measurementCell);
        tr.appendChild(ingredientCell);
        ingredientsList.appendChild(tr);
      }
    }

    // Display instructions as bullet points
    const instructionsArray = meal.strInstructions.split(". ");
    instructionsList.innerHTML = "";
    instructionsArray.forEach((instruction) => {
      if (instruction.trim()) {
        const li = document.createElement("li");
        li.textContent = instruction.trim() + ".";
        instructionsList.appendChild(li);
      }
    });

    // Set YouTube link for the recipe video
    youtubeLink.href = meal.strYoutube;
  } else {
    // Display message if no meal is found
    title.innerHTML = "No meal found";
    console.error("No meal found in API response:", data);
  }
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has("meal")) {
  loadMeal(urlParams.get("meal"));
} else {
  title.innerHTML = "No meal found";
}