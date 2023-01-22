"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("./tokens");

const request = require('supertest');

const app = require('../app');


async function commonBeforeAll(){
    await db.query("DELETE FROM meetups");

    const user1Login = await request.

}

