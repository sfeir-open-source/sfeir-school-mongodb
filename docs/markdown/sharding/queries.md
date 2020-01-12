<!-- .slide: class="sfeir-basic-slide" -->
# Queries in shared: Introduction 
<br>
<img alt="center h-800" src="assets/images/school/shareding/shards-queries.svg" />
Notes
- MongoDB Mongos instance acheminent les requêtes et écrivent les opérations sur les shards appartenant au shared cluster.
Les instances Mongos sont les seules interfaces pouvant communiquer avec les différents shared. L'application ne doit jamais appeler 
un shared directement.

- Les instances mongos trackent les données du shared cluster en mettant en cache les metadatas. Ces instances utilisent ces metadatas
pour acheminer les requêtes vers le ou les bons shareds avant de renvoyer les informations.
Attention un mongos n'a pas d'état persistant.

- Bonne pratiques: les instances mongos doivent tourner sur le même serveur que vos applications (on évite la latence)

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Queries in shared: Fonctionnement
<br>
Les requêtes sont résolues de la manière suivante:<br>
<ul>
    <li>Détermine le ou les shareds où doivent être transmis la requête</li><br>
    <li>Etablie un cursor sur les shareds concernés par la requête</li><br>
    <li>Fusionne les resultats</li><br>
</ul>
<h4>Attention</h4>
Certain traitements comme certaines aggrégation ou encore des modificateurs comme sort sont traités par le primary shard avant d'être renvoyés aux mongos.<br>
Certain pipelines peuvent être illégibles.
<br>
Notes:
- sort est traité par le primary shard
- $lookup peut ne pas être éligibles s'il inclut une collection qui n'est pas shard
- $group s'il est couplé à la propriété allowDisk

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Queries in a shared: traitement des queries modifiers
<br><br>
<ul>
    <li><strong>SORT</strong>: Traitement dans le primary shared, ouverture d'un cursor qui "round robins" les résultats des autres cursors des shards</li><br>
    <li><strong>LIMIT</strong>: La limit est passé à tous les shared, puis cette limit est de nouveau appliquée lors du merge des cursors</li><br>
    <li><strong>SKIP</strong>: Le skip n'est pas passé à tous les shared, mais il directement appliqués par les serveurs mongos lors du merge des cursors</li>
</ul>
Notes
Le sort possède une petite variante suivant la version mongoDB que l'on utilise
 - > 3.6, si une le sort porte sur la shared key alors le traitement est effectué par les serveurs mongos (très performant)
 
##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Queries in a shared: Broadcast operation
<br>
<img alt="center h-800" src="assets/images/school/shareding/shards-queries.svg"/>
<br>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Queries in a shared: Broadcast operation
<br><br>
<ul>
    <li>shared key n'est pas utilisée</li><br>
    <li>Mongos merge tous les cursors et renvoie les résultats</li><br>
    <li>updateMany</li><br>
    <li>deleteMany</li><br>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Queries in a shared: Targetting operation
<br>
<img alt="center h-800" src="assets/images/school/shareding/shared-queries-targeting.svg" />
<br>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Queries in a shared: Targetting operation
<br><br>
<ul>
    <li>Utilie la shared key</li><br>
    <li>Cible automaitque le ou les bons shared</li><br>
    <li>insertOne, insertMany</li><br>
    <li>updateOne, deleteOne doivent obligatoirement inclure la shared key ou _id</li><br> 
</ul>
 
 