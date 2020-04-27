import { Db, MongoClient, connect } from "mongodb";
import { ISeasonStat, IShotChartStat, IPlayer, IDatabase } from "./Interfaces";

export default class Database {
    client: MongoClient | undefined;
    dbName: string;
    db: Db | undefined;
    url: string;
    PLAYERS_COLLECTION = "players";
    PLAYER_SEASON_STAT_COLLECTION = "player_season_stat";
    TEAMS_COLLECTION = "teams";
    SHOTCHART_COLLECTION = "shotchart";
    LEAGUEAVG_COLLECTION = "league_average";

    constructor(url: string, dbName: string) {
        this.url = url;
        this.dbName = dbName;
    }

    async connect(): Promise<void> {
        try {
            this.client = await MongoClient.connect(this.url, { useUnifiedTopology: true });
            console.log('🚀 MongoDB connected...');
            this.db = this.client?.db(this.dbName);
        } catch (err) {
            this.logError(err);
        }

    }

    async disconnect(): Promise<void> {
        await this.client?.close();
        console.log('✋ MongoDB disconnected...');
    }

    checkNotNull(obj: any): void {
        if (!obj) {
            throw new Error(`The object ${obj} is null!`);
        }
    }

    queryYears(): Promise<any[]> | undefined {
        this.checkNotNull(this.db);
        try {
            return this.db?.collection(this.SHOTCHART_COLLECTION)
                .distinct("YEAR");
        } catch (err) {
            this.logError(err);
        }
    }

    queryTeams(): Promise<any[]> | undefined {
        this.checkNotNull(this.db);
        try {
            return this.db?.collection(this.TEAMS_COLLECTION)
                .find({}, { projection: { _id: 0, __v: 0, } })
                .toArray();
        } catch (err) {
            this.logError(err);
        }
    }

    queryPlayers(year: string, seasonType: string, team: string): Promise<any[]> | undefined {
        this.checkNotNull(this.db);
        const filter = this.getFilter(year, seasonType, team, "", "");
        try {
            return this.db?.collection(this.SHOTCHART_COLLECTION)
                .find(filter, {})
                .toArray()
                .then((shotChartStats) => {
                    const players = shotChartStats?.map((player: IShotChartStat) => {
                        return player.PLAYER_NAME;
                    });
                    return Array.from(new Set(players));
                });
        } catch (err) {
            this.logError(err);
        }
    }

    queryPlayerIDs(): Promise<any[]> | undefined {
        this.checkNotNull(this.db);
        try {
            return this.db?.collection(this.PLAYERS_COLLECTION)
                .find({}, {})
                .toArray();
        } catch (err) {
            this.logError(err);
        }
    }

    queryShotChart(year: string, seasonType: string, team: string, player: string, period: string): Promise<any[]> | undefined {
        this.checkNotNull(this.db);
        const filter = this.getFilter(year, seasonType, team, player, period);
        try {
            return this.db?.collection(this.SHOTCHART_COLLECTION)
                .find(filter, { projection: { _id: 0 } })
                .toArray();
        } catch (err) {
            this.logError(err);
        }
    }

    getFilter(year: string, seasonType: string, team: string, player: string, period: string) {
        const filter: any = {};
        if (year && year !== "All Years") {
            filter.YEAR = year;
        }
        if (seasonType && seasonType !== "All Season Types") {
            filter.SEASON_TYPE = seasonType;
        }
        if (team && team !== "All Teams") {
            filter.TEAM_NAME = team;
        }
        if (player && player !== "All Team Players") {
            filter.PLAYER_NAME = player;
        }
        if (period && period !== "All Periods") {
            filter.PERIOD = Number(period);
        }
        return filter;
    }

    async addPlayer(player: object): Promise<void> {
        this.checkNotNull(this.db);
        try {
            await this.db?.collection(this.PLAYERS_COLLECTION).insertOne(player);
        } catch (err) {
            this.logError(err);
        }
    }

    async createPlayerSeasonStatIndex(): Promise<void> {
        this.checkNotNull(this.db);
        try {
            await this.db?.collection(this.PLAYER_SEASON_STAT_COLLECTION).createIndex({
                PLAYER_ID: 1,
                YEAR: 1,
                SEASON_TYPE: 1
            }, { unique: true });
        } catch (err) {
            this.logError(err);
        }
    }

    async addPlayerSeasonStat(playerSeasonStat: ISeasonStat): Promise<void> {
        this.checkNotNull(this.db);
        try {
            await this.db?.collection(this.PLAYER_SEASON_STAT_COLLECTION).insertOne(playerSeasonStat);
        } catch (err) {
            this.logError(err);
        }
    }

    async createShotChartIndex(): Promise<void> {
        this.checkNotNull(this.db);
        try {
            await this.db?.collection(this.SHOTCHART_COLLECTION).createIndex({
                GAME_ID: 1,
                SEASON_TYPE: 1,
                TEAM_ID: 1,
                PLAYER_ID: 1,
                PERIOD: 1,
                MINUTES_REMAINING: 1,
                SECONDS_REMAINING: 1,
                SHOT_ATTEMPTED_FLAG: 1,
                SHOT_MADE_FLAG: 1,
                LOC_X: 1,
                LOC_Y: 1,
            }, { unique: true });
        } catch (err) {
            this.logError(err);
        }
    }

    async addShotChart(shotChartStat: IShotChartStat): Promise<void> {
        this.checkNotNull(this.db);
        try {
            await this.db?.collection(this.SHOTCHART_COLLECTION).insertOne(shotChartStat);
        } catch (err) {
            this.logError(err);
        }
    }

    async createLeagueAvgIndex(): Promise<void> {
        this.checkNotNull(this.db);
        try {
            await this.db?.collection(this.LEAGUEAVG_COLLECTION).createIndex({
                YEAR: 1,
                SEASON_TYPE: 1,
                SHOT_ZONE_BASIC: 1,
                SHOT_ZONE_AREA: 1,
                SHOT_ZONE_RANGE: 1
            }, { unique: true });
        } catch (err) {
            this.logError(err);
        }
    }

    async addLeagueAvg(leagueAvgStat: any): Promise<void> {
        try {
            await this.db?.collection(this.LEAGUEAVG_COLLECTION).insertOne(leagueAvgStat);
        } catch (err) {
            this.logError(err);
        }
    }

    logError(err: any): void {
        if (err.code !== 11000) {
            throw new Error(err);
        }
    }
}