const backPhoto = document.querySelector('.meal-wrapper')
backPhoto.classList.add('back-photo')
const searchBtn = document.getElementById('search-btn')

// eventListener
searchBtn.addEventListener('click', getMealList)

// get meal list that matches with the ingredients
async function getMealList () {
   
    
    let searchInputText = document.getElementById('search-input').value.trim();
    const APP_ID = 'a35c5258'
    const APP_KEY = '6babdafeec5915831f9300d5e6b8b460'
    const baseUrl = `https://api.edamam.com/search?q=${searchInputText}&to=27&app_id=${APP_ID}&app_key=${APP_KEY}`;
    try{
        const response = await fetch(baseUrl);
        const data = await response.json();
        renderCard(data.hits)
        
    }catch(error){
        console.log(error);
    }
}


// render card
const renderCard = (data) =>{
  
        // get meal-result and creat meal 
        
        let mealResult = document.querySelector('.meal-result')
        mealResult.innerHTML = "";
        mealResult.style.color = "";
        let meal = document.createElement('div')
        meal.id = 'meal';
        mealResult.appendChild(meal);
    if(data.length !== 0){
        data.forEach(data => {   
            // creatElement 
            const mealItem = document.createElement('div')
            const mealImg = document.createElement('div')
            const mealName = document.createElement('div')
            const imgElement = document.createElement('img')
            const recipeName = document.createElement('h3')
            const getRecipeBtn = document.createElement('a')
            // add classes
            mealItem.classList.add('meal-item');
            mealImg.classList.add('meal-img');
            mealName.classList.add('meal-name');
            imgElement.classList.add('img');
            getRecipeBtn.classList.add('recipe-btn');
            // adding attributes
            imgElement.src = data.recipe.image;
            imgElement.setAttribute("alt","food images");
            //getRecipeBtn.setAttribute("href", "#");
            getRecipeBtn.setAttribute("id", "recipe-button");
            getRecipeBtn.setAttribute("target",  "_blank");
            // adding text
            recipeName.innerText = data.recipe.label;
            getRecipeBtn.innerText = 'Get Recipe';
            // append child
            meal.appendChild(mealItem);
            mealItem.append(mealImg,mealName );
            mealImg.appendChild(imgElement)
            mealName.append(recipeName, getRecipeBtn);  
            // recipe button
            getRecipeBtn.addEventListener('click',()=>{
                mealRecipe(data)
                showDialog()
                closeDialog()
            
            }) 
            
            backPhoto.classList.remove('back-photo')
           
        });
    }else{
        
        mealResult.innerHTML = "We couldn't find this recipe";
        mealResult.style.color = 'red'
        mealResult.classList.add('notFound');
            
    }} 


// create a modal
function mealRecipe(meal){
    const mealDetails = document.querySelector('.meal-details')
    mealDetails.innerHTML = "";
        // creatElement 
        const button = document.createElement('button')
        const i = document.createElement("i")
        const mealDetailsContent = document.createElement("div")
        const h2 = document.createElement("h2")
        const p = document.createElement("p")
        const recipeInstruct = document.createElement("div")
        const h3 = document.createElement("h3")
        const p2 = document.createElement("p")
        const recipeMealImg = document.createElement("div")
        const recipeLink = document.createElement("div")
        const img = document.createElement("img")
        const a = document.createElement("a")
        const healthLabel = document.createElement("div");
        const h3_healthLabel = document.createElement("h3")
        const p2_healthLabel = document.createElement("p")
        const dietLabels = document.createElement("div");
        const h3_dietLabels = document.createElement("h3")
        const p2_dietLabels = document.createElement("p")
        const calories = document.createElement("div");
        const h3_calories = document.createElement("h3")
        const p2_calories = document.createElement("p")
        
        // add classes
        button.classList.add("btn","recipe-close-btn")
        mealDetailsContent.classList.add("meal-details-content")
        i.classList.add("fas", "fa-times")
        h2.classList.add("recipe-title")
        p.classList.add("recipe-category")
        recipeInstruct.classList.add("recipe-instruct")
        recipeMealImg.classList.add("recipe-meal-img")
        recipeLink.classList.add("recipe-link")
        healthLabel.classList.add("recipe-instruct")
        
        // adding attributes
        button.setAttribute("id","recipe-close-button");
        button.setAttribute("type","button");
        img.setAttribute("src",meal.recipe.image);
        a.setAttribute("href",meal.recipe.url);
        a.setAttribute("target","_blank");
        a.innerHTML = 'view recipe details';
        // adding text
        h2.innerHTML = meal.recipe.label;
        p.innerHTML = meal.recipe.cuisineType;
        h3.innerHTML = "Ingredients:";
        p2.innerHTML = meal.recipe.ingredientLines;
        h3_healthLabel.innerHTML = "Health Label:";
        p2_healthLabel.innerHTML = meal.recipe.healthLabels;
        h3_dietLabels.innerHTML = "Diet Label:";
        p2_dietLabels.innerHTML = meal.recipe.dietLabels;
        h3_calories.innerHTML = "Calories:";
        p2_calories.innerHTML = meal.recipe.calories;
        // append child
        mealDetails.append(button,mealDetailsContent,recipeMealImg,recipeLink);
        button.appendChild(i);
        mealDetailsContent.append(h2, p,recipeInstruct, healthLabel, dietLabels, calories);
        recipeInstruct.append(h3, p2);
        recipeMealImg.appendChild(img);
        recipeLink.appendChild(a); 
        healthLabel.append(h3_healthLabel, p2_healthLabel) 
        dietLabels.append(h3_dietLabels, p2_dietLabels) 
        calories.append(h3_calories, p2_calories) 
}


function showDialog(){
    const mealDetailsContent = document.querySelector('.meal-details-content');
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

function closeDialog(){
    const recipeCloseBtn = document.querySelector('.recipe-close-btn')
    recipeCloseBtn.addEventListener('click', () => {
        recipeCloseBtn.parentElement.classList.remove('showRecipe')
     })
}




















