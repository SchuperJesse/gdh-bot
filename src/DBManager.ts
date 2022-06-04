import * as fs from "fs";
import * as path from "path";
import {Database, RunResult} from "better-sqlite3";
import {Snowflake} from "discord.js";
export const Sqlite3 = require("better-sqlite3");

//================================================================

export class SQLDatabase {
//private:
	#db: Database;
	#pathname: string;
//public:
	constructor(pathname: string) {
		this.#pathname = pathname;
		this.#db = new Sqlite3(pathname);
	}

	//----------------------------------------------------------------

	get db() { return this.#db; }

	//----------------------------------------------------------------

	close() {
		this.#db.close();
	}

	//----------------------------------------------------------------

	query(source: string, params?: (null|boolean|number|string|ArrayBuffer)[]): Promise<RunResult> {
		return new Promise((resolve, reject) =>
		{
			try { resolve(this.#db.prepare(source).run(params)); }
			catch (err) { reject(err); }
		});
	}

	//----------------------------------------------------------------

}

//================================================================

export class DBManager {
//private:
	#bot: SQLDatabase;
	#guilds: { [key: string]: { [key: string]: SQLDatabase } };
//public:
	constructor() {
		// Create db directory if it doesn't exist already
		let pathname = path.resolve(__dirname, `../db/`);
		if (!fs.existsSync(pathname)) {
			fs.mkdirSync(pathname, { recursive: true });
		}

		// Oen bot.db
		this.#bot = new SQLDatabase(path.resolve(__dirname,'../db/bot.db'));
		// Initialize this.#guilds object which will use Guild ID's as key values
		this.#guilds = {};
	}

	//----------------------------------------------------------------

	get bot() { return this.#bot; }

	//----------------------------------------------------------------

	get guilds() { return this.#guilds; }

	//----------------------------------------------------------------

	open(guildId: Snowflake, name: string = 'guild') {
		if (!(guildId in this.#guilds)) {
			this.#guilds[guildId] = {};
		}
		// Check if this database has already been opened and return if opened
		if ((name in this.#guilds[guildId])) {
			return this.#guilds[guildId][name];
		}
		// Create guild directory by guild ID if not created yet
		let pathname = path.resolve(__dirname, `../db/${guildId}/`);
		if (!fs.existsSync(pathname)) {
			fs.mkdirSync(pathname, { recursive: true });
		}
		// Create/Open the database
		return this.#guilds[guildId][name] = new SQLDatabase(`${pathname}/${name}.db`);
	}

	//----------------------------------------------------------------

	closeAll() {
		// Close the bot.db
		this.#bot.close();
		// Close each guilds database(s)
		for (let guild in this.#guilds) {
			for (let db in this.#guilds[guild]) {
				this.#guilds[guild][db].close();
			}
		}
	}

	//----------------------------------------------------------------

}

//================================================================
