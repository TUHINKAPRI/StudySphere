const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Profile = require("../models/profile.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const course = require("../models/course");
exports.dummyuserdata = async () => {
  for (let i = 0; i <= 2; i++) {
    const profile = await Profile.create({
      gender: null,
      about: null,
      contactNumber: null,
      dateOfBirth: null,
    });
    const newUser = await User.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      accountType: "Instructor",
      password: await bcrypt.hash("123", 10),
      aditionalDetails: profile._id,
      image: faker.image.avatarLegacy(),
    });
    console.log("user created successfully");
  }
};

exports.dummycoursedata = async () => {
 for(let i=0;i<7;i++){
  await course.create({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    instructor: "65f98dfcfe4eb0b070cb589d",
    whatWeWillLearn: faker.lorem.lines(2),
    price: faker.commerce.price(),
    thumbnail: faker.image.url(),
    category: "65f9912a9b49549e29c7637d",
    tag: "AI/ML",
  });
  console.log('course created successfully')
 }
};
