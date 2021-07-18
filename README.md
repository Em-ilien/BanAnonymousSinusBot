# BanAnonymousSinusBot
Script Sinusbot permettant aux modérateurs du serveur TS de bannir les utilisateurs anonymement à l'aide d'une commande


## Contexte

Voici un petit script SinusBot que j'avais conçu pour mon propre loisir dans l'optique de pouvoir bannir des utilisateurs du serveur TeamSpeak d'Ascentia anonymement, c'est-à-dire qu'ils ne sachent pas quel est le modérateur qui les a banni.

Avec un tel système, les Modos s'adressent à un robot client TeamSpeak, connecté au serveur et possédant les permissions de bannir les utilisateurs connectés.

Je publie ce script puisqu'il peut être utilisé voir adapté si besoin, en éditant bien sûr quelques variables des fichiers dont certaines que j'ai inscrites en clair au sein même du code. Je pense par exemple qu'il serait possible d'envisager d'ajouter dans le banlist du site PHP des actions permettant de débannir, etc.

Je pense aussi que mon système peut, une fois amélioré, permettre de retirer à vos modérateurs la permission de bannir eux-même et de le faire seulement avec la commande par MP au robot. L'avantage serait de permettre à vos modérateurs de dé-bannir sans leur accorder la permission de consulter la vraie banlist et de voir les IP des utilisateurs qu'ils bannissent.


## Fichiers

Il y a un script Sinusbot, et des fichiers PHP. Le script sinusbot envoie les liens temporaires, les codes, aux Modos par message. Les fichiers php doivent être herbergés sur un serveur et servent de "Webpannel" pour visualiser les bannissements réalisés par le robot.


## Auteur

Em_i <emilien@emixocle.fr>

Helper sur FunCraft
