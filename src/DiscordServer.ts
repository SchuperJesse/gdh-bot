import {Guild, Snowflake, User} from "discord.js";

export type BasicTypes = null | boolean | number | string;
export type JSONTypes = (BasicTypes | JSONTypes)[] | {[key:string]: (BasicTypes | JSONTypes)};

export interface ISkill {
	name: string;
	enabled: boolean;
	settings: JSONTypes;
}

//================================================================

export class DiscordServer {
//private:
	#guild: Guild;
	#config: {
		id: Snowflake,
		name: string,
		owner: Snowflake,
		admins: Snowflake[],
		moderators: Snowflake[],
		skills: ISkill[]
	};

//public:
	constructor(guild: Guild) {
		this.#guild = guild;
		this.#config = {
			id: guild.id,
			name: guild.name,
			owner: guild.ownerId,
			admins: [ guild.ownerId ],
			moderators: [],
			skills: []
		};
	}

}

//================================================================
