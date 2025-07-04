<!-- .slide: class="sfeir-basic-slide" -->
# Distributed Queries: Introduction 
![center h-800](assets/images/school/sharding/shards-queries.svg)
Notes :
- Les instances MongoDB Mongos acheminent les requêtes et écrivent les opérations sur les shards appartenant au cluster shardé.
Les instances Mongos sont les seules interfaces pouvant communiquer avec les différents shards. L'application ne doit jamais appeler 
un shard directement.

- Les instances mongos suivent les données du cluster shardé en mettant en cache les métadonnées. Ces instances utilisent ces métadonnées
pour acheminer les requêtes vers le ou les bons shards avant de renvoyer les informations.
Attention, un mongos n'a pas d'état persistant.

- Bonnes pratiques : les instances mongos doivent tourner sur le même serveur que vos applications (on évite la latence)

##==##

<!-- .slide -->
# Distributed Queries : Fonctionnement
- Les requêtes sont résolues de la manière suivante :<br/><br/>
    - Déterminer le ou les shards où doit être transmise la requête<br/><br/>
    - Établir un cursor sur les shards concernés par la requête<br/><br/>
    - Fusionner les résultats<br/><br/>

Attention
<!-- .element: class="bold important" -->
Certains traitements comme certaines agrégations ou encore des modificateurs comme sort sont traités par le primary shard avant d'être renvoyés aux mongos.<br/>
Certains pipelines peuvent être illisibles.
Notes :
- sort est traité par le primary shard
- $lookup peut ne pas être éligible s'il inclut une collection qui n'est pas shardée
- $group s'il est couplé à la propriété allowDisk

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Distributed Queries : Traitement des modificateurs de requête
- <b>SORT</b> : Traitement dans le primary shard, ouverture d'un cursor qui "round robins" les résultats des autres cursors des shards<br/><br/>
- <b>LIMIT</b> : La limit est passée à tous les shards, puis cette limit est de nouveau appliquée lors du merge des cursors<br/><br/>
- <b>SKIP</b> : Le skip n'est pas passé à tous les shards, mais il est directement appliqué par les serveurs mongos lors du merge des cursors
</ul>
Notes :
Le sort possède une petite variante suivant la version MongoDB que l'on utilise :
- > 3.6, si le sort porte sur la Shard Key, alors le traitement est effectué par les serveurs mongos (très performant)
 
##==##

<!-- .slide -->
# Distributed Queries: Opération de diffusion
![center h-800](assets/images/school/sharding/shards-queries.svg)


##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Distributed Queries : Opération de diffusion
- Shard Key n'est pas utilisée <br/><br/>
- Mongos fusionne tous les cursors et renvoie les résultats<br/><br/>
- updateMany<br/><br/>
- deleteMany

##==##

<!-- .slide -->
# Distributed Queries: Opération de ciblage
![center h-800](assets/images/school/sharding/sharded-queries-targeting.svg)

##==##

<!-- .slide -->
# Distributed Queries : Opération de ciblage
- Utilise la Shard Key <br/><br/>
- Cible automatiquement le ou les bons shards <br/><br/>
- insertOne, insertMany <br/><br/>
- updateOne, deleteOne doivent obligatoirement inclure la Shard Key ou _id <br/><br/>
 