import {Skill, TApplicationCommand} from "../Skill";
import {SkillManager} from "../../SkillManager";
import {Channel} from "discord.js";

//================================================================

export class GameJam extends Skill {
//private:

//public:
	constructor(skillManager: SkillManager) {
		super(skillManager);
	}

	//----------------------------------------------------------------

	override start() {
	}

	//----------------------------------------------------------------

	override update() {
	}

	//----------------------------------------------------------------

	override stop() {
	}

	//----------------------------------------------------------------

	override get commands(): TApplicationCommand | null {
		return null;
		// return {
		// 	name: "jam",
		// 	description: "Game Jam",
		// 	options: [
		// 		require('./cmds/create.json'),
		// 		require('./cmds/remove.json'),
		// 		require('./cmds/start.json'),
		// 		require('./cmds/stop.json'),
		// 		require('./cmds/update.json')
		// 	]
		// }
	}
}

//================================================================
