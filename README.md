# 🏀 NBA Shot Chart (Lambda)

## Link

🔗 https://nbashotchart.now.sh

## Description

This is the serverless version for the backend of **🏀 NBA Shot Chart**, which does have the second limitation specified in the [Limitation section](#Limitations).

The purpose of this website is to display where on the court NBA players and their teams are shooting from, as well as provide some simple statistics related to the shot charts. Although the official NBA website features a page that displays each player's shot chart of the current regular season, many will find it difficult to navigate to other years and filter on playoffs, teams etc. Therefore, this site is intended to make those processes easier.

## Background

The goal of this project was to explore and learn unfamiliar technologies for me (TypeScript, GraphQL, AWS Lambda, and MongoDB).

The shot chart data was collected using [NBA Statistics Scraper](https://github.com/yehmond/nba-scraper) and stored in an MongoDB Atlas instance.

## Limitations

- Due to the 512 MB storage limit for the free tier of MongoDB Atlas and the fact that I'm a poor student 😭, I was only able to store some of the NBA statistics in the cloud. The good news is that GitHub has a much higher storage limit and therefore if you want to use the scraped data, I've stored them as JSON files in the [NBA Statistics Scraper](https://github.com/yehmond/nba-scraper) repository.

- Depending on the filters used, certain shot charts may not load successfully if the response payload exceeds 6 MB. This is due to the official limitations set by AWS Lambda. I've created another version with a server in this [repository](https://github.com/yehmond/nba-shot-chart-express) hosted at Heroku to address this problem. The Heroku hosted website is https://nba-shot-charts.herokuapp.com/.

## Built With

#### Frontend

- React (TypeScript)
- [Apollo Client](https://www.apollographql.com/client/) (GraphQL)
- [nivo](https://github.com/plouc/nivo)

#### Backend

- [Apollo Server](https://www.apollographql.com/server/)
- Express (Used in Heroku version)
- [Serverless](https://www.serverless.com/) (Used in AWS Lambda version)
- AWS Lambda
- MongoDB
