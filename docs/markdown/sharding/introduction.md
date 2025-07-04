<!-- .slide -->
# Définition
<div class="full-center">
    Le sharding consiste à distribuer des données à travers plusieurs machines.<br/>
    MongoDB utilise le sharding pour supporter un immense data set et de grosses opérations.<br/>
    C'est ce que l'on appelle l'horizontal scaling.
</div>

##==##

<!-- .slide-->
# Configuration de base
![center h-800](assets/images/school/sharding/sharded-cluster.svg)
Notes :
- Un sharding est composé de la manière suivante :
 - shards (replica set contenant une partie des données)
 - mongos (serveur replica set permettant de router la requête vers les bons shards)
 - config servers (serveur replica set contenant la configuration de votre cluster)
 
- Lors d'un déploiement en mise en production, le minimum requis est la configuration suivante :
 - un serveur de configuration (replica set de 3 membres)
 - deux à trois shards de données (replica set de 3 membres)
 - un à plusieurs serveurs de routage (replica set de 3 membres)

##==##

<!-- .slide -->
# Un peu de lexique
- Shard Key : clé de partage obligatoire. Doit être un index de la collection <br/><br/>
- chunk : partition des données <br/><br/>
- mongos : Replica Set permettant de faire le routage de la requête <br/><br/>
- shard : Replica Set possédant une partie des données et des chunks

##==##

<!-- .slide -->
# Les différentes stratégies de Sharding
- Hashed sharding <br/><br/>
- Range sharding <br/><br/>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Hashed Sharding
![center h-600](assets/images/school/sharding/hashed-sharding.svg)

Notes :
- Privilégier le hashed sharding lorsque la clé de shard change de manière monotone et avec un large nombre de valeurs possibles pour la clé de partage

##==## 

<!-- .slide: class="sfeir-basic-slide" -->
# Range Sharding
![center h-600](assets/images/school/sharding/range-sharding.svg)
Notes :
- Privilégier le range sharding lorsque la clé de shard possède un large éventail de valeurs avec très peu de redondance et qui n'évolue pas de manière monotone
