import {Client, ClientEvents, Guild} from "discord.js";
import {EEventCode, Skill, TApplicationCommand, TEventResult} from "./skills/Skill";
import {ReactRoles} from "./skills/react-roles/ReactRoles";
import {Poll} from "./skills/poll/Poll";
import {Royale} from "./skills/royale/Royale";
import {GameJam} from "./skills/gamejam/GameJam";
import * as crypto from "crypto";

//================================================================

export type TCallback = (...args: any) => void;
export type TEventListener = (...args: any) => TEventResult;

//================================================================

export class EventListener {
//private:
	readonly #uid: string;
	readonly #name: string;
//public:
	callback: TEventListener;
//public:
	constructor(uid: string, eventName: string, callback: TEventListener) {
		this.#uid = uid;
		this.#name = eventName;
		this.callback = callback;
	}

	//----------------------------------------------------------------

	get uid() { return this.#uid; }

	//----------------------------------------------------------------

	get name() { return this.#name; }

	//----------------------------------------------------------------

}

//================================================================

export class SkillManager {
//private:
	readonly #client: Client;
	readonly #skills: { [key: string]: Skill };
	readonly #events: { [key: string]: EventListener[] };

//public:
	constructor(client: Client) {
		this.#client = client;
		this.#skills = {};
		this.loadSkills();
		this.#events = {};
	}

	//----------------------------------------------------------------

	get client() { return this.#client; }

	//----------------------------------------------------------------

	get skills() { return this.#skills; }

	//----------------------------------------------------------------

	loadSkills() {
		this.#skills['react_roles'] = new ReactRoles(this);
		this.#skills['poll'] = new Poll(this);
		this.#skills['royale'] = new Royale(this);
		this.#skills['game_jam'] = new GameJam(this);
	}

	//----------------------------------------------------------------

	start() {
		for (let skill in this.#skills) {
			this.#skills[skill].start();
		}
	}

	//----------------------------------------------------------------

	update() {
		for (let skill in this.#skills) {
			this.#skills[skill].update();
		}
	}

	//----------------------------------------------------------------

	stop() {
		for (let skill in this.#skills) {
			this.#skills[skill].stop();
		}
	}

	//----------------------------------------------------------------

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

	//----------------------------------------------------------------

	addEventListener(name: keyof ClientEvents, listener: TEventListener) {
		if (!(name in this.#events)) {
			this.#events[name] = [];
		}
		this.#events[name].push(new EventListener(
			name,
			crypto.randomUUID(),
			listener
		));
	}

	//----------------------------------------------------------------

	removeEventListener(listener: EventListener) {
		if (listener.name in this.#events) {
			for (let i = 0; i < this.#events[listener.name].length; ++i) {
				if (this.#events[listener.name][i].uid === listener.uid) {
					this.#events[listener.name].splice(i, 1);
				}
			}
		}
	}

	//----------------------------------------------------------------

	emit<K extends keyof ClientEvents>(eventName: K, ...args: ClientEvents[K]) {
		let result = null;
		if (eventName in this.#events) {
			for (let listener of this.#events[eventName]) {
				result = listener.callback(...args);
				if (result !== EEventCode.IGNORED) break;
			}
		}
	}

	//----------------------------------------------------------------

}

//================================================================
