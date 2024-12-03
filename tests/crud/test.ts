import request from 'supertest';
import { Request, Response, Application } from 'express';
import express = require('express');

var app: Request = express();

describe('CRUD tests', () => {
    test('READ test', async () => {
      const response = await request('https://gorest.co.in/public/v2').get('/users')
      console.log(response.body);
    });
});