const express = require('express');
const Token = require('../models/Token');
const User = require('../models/User');
const customErr = require('../error');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const createTokenUser = require('../utils/createToken');
const { attachCookies } = require('../utils/jwt');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customErr.BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new customErr.BadRequestError('User does not exist');
  }

  const isCorrect = await user.comparePassword(password);
  if (!isCorrect) {
    throw new customErr.UnauthorizedError('Incorrect Password. Try again.');
  }

  const tokenUser = createTokenUser(user);

  let refreshToken = '';
  const tokenExists = await Token.findOne({ user: user._id });
  if (tokenExists) {
    const { isValid } = tokenExists;
    if (!isValid) {
      throw new customErr.UnauthorizedError('Invalid Credentials');
    }
    refreshToken = tokenExists.refreshToken;
    attachCookies({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }
  refreshToken = crypto.randomBytes(20).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;

  const userToken = { refreshToken, ip, userAgent, user: user._id };
  const tokenCreated = await Token.create(userToken);
  attachCookies({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userID });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'User logged out' });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new customErr.BadRequestError('Email already exists');
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  res.status(StatusCodes.CREATED).json({ msg: `User ${user.name} created` });
};

module.exports = { login, register, logout };
