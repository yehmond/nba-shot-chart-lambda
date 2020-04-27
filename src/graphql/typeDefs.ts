import { gql } from "apollo-server-lambda";


export const typeDefs = gql`
    type ShotChart {
        YEAR: String,
        SEASON_TYPE: String,
        PLAYER_ID: String,
        PLAYER_NAME: String,
        PERIOD: Int,
        SHOT_TYPE: String,
        SHOT_ZONE_BASIC: String,
        SHOT_ZONE_AREA: String,
        SHOT_ZONE_RANGE: String,
        SHOT_DISTANCE: String,
        LOC_X: Int,
        LOC_Y: Int,
        SHOT_MADE_FLAG: Int,
        GAME_DATE: String,
        ACTION_TYPE: String
    },
    type Team {
        name: String!,
        id: String!
    },
    type Query {
        getShotCharts(year: String, seasonType: String, team: String, player: String, period: String): [ShotChart]!,
        getYears: [String]!,
        getTeams: [Team]!,
        getPlayers (year: String, seasonType: String, team: String): [String]!
    }
`;