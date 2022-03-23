const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updatePassword = async (req, res) => {};
// const getAllUser = async (req, res) => {};
// const getAllUser = async (req, res) => {};

module.exports = { getCurrentUser, getAllUsers, updatePassword };
