import * as path from "path";
import {Database, RunResult} from "better-sqlite3";
export const Sqlite3 = require("better-sqlite3");

export class DBManager {
	#db: Database;

	constructor() {
		this.#db = new Sqlite3(path.resolve(__dirname,'../db/bot.db'));
	}

	get db() { return this.#db; }

	reopen() {
		this.#db = new Sqlite3(path.resolve(__dirname,'../db/bot.db'));
	}

	close() {
		this.#db.close();
	}

	query(source: string, params?: (null|boolean|number|string|ArrayBuffer)[]): Promise<RunResult> {
		return new Promise((resolve, reject) =>
		{
			try { resolve(this.#db.prepare(source).run(params)); }
			catch (err) { reject(err); }
		});
	}

}
