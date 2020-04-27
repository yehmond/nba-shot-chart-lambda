export interface ITeam {
    name: string;
    id: string;
}

export interface IPlayer {
    name: string;
    id: number;
}

export interface INBAResponse {
    resource: string;
    parameters: {
        Season: string;
        SeasonType: string;
    };
    resultSets: Array<{
        name: string;
        headers: string[];
        rowSet: (string | number)[][];
    }>;
}

export interface ISeasonStat {
    YEAR: string;
    SEASON_TYPE: string;
    [key: string]: string | number | undefined;
}

export interface IShotChartStat {
    YEAR: string;
    SEASON_TYPE: string;
    PLAYER_NAME: string;
    TEAM_NAME: string;
    LOC_X: number;
    LOC_Y: number;
    PLAYER_ID: number;
    [key: string]: string | number | undefined;
}

export interface IDatabase {
    [key: string]: any
}