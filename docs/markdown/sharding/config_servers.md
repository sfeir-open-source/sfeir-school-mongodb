<!-- .slide -->
# Config Server (Mongos): Introduction

- Les configs serveurs ou Mongos ont les propriétes suivantes:<br><br>
    - Contient l'état et l'organisation de toutes les données et composants du shared cluster <br><br>
    - Contient la configuration d'authentification <br><br>
    - Une instance Mongos cache les données et les utilise pour le routing des queries <br><br>
    - Une instance Mongos update le cache quand ses metadatas changent <br><br>

Notes:
Update du cache se fait dans les situations suivantes
 - ajout d'un shard
 - Migration de chunk
 - split de chunk
 
##==##

<!-- .slide-->
# Config Server (Mongos): Replicat Set
<br>

- Chaque config server doit obligatoirement être un Replicat Set avec les conditions suivantes:<br><br>
    - Zero arbiters <br><br>
    - Zero delayed members <br><br>
    - Aucun membres de ce réplicat ne doit avoir la propriété buildIndexes à false
Notes:
- Cette méthode permet d'avoir une haute disponibilité de la configuration puisque un réplicat set peut avoir jusque 50 membres

##==##

<!-- .slide -->
# Config Server (Mongos): Ecriture
<br>

- Admin database: authentification et authorization <br><br>
- Config database: shared cluster metadata <br><br>
- Eviter d'écrire directement dans la Config Database <br><br>
- Write Concern toujours sur majority


##==##

<!-- .slide: class="with-code inconsolata" -->
# Config Server (Mongos): Lecture
<br>

- Admin database: authentification et authorization <br><br>
- Config database: shared metadata, lecture uniquement après un changement dans les metadata (split de chunk ou migration) <br><br>
- Read concern toujours à "majority"
<br><br>
```sh
use config
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# Config Server (Mongos): Disponibilité
<br><br>

- Si un le primaire du config server tombe en panne: <br><br>
    - Config Server devient readOnly tant qu'un autre primaire n'est pas élu <br><br>
    - Readonly: pas de migration, les opérations de lecture et écriture sont encore réalisées sur les datas des shared <br><br>
    - Si tous les serveurs de config sont indisponibles, le cluster devient non opérationnel <br><br>
    - Réaliser des backups est recommandé

