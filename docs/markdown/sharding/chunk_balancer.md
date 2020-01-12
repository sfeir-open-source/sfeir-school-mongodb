<!-- .slide: class="sfeir-basic-slide" -->
# Chunk and Balancer: definition
<br><br>
<span class="full-center">
    Un chunk consiste en une partie des données partagées.<br>
    Chaque chunk possède un inclusive inférieur et exclusive supérieur basé sur la shared key
</span>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Chunck and Balancer: initialisation
<br>
<ul>
    <li>L'opération de shard crée le(s) chunk(s) pour couvrir l'entièreté des valeurs de la shared key</li><br>
    <li>Le nombre de chunks peut être configuré</li><br>
    <li>Le balancer ensuite répartie ces chuncks à travers les shared data et gère la répartition des chunks à l'avenir</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Chunck and Balancer: La taille d'un chunk et ses repercutions
<br>
La taille maximum d'un chunk est de 64 MB.<br>
Changer sa taille à plusieurs répercussion:<br>
<ul>
    <li>Chuncks de petite taille engendre une féquence de migration des chunks plus élevés. Les Mongos sont donc plus sollicités</li><br>
    <li>Chuncks de taille plus large engendre une fréquence de migrations moins élevés. Les Mongos sont dont moins sollicités. Distribition des données potentiellement inégale </li><br>
    <li>Le nombre de maximum de document par chunk à migrer</li>
</ul>