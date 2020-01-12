<!-- .slide: class="sfeir-basic-slide" -->
# Réplication: Introduction
<br><br>
<ul>
    <li>Redondance des données</li><br>
    <li>Haute disponibilité</li><br>
    <li>Ensemble de processus mongod</li>
</ul>
Notes: 
La réplication est la base de la mise en production d'une base de données mongodb. En effet cette pratique permet
d'assurer une haute disponibilité des données puisque les données sont dupliquées à travers différents noeuds, chaque noeuds
caractérisant un process mongod

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Réplication: Architecture classique
<div class="full-center">
    <img alt="h-700" src="assets/images/school/replication/replication-architecture.svg"/>
</div>
Notes: 
L'architecture de base de la réplication, consiste en trois noeuds:
 - un noeud primaire acceptant toutes les écritures et lectures
 - deux noeuds secondaires, copiant les données du noeux primiires en leur sein
Lorsque que le noeud primaire tombe en panne, une élection est mise en place pour déterminer le futur noeud primaire.

##==##
<!-- .slide: class="sfeir-basic-slide" -->
# Réplication: Limite
<br><br><br>
<div>
    <ul>
        <li>50 noeuds maximum par réplicat</li><br>
        <li>7 membres votant</li>
    </ul>
</div>