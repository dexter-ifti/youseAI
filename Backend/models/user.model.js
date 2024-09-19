const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
        trim : true,
        minlength : 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

userSchema.pre('save', async (next) => {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async (password) => {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;