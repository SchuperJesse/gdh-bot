import {ApplicationCommandDataResolvable, Client, Guild} from "discord.js";
import {Skill, TApplicationCommand} from "./skills/Skill";
import {ReactRoles} from "./skills/react-roles/ReactRoles";
import {Poll} from "./skills/poll/Poll";
import {Royale} from "./skills/royale/Royale";
import {GameJam} from "./skills/gamejam/GameJam";
import {SlashCommandBuilder} from "@discordjs/builders";

const fs = require("fs");

export class SkillManager {
//private:
	readonly #client: Client;
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

	registerCommands(guild: Guild) {
		// Build array of commands from each skill
		let commands: (TApplicationCommand)[] = [];
		for (let skill in this.#skills) {
			let cmd = this.#skills[skill].commands;
			if (cmd) { commands.push(cmd); }
		}

		// Set commands for guild
		if (commands.length) {
			guild.commands.set(commands)
			.then(() =>
			{
				console.log(`Registered commands for guild: ${guild.name}`);
			})
			.catch(err => console.error(err));
		}
	}

}
