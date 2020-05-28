<!-- .slide -->
# Definition
<div class="full-center">
    Le sharding consiste à distribuer des données à travers plusieurs machines.<br>
    MongoDB utilise le sharding pour supporter un immense data set et de grosses opérations<br>
    C'est ce que l'on appelle l'horizontal scaling
</div>

##==##

<!-- .slide-->
# Configuration de base
<br>

![center h-800](assets/images/school/sharding/sharded-cluster.svg)
Notes:
- Un sharding est composé de la manière suivante:
 - shards (réplicat set contenant une partie des données)
 - mongos (server replicat set permettant de router la query vers les bons shared)
 - config servers (server replicat set contenant la configuration de votre cluster)
 
- Lors d'un déploiment en mise en production, le minimum requis est la configuration suivante:
 - un serveur de configuration (replicat set de 3 membres)
 - deux à trois shared data (replicat set de 3 membres)
 - un à plusieurs shard de routing(replicat set de 3 membres)

##==##

<!-- .slide -->
# Un peu de lexique
<br><br>

- Shard Key: clé de partage obligatoire. Doit être un index de la collection <br><br>
- chunk: Partition de la données <br><br>
- mongos: Replicat Set permettant de faire le routing de la query <br><br>
- sharded data: Replicat set possédant une partie des données, possédant des chunks

##==##

<!-- .slide -->
# Les différents stratégies de Sharding
<br><br>

- Hashed sharding <br><br>
- Range sharding <br><br>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Hashed Sharding
<br>

![center h-600](assets/images/school/sharding/hashed-sharding.svg)

Notes:
- Priviliger le hashed sharding lorsque la clé de shared change de manière monotonically et avec un large nombre de valeur possible pour la clé de partage

##==## 

<!-- .slide: class="sfeir-basic-slide" -->
# Range Sharding
<br>

![center h-600](assets/images/school/sharding/range-sharding.svg)
Notes:
- Priviligier le range sharding lorsque la clé de shared possède un large éventail de valeur avec très peu de redondance et qui n'évolue pas de manière monotonically