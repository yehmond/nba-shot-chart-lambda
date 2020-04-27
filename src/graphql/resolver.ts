import Database from "../Database";
import { IDatabase } from "../Interfaces";
import { config } from "dotenv";
config();

const URL = process.env.DATABASE_URL || "mongodb://localhost:27017/nbaShotChart";
const DATABASE_NAME = "nbaShotChart";

export const resolvers = {
    Query: {
        getShotCharts: async (parent: any, { year, seasonType, team, player, period }: any, context: any, info: any) => {
            return await connectThenDisconnectDB("queryShotChart", [year, seasonType, team, player, period]);
        },
        getYears: async () => await connectThenDisconnectDB("queryYears", []),
        getTeams: async () => await connectThenDisconnectDB("queryTeams", []),
        getPlayers: async (parent: any, { year, seasonType, team }: { year: string, seasonType: string, team: string }, context: any, info: any) => {
            return await connectThenDisconnectDB("queryPlayers", [year, seasonType, team]);
        }
    }
};

async function connectThenDisconnectDB(fn: string, args: string[]) {
    const database: IDatabase = new Database(URL, DATABASE_NAME);
    await database.connect();
    const res = await database[fn](...args);
    await database.disconnect();
    return res;
}