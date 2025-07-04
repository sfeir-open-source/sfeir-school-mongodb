<!-- .slide -->
# Config Server (Mongos) : Introduction
- Les config servers ou Mongos ont les propriétés suivantes :<br/><br/>
    - Contiennent l'état et l'organisation de toutes les données et composants du cluster shardé <br/><br/>
    - Contiennent la configuration d'authentification <br/><br/>
    - Une instance Mongos cache les données et les utilise pour le routage des requêtes <br/><br/>
    - Une instance Mongos met à jour le cache quand ses métadonnées changent <br/><br/>

Notes :
La mise à jour du cache se fait dans les situations suivantes :
 - ajout d'un shard
 - migration de chunk
 - split de chunk
 
##==##

<!-- .slide-->
# Config Server (Mongos) : Replica Set
- Chaque config server doit obligatoirement être un replica set avec les conditions suivantes :<br/><br/>
    - Zéro arbiters <br/><br/>
    - Zéro delayed members <br/><br/>
    - Aucun membre de ce replica set ne doit avoir la propriété buildIndexes à false
Notes :
- Cette méthode permet d'avoir une haute disponibilité de la configuration puisqu'un replica set peut avoir jusqu'à 50 membres

##==##

<!-- .slide -->
# Config Server (Mongos) : Écriture
- Admin database : authentification et autorisation <br/><br/>
- Config database : métadonnées du cluster shardé <br/><br/>
- Éviter d'écrire directement dans la Config Database <br/><br/>
- Write Concern toujours sur majority


##==##

<!-- .slide: class="with-code inconsolata" -->
# Config Server (Mongos) : Lecture
- Admin database : authentification et autorisation <br/><br/>
- Config database : métadonnées du cluster, lecture uniquement après un changement dans les métadonnées (split de chunk ou migration) <br/><br/>
- Read concern toujours à "majority"
<br/><br/>
```sh
use config
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# Config Server (Mongos) : Disponibilité
- Si le primaire du config server tombe en panne : <br/><br/>
    - Config Server devient readOnly tant qu'un autre primaire n'est pas élu <br/><br/>
    - Readonly : pas de migration, les opérations de lecture et écriture sont encore réalisées sur les données des shards <br/><br/>
    - Si tous les serveurs de config sont indisponibles, le cluster devient non opérationnel <br/><br/>
    - Réaliser des backups est recommandé

