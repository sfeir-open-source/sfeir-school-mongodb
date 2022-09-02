<!-- .slide: -->
# Chunk et Balancer: Definition
<span class="full-center">
    Un chunk consiste en une partie des données partagées.<br/>
    Chaque chunk possède un inclusive inférieur et exclusive supérieur basé sur la Shard Key
</span>

##==##

<!-- .slide -->
# Chunk et Balancer: Initialisation
 - L'opération de shard crée le(s) chunk(s) pour couvrir l'entièreté des valeurs de la Shard Key <br/><br/>
 - Le nombre de chunks peut être configuré <br/><br/>
 - Le balancer ensuite répartie ces chuncks à travers les shared data et gère la répartition des chunks à l'avenir

##==##

<!-- .slide -->
# Chunk et Balancer: La taille d'un chunk et ses répercutions
La taille maximum d'un chunk est de 64 MB.<br/><br/>

- Changer sa taille à plusieurs répercussion <br/><br/>
    - Chuncks de petite taille engendre une féquence de migration des chunks plus élevés. Les Mongos sont donc plus sollicités <br/><br/>
    - Chuncks de taille plus large engendre une fréquence de migrations moins élevés. Les Mongos sont dont moins sollicités. Distribution des données potentiellement inégale <br/><br/>
    - Le nombre de maximum de document par chunk à migrer <br/><br/>
