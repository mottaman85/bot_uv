// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');

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
                context.sendActivity(
                    { attachments: [
                        CardFactory.videoCard(
            '2018 Imagine Cup World Championship Intro',
            [{ url: 'https://sec.ch9.ms/ch9/783d/d57287a5-185f-4df9-aa08-fcab699a783d/IC18WorldChampionshipIntro2.mp4' }],
            [{
                type: 'openUrl',
                title: 'Lean More',
                value: 'https://channel9.msdn.com/Events/Imagine-Cup/World-Finals-2018/2018-Imagine-Cup-World-Championship-Intro'
            }],
            {
                subtitle: 'by Microsoft',
                text: 'Microsoft\'s Imagine Cup has empowered student developers around the world to create and innovate on the world stage for the past 16 years. These innovations will shape how we live, work and play.'
            }
        )] })
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
