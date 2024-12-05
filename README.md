# quatt
Quatt assessment made by Erwin Vermeulen.

## Introduction
First of all I had a lot of fun making this. As I am more familiar with front-end GUI testing, some things were new to me. Also I took the risk of using the same
framework you are using in your project (Jest and Supertest). I have never used that before, so it took some more time to get familiar with that. In the last 
4,5 years I have been using Playwright in which I did mostfront-end GUI testing and a little API testing as well. I could have chosen to use PLaywright, but
I also like to explore and use new things, so that is why I decided to use Jest and Supertest.

I tried to show my skills of TypeScript and my knowledge of API testing. For each API I created at least 1 happy flow and 1 unhappy flow. I hope this 
will be sufficient for you. Even if it is not good enough, I always appreciate feedback about my work what I could have done better. 
If you have any more questions, please let me know.

## Major uncertainty
For me there was 1 'major uncertainty. I put my personal HTTP Bearer Token in the constands file. I was not sure where to put it. I am assuming that you will need 
it as well to run the tests. I could understand if this is a big mistake, but I could not see any other way to do it.

## Setup
1. Required node version v14.21.3. I used NVM to change to this node version.
2. Run `npm i` to install all the required node modules

## Test execution
You can run one of the two commands:
1. `npm run all-tests` to execute all the tests
2. `npm test 'full-test-name'` to run a specific test
After each run a test report is generate in the `test-report` folder
