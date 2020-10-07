'use strict'

//sebelum menggunkana package bot ini install dahulu package 
// "dotenv","express","node-telegram-bot-api"
require('dotenv').config();
const APP_PORT = 1000;
const express = require('express');
const app = express(APP_PORT);
const telegram = require('node-telegram-bot-api'); //package for integration telegram and nodejs
const token = '1182481806:AAE4kBgAvUJ9Hp8X4dzzYQ7TxVyqU2l6KRo' //token telegram yang diberikakn 
const bot = new telegram(token, {
    polling: true
}); // init and config
const emoji = '\u{00002714}'; // emoji telegram

bot.onText(/\/start/, async (msg, match) => {
    const tlp = "08892111833"
    const chatId = msg.chat.id
    bot.sendMessage(
        chatId,
        `Selamat datang di urban style untuk pemesanan dapat hubungi <a>${tlp}</a>`, {
            parse_mode: 'HTML'
        }
    )
})

bot.onText(/\/checkin/, async (msg, match) => { // get command message for telegram example /checkin
    const username = match.input.split('|')[1] // get input text message on telegeram
    const attendance = match.input.split('|')[2]
    const type = match.input.split('|')[3]
    const times = match.input.split('|')[4]
    const chatId = msg.chat.id // chat id user telegram
    if (attendance === undefined) { // handle if message empty
        // send message if empty
        bot.sendMessage(chatId, 'format harus di isi Contoh : | username | Hadir | Work From Home | 11:00 |')
        return
    }
    // send message if success
    bot.sendMessage(
        chatId,
        `<b>${msg.chat.first_name}</b> : <b>${attendance}</b> - <b>${type}</b> - <b>${times}</b> ${emoji}`, {
            parse_mode: 'HTML'
        }
    )
})
bot.onText(/\/checkout/, async (msg, match) => {
    const username = match.input.split('|')[1]
    const times = match.input.split('|')[2]
    const chatId = msg.chat.id
    if (username === undefined) {
        bot.sendMessage(chatId, 'format harus di isi Contoh : | username | 12:00')
        return
    }
    bot.sendMessage(
        chatId,
        `<b>${msg.chat.first_name}</b> : Berhasil Checkout - <b>${times}</b> ${emoji}`, {
            parse_mode: 'HTML'
        }
    )
})
app.listen(APP_PORT, () => {
    console.log(`absensi bot running in port ${APP_PORT}`)
})