<?php

    $code = htmlspecialchars($_GET["code"]);
    $bdd = new PDO('mysql:{MYSQL_SERVER};dbname={DATABASE};charset=utf8', '{USERNAME}', '{PASSWORD}');
    $rep = $bdd->prepare('SELECT code, expire FROM auth WHERE code = :code');
    $rep->execute(array('code' => $code));

    $res = $rep->fetch();

    if (is_null($res['expire']) || $res['expire'] < time()){
        include('error_code.php');
        return;
    }

?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des bannis anonymement - Ascentia</title>
	<link rel="stylesheet" href="style.css" />
</head>
<body>
    <section>
        <p>
            Développé par Em_i.
        </p>
        <p>
            /!\ Ne jamais donner votre URL aux joueurs. Elle contient en effet un code qui vous authentifie. 
        </p>
        <p>
            Quelle est l'utilité ? Bannir des utilisateurs du TS qui sont connectés. Avec ce système, ils ne savent pas qui les bannissent.
        </p>
        <p>
            Peut-on customiser le motif ? Non. Vous pouvez cependant bannir par dessus le robot une fois qu'il a banni anonymement pour augmenter la durée de la sanction et mettre un autre motif. Le joueur ne saura pas qui l'a ban si vous le bannissez alors que son identité est déconnectée.
        </p>
        <p>
            Notez que ce tableau n'est pas relié au serveur teamspeak et il se peut que des informations soient erronées. Par exemple, si un bannissement est retiré sur la vraie banlist, ce ne sera pas actualisé ici. Notez aussi que ce tableau ne répertorie que les bannissement UUID et non IP.
        </p>
        <p>
            Notez que seuls les bannissements anonymes engendrés par les robots sont répertoriés ici.
        </p>
        <p>
            Contrôle + F pour rechercher un pseudonyme, une UUID...
        </p>
    </section>
    <table>
        <tr>
            <th>Créateur</th>
            <th>Client banni</th>
            <th>Motif</th>
            <th>Créé</th>
            <th>Expire</th>
        </tr>

<?php

        $req = $bdd->query('SELECT moderateur_uid, moderateur_pseudonyme, cible_uid, cible_pseudonyme, motif, date_ban, date_unban FROM bans ORDER BY id DESC');

        while ($donnes = $req->fetch()) {
            $moderateur_uid = $donnes["moderateur_uid"];
            $moderateur_pseudonyme = $donnes["moderateur_pseudonyme"];
            $cible_uid = $donnes["cible_uid"];
            $cible_pseudonyme = $donnes["cible_pseudonyme"];
            $motif = $donnes["motif"];
            $date_ban = $donnes["date_ban"];
            $date_unban = $donnes["date_unban"];

            echo '<tr><td>'.$moderateur_pseudonyme.' ('.$moderateur_uid.')</td><td>'. $cible_pseudonyme.' ('.$cible_uid.')</td><td>'.$motif.'</td><td>'.$date_ban.'</td><td>'.$date_unban.'</td></tr>';
        }

?>

    </table>
</body>
</html>
