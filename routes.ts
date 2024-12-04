import app from './application';

const BASEURL = process.env.BASEURL;

app.listen('https://gorest.co.in/public/v2', ():void => {
    console.log('Using baseURL: https://gorest.co.in/public/v2')
})