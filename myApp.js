const people = [
  { name: "John", age: 25, favoriteFoods: ["pizza"] },
  { name: "Mary", age: 30, favoriteFoods: ["burger"] },
  { name: "Peter", age: 35, favoriteFoods: ["tacos"] },
  { name: "Susan", age: 40, favoriteFoods: ["ice cream"] },
  { name: "David", age: 45, favoriteFoods: ["spaghetti"] }
];



// touch less field
require('dotenv').config();
const mongoose = require('mongoose');
const mongo_URI = process.env.MONGO_URI;
mongoose.connect(mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const personSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  age: Number,
  favoriteFoods: [String]
});

let Person =mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person1 = Person({name: "Heo", age: 6, favoriteFoods:["cocacola"]});
  
  person1.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
}

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, person) => {
    if (err) return console.error(err);
    done(null, person);
  })
};
/*
createManyPeople(people, (err, person) => {
  if (err) return console.error(err);
  console.log(person);
})
*/
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};



const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatePerson) => {
      if (err) return console.error(err);
      done(null, updatePerson);
    })
  });
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatePerson) => {
    if (err) return console.error(err);
    done(null, updatePerson);
  });
}

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, removePerson) => {
    if (err) return console.error(err);
    done(null, removePerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary"; 
  Person.remove({name: nameToRemove}, (err, removedPeople) => {
    if (err) console.error(err);
    done(null, removedPeople);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  //let findQuery = Person.find({favoriteFoods: foodToSearch});
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({name: 1, age: 0, favoriteFoods:1})
  .exec((err, data) => {
    if (err) console.error(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;