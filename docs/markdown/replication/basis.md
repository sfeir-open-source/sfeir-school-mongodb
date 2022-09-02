<!-- .slide" -->
# Réplication: Introduction
- Redondance des données <br/><br/>
- Haute disponibilité<br/><br/>
- Ensemble de processus mongod
Notes: 
La réplication est la base de la mise en production d'une base de données mongodb. En effet cette pratique permet
d'assurer une haute disponibilité des données puisque les données sont dupliquées à travers différents noeuds, chaque noeuds
caractérisant un process mongod

##==##

<!-- .slide -->
# Réplication: Architecture classique
![full-center h-700](assets/images/school/replication/replication-architecture.svg)
Notes: 
L'architecture de base de la réplication, consiste en trois noeuds:
 - un noeud primaire acceptant toutes les écritures et lectures
 - deux noeuds secondaires, copiant les données du noeux primiires en leur sein
Lorsque que le noeud primaire tombe en panne, une élection est mise en place pour déterminer le futur noeud primaire.

##==##
<!-- .slide -->
# Réplication: Limite
- 50 noeuds maximum par réplicat <br/><br/>
- 7 membr/es votant
