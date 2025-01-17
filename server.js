const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// MongoDB connection URL
const mongoURI = 'mongodb+srv://ligia:ligia@recipes.cnz54.mongodb.net/web?retryWrites=true&w=majority&appName=Recipes';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

//ESQUEMA DE LA BASE DE DATOS
const recipeSchema = new mongoose.Schema({
    name: String,
    recipe: String,
    ingredients: String,
    CodeName: String,
    dif: String,
    likes: { type: Number, default: 0 }
  });


const Recipe = mongoose.model('Recipe', recipeSchema);

// FUNCION PARA OBTENER TODAS LAS RECETAS
app.get('/api/recipes', (req, res) => {
    Recipe.find()
      .then(recipes => res.json(recipes))
      .catch(err => res.status(400).send('Error: ' + err));
  });
  

// FUNCION PARA AÑADIR O EDITAR UNA RECETA EN LA BASE DE DATOS
app.post('/submit_recipe', async (req, res) => {
    try {
        const { name, desc, ingredients, CodeName, dif } = req.body;
        console.log('Received recipe data:', req.body); // Log the received data

        // Find the recipe by codename
        let recipe = await Recipe.findOne({ CodeName });

        if (recipe) {
            // Update the existing recipe with non-empty fields
            if (name) recipe.name = name;
            if (desc) recipe.recipe = desc;
            if (ingredients) recipe.ingredients = ingredients;
            if (dif) recipe.difficulty = dif;
        } else {
            // Create a new recipe
            recipe = new Recipe({
                name,
                recipe,
                ingredients: ingredient,
                CodeName,
                dif
            });
        }

        await recipe.save();
        res.json({ message: 'Recipe saved successfully!' }); // Send JSON response
    } catch (err) {
        console.error('Error saving recipe to MongoDB:', err);
        res.status(500).json({ error: 'Error saving recipe to MongoDB' });
    }
});

// FUNCION PARA BORRAR DE LA BASE DE DATOS
app.post('/delete_recipe', (req, res) => {
    Recipe.findOneAndDelete({ name: req.body.delete_name })
      .then(() => res.send('Recipe deleted successfully'))
      .catch(err => res.status(400).send('Error: ' + err));
  });


// FUNCION PARA DAR LIKE A UNA RECETA
app.post('/like_recipe', async (req, res) => {
    const { codename } = req.body;
    if (!codename) {
        return res.status(400).json({ error: 'Recipe codename is required' });
    }

    try {
        const recipe = await Recipe.findOne({ CodeName: codename });
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        recipe.likes += 1;
        const updatedRecipe = await recipe.save();
        res.json(updatedRecipe);
    } catch (error) {
        console.error('Error liking recipe:', error);
        res.status(500).json({ error: 'Error liking recipe' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});