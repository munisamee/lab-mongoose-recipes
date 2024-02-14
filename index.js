const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Successfully removed "Carrot Cake" recipe from the database');
    // Now let's update the duration for "Rigatoni alla Genovese" recipe
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' }, // Filter to find the correct recipe
      { $set: { duration: 100 } }, // Update duration field
      { new: true } // Return the updated document
    );
  })
  .then((updatedRecipe) => {
    console.log(`Successfully updated duration for "${updatedRecipe.title}" recipe`);
    // Close the database connection after all operations are completed
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed');
  })
  .catch((error) => {
    console.error('Error:', error);
  });