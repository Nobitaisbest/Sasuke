const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require('chalk');

client.on("ready", () => {
	const activities = [
        {name: `One piece` , type: ActivityType.Streaming , url: `https://www.twitch.tv/discord`}
	];
	const status = [
		'online',
		'dnd',
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 5000);

	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 30000);
	console.log(chalk.red(`Logged in as ${client.user.tag}!`))
});