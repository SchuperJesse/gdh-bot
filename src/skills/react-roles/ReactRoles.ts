import * as fs from "fs";
import * as path from "path";
import {Skill, TApplicationCommand} from "../Skill";
import {SkillManager} from "../../SkillManager";

//================================================================

export class ReactRoles extends Skill {
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
		return {
			name: "rr",
			description: "React Roles",
			options: [
				require('../../../../cmds/react-roles/set.json'),
				require('../../../../cmds/react-roles/remove.json')
			]
		};
	}

}

//================================================================
