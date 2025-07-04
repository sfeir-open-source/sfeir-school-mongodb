<!-- .slide -->
# Les nœuds secondaires
- Maintiennent une copie des données présentes dans le nœud primaire<br/><br/>
- Maintiennent une copie de l'oplog présent dans le nœud primaire<br/><br/>
- Peuvent devenir un nœud primaire suite à une élection<br/><br/>
- Peuvent répondre à des opérations de lecture<br/><br/>
- Il existe différents types de nœuds secondaires<br/><br/>

Notes : les différents types de nœuds secondaires sont les suivants :
 - Delayed
 - Hidden
 - Non-Voting
 - Arbiter

##==##

<!-- .slide -->
# Le nœud secondaire de type Delayed
- Maintient une copie des données retardée
- Ne peut pas devenir un membre primaire
- Possède le droit de vote

![center h-500](assets/images/school/replication/configuration-delayed.png)

Notes : Ce type de nœuds est principalement utilisé en cas d'erreur de gestion ou lors d'une régression.
Attention, ce type de nœuds est inutile dans un cluster shardé, puisqu'il renvoie des chunks passés.
Les données ne seront pas cohérentes.

##==##

<!-- .slide -->
# Le nœud secondaire de type Hidden
- Maintient une copie des données
- Ne peut pas devenir un membre primaire
- Possède le droit de vote
- Doit être caché du client

![center h-500](assets/images/school/replication/configuration-hidden.png)

Notes : Ce type de nœuds est principalement utilisé pour faire du reporting ou des statistiques

##==##

<!-- .slide -->
# Le nœud secondaire de type non-voting
- Maintient une copie des données <br/><br/>
- Peut devenir primaire <br/><br/>
- Ne peut pas voter

Notes : Ce type de nœuds est principalement utilisé pour ajouter des secondaires sans excéder le nombre de votants maximum
