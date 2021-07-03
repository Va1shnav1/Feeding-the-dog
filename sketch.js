var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, DogFed;
var foodObj;
var feed;
var lastFed, fedTime;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  console.log(foodS);
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  DogFed=createButton("Feed Dog");
  DogFed.position(700,95);
  DogFed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref("FeedTime")
  fedTime.on("value", function(data){
    lastFed=data.val()
  })
  //write code to read fedtime value from the database 
  if(lastFed>=12){
    text("Last Feed Time : " + lastFed%12 + "pm", 350, 30);
  }else if(lastFed==0){
    text("Last Feed : 12 am", 350, 30)
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  console.log(foodS)
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  console.log(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var value = foodObj.getFoodStock();
  if(value<=0){
    foodObj.updateFoodStock(0);
  }else{
    foodObj.updateFoodStock(value-1);
  }
  //foodS=foodS-1;
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  //dog.addImage(happyDog);

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
