<!-- .slide" -->
# Réplication : Introduction
- Redondance des données <br/><br/>
- Haute disponibilité<br/><br/>
- Ensemble de processus mongod
Notes : 
La réplication est la base de la mise en production d'une base de données MongoDB. En effet, cette pratique permet
d'assurer une haute disponibilité des données puisque les données sont dupliquées à travers différents nœuds, chaque nœud
caractérisant un processus mongod.

##==##

<!-- .slide -->
# Réplication : Architecture classique
![full-center h-700](assets/images/school/replication/replication-architecture.svg)
Notes : 
L'architecture de base de la réplication consiste en trois nœuds :
 - un nœud primaire acceptant toutes les écritures et lectures
 - deux nœuds secondaires, copiant les données du nœud primaire en leur sein
Lorsque le nœud primaire tombe en panne, une élection est mise en place pour déterminer le futur nœud primaire.

##==##
<!-- .slide -->
# Réplication : Limites
- 50 nœuds maximum par replica set <br/><br/>
- 7 membres votants maximum
