// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fruits-vegetables');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}





const fruitsSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  price: String,
  
});
const fruit = mongoose.model("fruit", fruitsSchema);

// fruit.insertMany([
//     {  name: 'Dragon', img: 'https://images.pexels.com/photos/18916473/pexels-photo-18916473/free-photo-of-dragon-fruit-on-hot-pink-background.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', description: 'good health', price: `₹${(Math.random() * 100 + 10).toFixed(2)} ` }
//   ]);


module.exports = fruit;