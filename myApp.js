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

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
