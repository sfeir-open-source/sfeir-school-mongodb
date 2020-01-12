<!-- .slide: class="sfeir-basic-slide" -->
# Les noeuds secondaires
<br><br>
<ul>
    <li>Maintient une copie des données présentes dans le noeuds primaires</li><br>
    <li>Maintient une copie des de l'oplog présent dans le noeud primaire</li><br>
    <li>Peut dévenir un noeud primaire suite à une éléction</li><br>
    <li>Peut répondre à des opérations de lecture</li><br>
    <li>Existe différent type de noeuds secondaires</li>
</ul>
Notes: les différents type de noeuds secondaires sont les suivants:
 - Delayed
 - Hidden
 - Non-Voting
 - Arbiter

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le noeud secondaire de type Delayed
<br>
<ul>
    <li>Maintient une copie des données retardés</li>
    <li>Ne peut pas devenir un membre primaire</li>
    <li>Possède le droit de vote</li>
    <li>Doit être caché du client</li>
</ul>
<div class="center">
    <img alt="h-500" src="assets/images/school/replication/configuration-delayed.png" />
</div>
Notes: Ce type de noeuds est principalement utilisé en cas d'erreur de gestion, ou lors d'une regression
Attention ce type de noeuds est inutil dans un shared cluster, pusqu'il renvoie des chunks passées.
Les données ne seront pas consistentes.

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le noeud secondaire de type Hidden
<br>
<ul>
    <li>Maintient une copie des données</li>
    <li>Ne peut pas devenir un membre primaire</li>
    <li>Possède le droit de vote</li>
    <li>Doit être caché du client</li>
</ul>
<div class="center">
    <img alt="h-500" src="assets/images/school/replication/configuration-hidden.png"/>
</div>
Notes: Ce type de noeuds est principalement utilisé pour faire du reporting ou des statistiques

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le noeud secondaire de type non-voting
<br><br>
<ul>
    <li>Maintient une copie des données</li><br>
    <li>Peut devenir primaire</li><br>
    <li>Ne peut voter</li><br>
</ul>
Notes: Ce type de noeuds est principalement utilisé pour ajouter des secondaires sans exéder le nombre de votants maximum