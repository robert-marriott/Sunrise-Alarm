// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*************************This is the Schema itself***************************/
var alarmSchema = new Schema({
  title: String,
  creator: String,
  alarmtime: String,
  alarmduration: Number,
  stats: Array,
  repeat: {
    mon: Boolean,
    tue: Boolean,
    wed: Boolean,
    thu: Boolean,
    fri: Boolean,
    sat: Boolean,
    sny: Boolean,
  },
  created_at: Date,
  updated_at: Date
});

/***********These are the custom methods for modifying the schema ************/
// you can also do queries and find similar users
alarmSchema.methods.setRepeats = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude';
  return this.name;
};

/***********These are the custom methods for pre and post save ************/
// on every save, add the date
alarmSchema.pre('save', function(next) {
  var currentDate = new Date();    // get the current date
  this.updated_at = currentDate;   // change the updated_at field to current date
  if (!this.created_at)            // if created_at doesn't exist, add to that field
    this.created_at = currentDate;
  next();
});


/***********Exports for allowing this schema to be used by mongodb ***********/
// the schema is useless so far we need to create a model using it
var User = mongoose.model('Alarm', alarmSchema);
// make this available to our users in our Node applications
module.exports = Alarm;
