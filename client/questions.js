const questions = [
  {
    text: "Which soft drink is used in Jägerbombs?",
    options: [
      { id: 0, text: "Coca Cola", isCorrect: false },
      { id: 1, text: "Sprite", isCorrect: false },
      { id: 2, text: "Monster", isCorrect: false },
      { id: 3, text: "Red Bull", isCorrect: true }, // correct (1)
    ],
  },
  {
    text: "In which part of France can you find Bordeaux?",
    options: [
      { id: 0, text: "Southeast", isCorrect: true }, // correct (2)
      { id: 1, text: "Southwest", isCorrect: false },
      { id: 2, text: "Northeast", isCorrect: false },
      { id: 3, text: "Northwest", isCorrect: false },
    ],
  },
  {
    text: "What is the largest producer of wine in the world?",
    options: [
      { id: 0, text: "USA", isCorrect: false }, 
      { id: 1, text: "France", isCorrect: false },
      { id: 2, text: "Italy", isCorrect: true }, // correct (3)
      { id: 3, text: "Australia", isCorrect: false },
    ],
  },
  {
    text: "Which one is not a brand of rum?",
    options: [
      { id: 0, text: "Bacardí", isCorrect: false },
      { id: 1, text: "Bombay Sapphire", isCorrect: true }, // correct (4)
      { id: 2, text: "Captain Morgan", isCorrect: false },
      { id: 3, text: "Contessa", isCorrect: false },
    ],
  },
  {
    text: "From which country does Sambuca originate?",
    options: [
      { id: 0, text: "Mexico", isCorrect: false },
      { id: 1, text: "Brazil", isCorrect: false }, 
      { id: 2, text: "Spain", isCorrect: false },
      { id: 3, text: "Italy", isCorrect: true }, // correct (5)
    ],
  },
  {
    text: "From which country does Armagnac originate?",
    options: [
      { id: 0, text: "France", isCorrect: true }, // correct (6)
      { id: 1, text: "Russia", isCorrect: false }, 
      { id: 2, text: "Spain", isCorrect: false },
      { id: 3, text: "Cuba", isCorrect: false }, 
    ],
  },
  {
    text: "Which alcohol is used to make a Mojito?",
    options: [
      { id: 0, text: "Whiskey", isCorrect: false },
      { id: 1, text: "Vodka", isCorrect: false },
      { id: 2, text: "Gin", isCorrect: false },
      { id: 3, text: "White Rum", isCorrect: true }, // correct (7)
    ],
  },
  {
    text: "In which American state is Jack Daniel's produced?",
    options: [
      { id: 0, text: "Tennessee", isCorrect: true }, // correct (8)
      { id: 1, text: "Texas", isCorrect: false }, 
      { id: 2, text: "Colorado", isCorrect: false },
      { id: 3, text: "Alabama", isCorrect: false }, 
    ],
  },
  {
    text: "From which country does the beer Singha originate?",
    options: [
      { id: 0, text: "Thailand", isCorrect: true }, // correct (9)
      { id: 1, text: "Vietnam", isCorrect: false }, 
      { id: 2, text: "Japan", isCorrect: false },
      { id: 3, text: "Myanmar", isCorrect: false }, 
    ],
  },
  {
    text: "Which coffee liqueur was invented in Veracruz, Mexico?",
    options: [
      { id: 0, text: "Baileys", isCorrect: false },
      { id: 1, text: "Tia Maria", isCorrect: false }, 
      { id: 2, text: "Kahlúa", isCorrect: true },  // correct (10)
      { id: 3, text: `Sheridan's`, isCorrect: false }, 
    ],
  },
  {
    text: "From which country does Tia Maria originate?",
    options: [
      { id: 0, text: "Dominican Republic", isCorrect: false },
      { id: 1, text: "Cuba", isCorrect: false }, 
      { id: 2, text: "Jamaica", isCorrect: true },  // correct (11)
      { id: 3, text: "Mexico", isCorrect: false }, 
    ],
  },
  {
    text: "In which American city does Southern Comfort originate?",
    options: [
      { id: 0, text: "Memphis", isCorrect: false },
      { id: 1, text: "New Orleans", isCorrect: true }, // correct (12)
      { id: 2, text: "Jacksonville", isCorrect: false },  
      { id: 3, text: "San Antonio", isCorrect: false }, 
    ],
  },
  {
    text: `What was "America's First Cocktail"?`,
    options: [
      { id: 0, text: "The Sazerac", isCorrect: true }, // correct (13)
      { id: 1, text: "The Old Fashioned", isCorrect: false }, 
      { id: 2, text: "The Margarita", isCorrect: false },  
      { id: 3, text: "The Martini", isCorrect: false }, 
    ],
  },
  {
    text: "What animal can you see on a bottle of Amarula?",
    options: [
      { id: 0, text: "Lion", isCorrect: false }, 
      { id: 1, text: "Eagle", isCorrect: false }, 
      { id: 2, text: "Bear", isCorrect: false },  
      { id: 3, text: "Elephant", isCorrect: true }, // correct (14)
    ],
  },
  {
    text: `Which alcohol is nicknamed "The Green Fairy"?`,
    options: [
      { id: 0, text: "Jagermeister", isCorrect: false }, 
      { id: 1, text: "Midori", isCorrect: false }, 
      { id: 2, text: "Patron", isCorrect: false },  
      { id: 3, text: "Absinthe", isCorrect: true }, // correct (15)
    ],
  },
  {
    text: `In France, "sabrer" the champagne means opening a bottle of champagne with a specific object. What is it?`,
    options: [
      { id: 0, text: "A glass", isCorrect: false }, 
      { id: 1, text: "A knife", isCorrect: true }, // correct (16)
      { id: 2, text: "A corkscrew", isCorrect: false },  
      { id: 3, text: "A lighter/candle", isCorrect: false }, 
    ],
  },
  {
    text: `What is the world's largest Volksfest?`,
    options: [
      { id: 0, text: "The Oktoberfest", isCorrect: true }, // correct (17)
      { id: 1, text: "The Schützenfest", isCorrect: false }, 
      { id: 2, text: "The Rutenfest", isCorrect: false },  
      { id: 3, text: "The Macheseefest", isCorrect: false }, 
    ],
  },
  {
    text: `Which country uses the term "Schooner" to describe a half pint?`,
    options: [
      { id: 0, text: "Ireland", isCorrect: false }, 
      { id: 1, text: "Scotland", isCorrect: false }, 
      { id: 2, text: "Australia", isCorrect: true },  // correct (18)
      { id: 3, text: "Germany", isCorrect: false }, 
    ],
  },
  {
    text: "Which soft drink is used to make a Long Island?",
    options: [
      { id: 0, text: "Coca Cola", isCorrect: true }, // correct (19)
      { id: 1, text: "Pepsi", isCorrect: false },
      { id: 2, text: "Sprite", isCorrect: false },
      { id: 3, text: "Root Beer", isCorrect: false },
    ],
  },
  {
    text: "Which cocktail is made with tomato juice and vodka?",
    options: [
      { id: 0, text: "A Tomatoka", isCorrect: false },
      { id: 1, text: "A Bloody Mary", isCorrect: true }, // correct (20)
      { id: 2, text: "A Vegan Sunrise", isCorrect: false },
      { id: 3, text: "The Italian Job", isCorrect: false },
    ],
  }
];

export default questions;