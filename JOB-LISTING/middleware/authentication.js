const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('YYO Authentication invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach user to job routes
    req.user = { userID: payload.userID, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError('FROM MIDDLE Authentication invalid');
  }
};

module.exports = auth;
