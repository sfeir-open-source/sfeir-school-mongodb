<!-- .slide: class="two-column" -->
## Les différents moments d'élection
- Initialisation d'un réplicat <br/><br/>
- Ajout d'un nouveau noeud <br/><br/>
- Opération de maintenance <br/><br/>
- Primaire down <br/><br/>
##--##
## Une image est plus parlante
<br/><br/>
![h-600](assets/images/school/replication/election.svg)

##==##

<!-- .slide-->
# Les propriétés de l'election
- Durée d'une élection d'environs 12 secondes <br/><br/>
- On peut réduire ce temps en utilisant la propriété <b>electionTimeoutMillis</b><br/><br/>
- Paramètre à prendre en compte, la latence du réseau<br/><br/>
- Réjouer les écritures perdues<br/><br/>

Notes:
 - Version MongoDB 3.6 et 4.0 il faut préciser cette option à true
 - Version MongoDB 4.2, cette option est à true par defaut

##==##

<!-- .slide -->
# Le fonctionnement d'une élection
- Heartbeats <br/><br/>
- Evènement d'élection levée <br/><br/>
- Votes <br/><br/>
- Algorithme best effort

Notes:
 - Normalement, le noeud possédant la valeur la plus haute de la propriété priority se voit élu primaire
 - Heartbeats sont en quelques sortes des pings que lancent les secondaires au primaire pour savoir s'il est toujours up
 
##==##

<!-- .slide-->
# Rollback après un failover
- Rollback nécessaire quand les opérations d'écriture non pas été répliqués <br/><br/>
- Action très rare, resultante d'un "network partition" <br/><br/>
- Se trouve dans le fichier suivant: <b>"dbpath/rollback/db.collection.date.bson"</b> <br/><br/>
- Peut s'éviter grâce à l'option write concern
