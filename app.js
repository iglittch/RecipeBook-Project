let recipes = [];
let editingId = null;
const mealColors = {
  breakfast: "#F2D894",
  lunch: "#F9ECE3",
  dinner: "#D2C7E5",
  dessert: "#F9C0AF"
};

document.addEventListener("DOMContentLoaded", () => {
  const addRecipeForm = document.getElementById("add-recipe-form");
  if (addRecipeForm) {
    addRecipeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const recipeName = document.getElementById("rnamefield").value.trim();
      const ingredients = document.getElementById("ingredients").value.trim();
      const instructions = document.getElementById("instructions").value.trim();
      const mealType = document.getElementById("meal-type-input").value.toLowerCase();
      if (!recipeName) {
        alert("Please enter a recipe name.");
        return;
      }
      if (editingId) {
        recipes = recipes.map(recipe => {
          if (recipe.id === editingId) {
            return { ...recipe, name: recipeName, ingredients: ingredients, instructions: instructions, mealType: mealType };
          }
          return recipe;
        });
        editingId = null;
      } else {
        const newRecipe = {
          id: Date.now(),
          name: recipeName,
          ingredients: ingredients,
          instructions: instructions,
          mealType: mealType
        };
        recipes.push(newRecipe);
      }
      displayRecipes();
      addRecipeForm.reset();
    });
  }
  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("search-input").value.trim().toLowerCase();
      displayRecipes(query);
    });
  }
});

function displayRecipes(searchQuery = "") {
  const recipeContainer = document.getElementById("recipe-list");
  recipeContainer.innerHTML = "";
  const filteredRecipes = recipes.filter(recipe => {
    return (
      recipe.name.toLowerCase().includes(searchQuery) ||
      recipe.ingredients.toLowerCase().includes(searchQuery) ||
      recipe.instructions.toLowerCase().includes(searchQuery) ||
      recipe.mealType.toLowerCase().includes(searchQuery)
    );
  });
  if (filteredRecipes.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }
  filteredRecipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    if (recipe.mealType && mealColors[recipe.mealType]) {
      recipeCard.style.backgroundColor = mealColors[recipe.mealType];
    }
    recipeCard.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Meal Type:</strong> ${recipe.mealType}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button onclick="editRecipe(${recipe.id})">Edit Recipe</button>
      <button onclick="deleteRecipe(${recipe.id})">Delete Recipe</button>
    `;
    recipeContainer.appendChild(recipeCard);
  });
}

function deleteRecipe(id) {
  recipes = recipes.filter(recipe => recipe.id !== id);
  displayRecipes();
}

function editRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  document.getElementById("rnamefield").value = recipe.name;
  document.getElementById("ingredients").value = recipe.ingredients;
  document.getElementById("instructions").value = recipe.instructions;
  document.getElementById("meal-type-input").value = recipe.mealType;
  editingId = id;
}
function expandTextarea(textarea) {
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + "px";
  }
  