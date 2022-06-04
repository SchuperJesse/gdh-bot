import {EEventCode, Skill, TApplicationCommand, TEventResult} from "../Skill";
import {SkillManager} from "../../SkillManager";
import {EmbedBuilder} from "@discordjs/builders";
import {DMChannel, Guild, GuildMember, Interaction, Message, PartialUser, TextBasedChannel, User} from "discord.js";

//================================================================

export class Royale extends Skill {
//private:

//public:
	constructor(skillManager: SkillManager) {
		super(skillManager);
	}

	//----------------------------------------------------------------

	override initializeGuild(guild: Guild): void {
		this._skillManager.db.open(guild.id);
	};

	//----------------------------------------------------------------

	override start() {
		this._skillManager.addEventListener('interactionCreate', this.onInteractionCreate);
		this._skillManager.addEventListener('messageCreate', this.onMessageCreate);
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
			name: "royale",
			description: "Royale Challenge Command!",
			options: [
				require('../../../../cmds/royale/create.json')
			]
		};
	}

	//----------------------------------------------------------------

	override onInteractionCreate(interaction: Interaction) {
		if (interaction.isCommand()) {
			if (interaction.commandName !== 'royale') return EEventCode.IGNORED;

			// interaction.reply({
			// 	content: 'Royale Handled Event!',
			// 	ephemeral: true
			// })
			// .catch(err => console.error(err));

			console.log(interaction.options.getSubcommand());
			if (!interaction.options.getSubcommand()) {
				return EEventCode.IGNORED;
			}

			switch (interaction.options.getSubcommand()) {
				case 'help': {
					if (interaction.channel)
						this.getHelp(interaction.channel, interaction.user);
				} break;
				case 'create': {
					//console.log(interaction.options);
					let mode = interaction.options.getInteger('mode');
					console.log('Received Challenge Mode: ', mode);
					interaction.reply({
						content: `Created new challenge! ${mode}`,
						ephemeral: true
					})
					.catch(err => console.error(err));
				} break;
			}
		}
		if (interaction.isMessageComponent()) {
			interaction.channel?.messages.fetch(interaction.message.id)
				.then((message)=>{
					message.delete().catch(err => console.error(err));
				});
		}
		return EEventCode.IGNORED;
	}

	//----------------------------------------------------------------

	override onMessageCreate(message: Message): TEventResult {
		if (message.content.substring(0,1) != '!') return EEventCode.IGNORED;
		// message.delete()
		// .catch(err => console.error(err));
		//
		// message.channel.messages.fetch('id').then((msg)=>
		// {
		// 	msg.delete()
		// 	.catch(err => console.error(err));
		// })
		return EEventCode.IGNORED;
	}

	//----------------------------------------------------------------

	override onGuildCreate(guild: Guild): TEventResult {
		this._skillManager.db.open(guild.id);
		return EEventCode.CONSUMED_EVENT;
	}

	//----------------------------------------------------------------

	createChallenge() {

	}

	//----------------------------------------------------------------

	getHelp(channel: TextBasedChannel | DMChannel, user: User | PartialUser | GuildMember) {
		let embed = new EmbedBuilder();
		channel.send({
			embeds: [ embed.data ],
			allowedMentions: {
				users: [ user.id ],
				roles: []
			}
		})
		.catch(err => console.error(err));
	}

	//----------------------------------------------------------------

}

//================================================================
// Dis a comment for testing