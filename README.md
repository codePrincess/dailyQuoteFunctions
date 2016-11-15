[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]() <img src="https://img.shields.io/badge/azure-functions-ffba1c.svg" alt="Azure Functions" /> <img src="https://img.shields.io/badge/Azure CLI-compatible-brightgreen.svg" alt="Azure Functions" /> 

# dailyQuoteFunctions

This repo contains everything you need to deploy and get your serverless backend up and running. 

The reason for this repo to exist is purely educational because the endpoints provided by this mini backend offer you the possibility to build a "Quote of the day" application - and can be completely self deployed in Azure with Azure Functions.

This example shall help you setup a serverless backend on Azure with Azure Functions. First you have to take care of the deployment either with the Azure CLI and the contained ARM template in this repo or in the Azure portal. If the whole deployment was a success you'll find two endpoints in your Azure function:
- SeedBingo
- BullshitBingo

SeedBingo is the seeding function which refreshes the available quotes in your "backend". The strings are just persisted to a JSON file withing the file structure of the SeedBingo function.
The BullshitBingo endpoint takes two parameters for further filtering (maxLength and number) and offers you certain "business relevant" strings :D Or in other word bullshit bingo worthy phrases.

The story will get funny by using the Swift iOS app as a "display" for this quotes - and so you see how you can use this endpoints from a mobile app. The app can be found here: https://github.com/codePrincess/dailyQuote

The whole tutorial for setting up the mini backend can be found here http://iamcodeprincess.tumblr.com/post/152248954131/your-daily-business-quote
