import {Client} from "discord.js";
import {Skill} from "./skills/Skill";
import {ReactRoles} from "./skills/react-roles/ReactRoles";
import {Poll} from "./skills/poll/Poll";
import {Royale} from "./skills/royale/Royale";
import {GameJam} from "./skills/gamejam/GameJam";

const fs = require("fs");

export class SkillManager {
//private:
	#client: Client;
	readonly #skills: { [key: string]: Skill };

//public:
	constructor(client: Client) {
		this.#client = client;
		this.#skills = {};
		this.loadSkills();
	}

	get client() { return this.#client; }

	get skills() { return this.#skills; }

	loadSkills() {
		this.#skills['react_roles'] = new ReactRoles(this);
		this.#skills['poll'] = new Poll(this);
		this.#skills['royale'] = new Royale(this);
		this.#skills['game_jam'] = new GameJam(this);
	}

	start() {
		for (let skill in this.#skills) {
			this.#skills[skill].start();
		}
	}

	update() {
		for (let skill in this.#skills) {
			this.#skills[skill].update();
		}
	}

	stop() {
		for (let skill in this.#skills) {
			this.#skills[skill].stop();
		}
	}

}
