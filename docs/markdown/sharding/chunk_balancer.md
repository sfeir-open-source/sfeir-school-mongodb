<!-- .slide: -->
# Chunk et Balancer : Définition
<span class="full-center">
    Un chunk consiste en une partie des données shardées.<br/>
    Chaque chunk possède une borne inférieure inclusive et une borne supérieure exclusive basées sur la Shard Key.
</span>

##==##

<!-- .slide -->
# Chunk et Balancer : Initialisation
 - L'opération de shard crée le(s) chunk(s) pour couvrir l'entièreté des valeurs de la Shard Key <br/><br/>
 - Le nombre de chunks peut être configuré <br/><br/>
 - Le balancer répartit ensuite ces chunks à travers les shards et gère la répartition des chunks à l'avenir

##==##

<!-- .slide -->
# Chunk et Balancer : La taille d'un chunk et ses répercussions
La taille maximum d'un chunk est de 64 MB.<br/><br/>

- Changer sa taille a plusieurs répercussions : <br/><br/>
    - Des chunks de petite taille engendrent une fréquence de migration des chunks plus élevée. Les Mongos sont donc plus sollicités <br/><br/>
    - Des chunks de taille plus large engendrent une fréquence de migrations moins élevée. Les Mongos sont donc moins sollicités. Distribution des données potentiellement inégale <br/><br/>
    - Le nombre maximum de documents par chunk à migrer <br/><br/>
