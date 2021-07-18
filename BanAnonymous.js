registerPlugin({
    name: 'BanAnonymous',
    version: '1.0',
    description: 'Cela sert à bannir des utilisateurs sur TS anonymement via une commande.',
    author: 'Em_i <emiliencoss@gmail.com>',
    requiredModules: ['db'],
}, function (_, config, meta) {
    var event = require('event');
    var engine = require('engine');
    const backend = require("backend");
    var db = require('db');

    function hasBanPermissions(client) {
        $hasPerm = false;
        client.getServerGroups().forEach(serverGroup => {
            [33, 34, 35, 6, 44].forEach(nb => {
                if (serverGroup.id() == nb)
                    $hasPerm = true;
            });
        });
        if (!$hasPerm)
            client.chat("Erreur : vous n'avez pas les permissions.");
        
        return $hasPerm;
    }

    var dbc = db.connect({ driver: 'mysql', host: '{MYSQL_SERVER}', username: '{USERNAME}', password: '{PASSWORD}', database: '{DATABASE}' }, function (err) {
        if (err) {
            engine.log(err);
        }
    });

    event.on('chat', function(ev) {
        const msg = ev.text;
        const mod = ev.client;
        const uidBanned = msg.split(' ')[1];
        
        if (!msg.startsWith("!"))
            return;
        
        if (!hasBanPermissions(mod))
            return;

        if (msg.startsWith("!ban ")){
            const banned = backend.getClientByUID(uidBanned);

            var now = new Date();
            var dd = now.getDate();
            var mm = now.getMonth()+1; 
            var yyyy = now.getFullYear();
            var hh = now.getHours();
            var min = now.getMinutes();
            var ss = now.getSeconds();

            if (dd < 10)
                dd = '0' + dd;
            if (mm < 10)
                mm = '0' + mm;
            if (hh < 10)
                hh = '0' + hh;
            if (min < 10)
                min = '0' + min;
            if (ss < 10)
                ss = '0' + ss;

            const date_now = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss;
            const date_unban = (dd + 07) + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min + ':' + ss;
            
            banned.ban(604800, "Contournement");

            if (dbc)
                dbc.exec("INSERT INTO bans (moderateur_uid, moderateur_pseudonyme, cible_uid, cible_pseudonyme, motif, date_ban, date_unban) VALUES (?, ?, ?, ?, ?, ?, ?)",
                mod.uid(), mod.name(), banned.uid(), banned.name(), "Contournement", date_now, date_unban);
            
        } else if (msg.startsWith("!list")) {
            const characters = "abcdefghijklmopqrstuvwxyz1234567890ABCDEFHIJKLMNOPQRSTUSVWXYZ123456789";
            let code = "";
            for (var p = 0; p < 45; p++) 
                code += characters[(Math.floor((Math.random() * characters.length)))];

            if (dbc)
                dbc.exec("INSERT INTO auth (code, expire) VALUES (?, ?)", code, ((new Date().valueOf())/1000)+60*30);

            mod.chat(`[color=red]/!\ Ne jamais donner votre URL aux joueurs. Elle contient en effet un code qui vous authentifie.[/color]\n[url=http://funcraft.alwaysdata.net?code=${code}]CLIQUEZ ICI pour consulter la liste des bannis anonymement[/url]`);
        } else {
            mod.chat("Aide : les commandes disponibles sont :\n!ban <UID>\n!list");
        }

    });
    
});
