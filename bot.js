// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {


            if(context.activity.text.toUpperCase() === "HOLA"){
                return await context.sendActivity(`HOLA AMIGO`);    
            }if(context.activity.text.toUpperCase() === "MENU"){
                return await context.sendActivity(`EL MENU ES EL SIGUIENTE`);    
            }if(context.activity.text.toUpperCase() === "FAQ"){
                return await context.sendActivity(`MENU DE PREGUNTAS FRECUENTES`);    
            }else{
                var reply = MessageFactory.suggestedActions(['HOLA', 'MENU', 'FAQ'], 'Hola, AUN ESTOY APRENDIENDO, PERO PUEDO HACER LO SIGUIENTE');
                return await context.sendActivity(reply);       
            }

            
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.MyBot = MyBot;
