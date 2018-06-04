const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, required: true},
  password: { type: String, required: true },
  // Artist bio information
  displayPic: String,
  bio: String,
  prefStyles: Array
},{
  timestamps: true
});

userSchema.virtual('artworks', {
  ref: 'Artworks',
  foreignField: 'creator',
  localField: '_id'
});

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  next();
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('password');
  }
  next();
});
//
// userSchema.virtual('somethingNameHere')
//   .get(function createCheckBox(){
//     const checkboxField = document.getElementById('checkboxField');
//     const checkboxValues = ['digital','model-edit','image-edit','photography'];
//     const premadeValues = user.prefStyles.split(',');
//     checkboxValues.forEach((itemInArray)=>{
//       if (premadeValues.includes(itemInArray)){
//         // create checkbox input field with checked
//
//       } else {
//         // create checkbox input field without checked
//       }
//     });
//   });


module.exports = mongoose.model('User', userSchema);
