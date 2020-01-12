<!-- .slide: class="sfeir-basic-slide" -->
# Config Server (Mongos): Introduction
<br>
Les configs serveurs ou Mongos ont les propriétes suivantes:<br>
<ul>
    <li>Contient l'état et l'organisation de toutes les données et composants du shared cluster</li><br>
    <li>Contient la configuration d'authentification</li><br>
    <li>Une instance Mongos cache les données et les utilise pour le routing des queries</li>
    <li>Une instance Mongos update le cache quand ses metadatas changent</li>
</ul>
Notes:
Update du cache se fait dans les situations suivantes
 - ajout d'un shard
 - Migration de chunk
 - split de chunk
 
##==##

<!-- .slide: class="sfeir-basic-slide -->
# Config Server (Mongos): Replicat Set
<br><br>
Chaque config server doit obligatoirement être un réplicat Set avec les conditions suivantes:<br>
<ul>
    <li>Zero arbiters</li><br>
    <li>Zero delayed members</li><br>
    <li>Aucun membres de ce réplicat ne doit avoir la propriété buildIndexes à false</li>
</ul>
<br><br>
Notes:
- Cette méthode permet d'avoir une haute disponibilité de la configuration puisque un réplicat set peut avoir jusque 50 membres

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Config Server (Mongos): Ecriture
<br>
<h6>Ecriture</h6><br>
<ul>
    <li>Admin database: authentification et authorization</li><br>
    <li>Config database: shared cluster metadata</li><br>
    <li>Eviter d'écrire directement dans la Config Database</li><br>
    <li>Write Concern toujours sur majority</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Config Server (Mongos): Lecture
<br>
<h6>Lecture</h6><br>
<ul>
    <li>Admin database: authentification et authorization</li><br>
    <li>Config database: shared metadata, lecture uniquement après un changement dans les metadata (split de chunk ou migration)</li><br>
    <li>Read concern toujours à "majority"</li>
</ul>
<br><br>
```sh
use config
```

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Config Server (Mongos): Disponibilité
<br><br>
Si un le primaire du config server tombe en panne:<br>
<ul>
    <li>Config Server devient readOnly tant qu'un autre primaire n'est pas élu</li><br>
    <li>Readonly: pas de migration, les opérations de lecture et écriture sont encore réalisées sur les datas des shared</li><br>
    <li>Si tous les serveurs de config sont indisponibles, le cluster devient non opérationnel</li><br>
    <li>Réaliser des backups est recommandés</li>
</ul>

