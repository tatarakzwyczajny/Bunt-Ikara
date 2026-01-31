// server.js
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Tworzymy serwer Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// ======= KONFIGURACJA =======
const DISCORD_TOKEN = "MTQ2NzI0MjY5NDY0Nzc0NjYzNA.G-ETeD.m_KJJquPOjMOyPMS9mPLsCTsVV5JMWuo2ymNVo"; // Token bota Discord
const CHANNEL_ID = "1464921931730911358";    // ID kanału Discord
// ===========================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Logowanie bota do Discorda
client.login(DISCORD_TOKEN);

// Odbieranie wiadomości z Discorda i wysyłanie do bloga
client.on("messageCreate", msg => {
  if (msg.channel.id === CHANNEL_ID && !msg.author.bot) {
    io.emit("discordMessage", { user: msg.author.username, text: msg.content });
  }
});

// Socket.io: odbieranie wiadomości z bloga i wysyłanie do Discorda
io.on("connection", socket => {
  console.log("Blog połączony");

  socket.on("chatMessage", msg => {
    // Ograniczenie długości nicku i wiadomości
    let user = msg.user.substring(0, 20);
    let text = msg.text.substring(0, 300);

    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) channel.send(`${user}: ${text}`);
  });
});

// Uruchomienie serwera
server.listen(3000, () => console.log("Serwer działa na porcie 3000"));
