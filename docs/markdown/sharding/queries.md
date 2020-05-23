<!-- .slide: class="sfeir-basic-slide" -->
# Distributed Queries: Introduction 
![center h-800](assets/images/school/sharding/shards-queries.svg)
Notes:
- MongoDB Mongos instance acheminent les requêtes et écrivent les opérations sur les shards appartenant au shared cluster.
Les instances Mongos sont les seules interfaces pouvant communiquer avec les différents shared. L'application ne doit jamais appeler 
un shared directement.

- Les instances mongos trackent les données du shared cluster en mettant en cache les metadatas. Ces instances utilisent ces metadatas
pour acheminer les requêtes vers le ou les bons shards avant de renvoyer les informations.
Attention un mongos n'a pas d'état persistant.

- Bonne pratiques: les instances mongos doivent tourner sur le même serveur que vos applications (on évite la latence)

##==##

<!-- .slide -->
# Distributed Queries: Fonctionnement
<br>

- Les requêtes sont résolues de la manière suivante:<br><br>
    - Détermine le ou les shards où doivent être transmis la requête<br><br>
    - Etablie un cursor sur les shards concernés par la requête<br><br>
    - Fusionne les resultats<br><br>

Attention
<!-- .element: class="bold important" -->
Certain traitements comme certaines aggrégation ou encore des modificateurs comme sort sont traités par le primary shard avant d'être renvoyés aux mongos.<br>
Certain pipelines peuvent être illégibles.
Notes:
- sort est traité par le primary shard
- $lookup peut ne pas être éligibles s'il inclut une collection qui n'est pas shard
- $group s'il est couplé à la propriété allowDisk

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Distributed Queries: Traitement des queries modifiers
<br><br>

- <b>SORT</b>: Traitement dans le primary shared, ouverture d'un cursor qui "round robins" les résultats des autres cursors des shards<br><br>
- <b>LIMIT</b>: La limit est passé à tous les shared, puis cette limit est de nouveau appliquée lors du merge des cursors<br><br>
- <b>SKIP</b>: Le skip n'est pas passé à tous les shared, mais il directement appliqués par les serveurs mongos lors du merge des cursors
</ul>
Notes:
Le sort possède une petite variante suivant la version mongoDB que l'on utilise
- > 3.6, si une le sort porte sur la Shard Key alors le traitement est effectué par les serveurs mongos (très performant)
 
##==##

<!-- .slide -->
# Distributed Queries: Opération de diffusion
<br>

![center h-800](assets/images/school/sharding/shards-queries.svg)


##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Distributed Queries: Opération de diffusion
<br><br>

- Shard Key n'est pas utilisée <br><br>
- Mongos merge tous les cursors et renvoie les résultats<br><br>
- updateMany<br><br>
- deleteMany

##==##

<!-- .slide -->
# Distributed Queries: Opération de ciblage
<br>

![center h-800](assets/images/school/sharding/sharded-queries-targeting.svg)

##==##

<!-- .slide -->
# Distributed Queries: Opération de ciblage
<br><br>

- Utilise la Shard Key <br><br>
- Cible automatique le ou les bons shared <br><br>
- insertOne, insertMany <br><br>
- updateOne, deleteOne doivent obligatoirement inclure la Shard Key ou _id <br><br> 
 