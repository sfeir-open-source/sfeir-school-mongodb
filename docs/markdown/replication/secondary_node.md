<!-- .slide -->
# Les noeuds secondaires
- Maintient une copie des données présentes dans le noeuds primaires<br/><br/>
- Maintient une copie des de l'oplog présent dans le noeud primaire<br/><br/>
- Peut dévenir un noeud primaire suite à une éléction<br/><br/>
- Peut répondre à des opérations de lecture<br/><br/>
- Existe différent type de noeuds secondaires<br/><br/>

Notes: les différents type de noeuds secondaires sont les suivants:
 - Delayed
 - Hidden
 - Non-Voting
 - Arbiter

##==##

<!-- .slide -->
# Le noeud secondaire de type Delayed
- Maintient une copie des données retardés
- Ne peut pas devenir un membr/e primaire
- Possède le droit de vote

![center h-500](assets/images/school/replication/configuration-delayed.png)

Notes: Ce type de noeuds est principalement utilisé en cas d'erreur de gestion, ou lors d'une regression
Attention ce type de noeuds est inutil dans un shared cluster, pusqu'il renvoie des chunks passées.
Les données ne seront pas consistentes.

##==##

<!-- .slide -->
# Le noeud secondaire de type Hidden
- Maintient une copie des données
- Ne peut pas devenir un membr/e primaire
- Possède le droit de vote
- Doit être caché du client

![center h-500](assets/images/school/replication/configuration-hidden.png)

Notes: Ce type de noeuds est principalement utilisé pour faire du reporting ou des statistiques

##==##

<!-- .slide -->
# Le noeud secondaire de type non-voting
- Maintient une copie des données <br/><br/>
- Peut devenir primaire <br/><br/>
- Ne peut voter

Notes: Ce type de noeuds est principalement utilisé pour ajouter des secondaires sans exéder le nombr/e de votants maximum
