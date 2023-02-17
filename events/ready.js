const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const client = require('..');
const config = require('../config.json');
client.on('ready',mes =>{
    console.log(`LOGGED IN AS ${client.user.tag}`)
})