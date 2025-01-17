const SB = document.getElementById('searchBar');

const RECIPES = [];

document.addEventListener("DOMContentLoaded", function() {
    async function fetchRecipeData() {
        try {
            const response = await fetch('/api/recipes');
            const recipes = await response.json();
            RECIPES.push(...recipes);
            console.log(RECIPES);
            // Only call generateTiles if the current page is index.html
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                generateTiles(recipes);
            }
            populateMenu(recipes);
        } catch (error) {
            console.error('Error fetching recipe data:', error);
        }
    }

    function generateTiles(recipes) {
        const tilesContainer = document.querySelector('.tiles');
        tilesContainer.innerHTML = ''; // Clear existing tiles

        recipes.forEach((recipe, index) => {
            const tile = document.createElement('article');
            tile.className = `style${recipe.CodeName}`;
            tile.id = recipe.CodeName;
            //tile.style.backgroundImage = `url('assets/css/images/${recipe.codename}.png')`;
    
            tile.innerHTML = `
                <span class="image">
                    <img src="images/${recipe.CodeName}BW.png" alt="" />
                </span>
                <a href="${recipe.link}">
                    <h2>${recipe.name}</h2>
                    <div class="content">
                        <img src="images/heart.png" width="32px" height="32px" style="float: left; margin-top: -0.15em; margin-right: 0.5em;">
                        <p style="margin: 0 0 0.5em 0; float: left;">${recipe.likes}</p>
                    </div>
                    <div class="content">
                        <img src="images/neutral.png" width="32px" height="32px" style="float: left; margin-top: -0.15em; margin-right: 0.5em;">
                        <p style="margin: 0 0 1em 0; float: left;">Difficulty <b>${recipe.difficulty}</b></p>
                    </div>
                </a>
            `;
    
            tilesContainer.appendChild(tile);
        });
    }

    function populateMenu(recipes) {
        const menuList = document.querySelector('#menu ul');
        menuList.innerHTML = ''; // Clear existing menu items

        // Add the "Home" link
        const homeItem = document.createElement('li');
        homeItem.innerHTML = '<a href="index.html">Home</a>';
        menuList.appendChild(homeItem);

        // Add links for each recipe
        recipes.forEach(recipe => {
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `<a href="${recipe.codename}.html">${recipe.name}</a>`;
            menuList.appendChild(menuItem);
        });

        // Add the "Edit" link
        const editItem = document.createElement('li');
        editItem.innerHTML = '<a href="form/form.html">Edit</a>';
        menuList.appendChild(editItem);
    }


    fetchRecipeData();
});

if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    SB.onclick = function() {
        SB.ariaPlaceholder = "";
        for (var i = 0; i < RECIPES.length; ++i) {
            document.getElementById(RECIPES[i].CodeName).classList.add("fade");
        }
    };

    SB.onclick = function(){
        SB.ariaPlaceholder = "";
        for(var i=0; i<RECIPES.length; ++i){
            document.getElementById(RECIPES[i].CodeName).classList.add("fade");
        }
        setTimeout(function(){
            for(var i=0; i<RECIPES.length; ++i){
                document.getElementById(RECIPES[i].CodeName).classList.add("hidden");
            }
        },200);
    };

    SB.addEventListener('keyup', (e) => {
        const searchString = e.target.value;
        const filteredRecipes = RECIPES.filter(recipe => {
            return recipe.name.includes(searchString) || recipe.dif.includes(searchString) || recipe.ing.includes(searchString);
        });
        const unfilteredRecipes = RECIPES.filter(recipe => !filteredRecipes.includes(recipe));
        console.log(filteredRecipes);
        console.log(filteredRecipes.length);
        console.log(unfilteredRecipes);
        setTimeout(function(){
            for(var i=0;i<filteredRecipes.length;++i){
                        var style = document.getElementById(filteredRecipes[i].CodeName);
                        style.classList.remove("hidden");
                        style.classList.remove("fade");
                        console.log(style);        
            }
            for(var i=0; i<unfilteredRecipes.length; ++i){
                document.getElementById(unfilteredRecipes[i].CodeName).classList.add("fade");
            }
            setTimeout(function(){
                for(var i=0; i<unfilteredRecipes.length; ++i){
                    document.getElementById(unfilteredRecipes[i].CodeName).classList.add("hidden");
                }
            },200);
        },200);
    });

}
