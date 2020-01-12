<!-- .slide: class="sfeir-basic-slide" -->
# Les différents moments d'élection
<br><br>
<div class="flex-row">
    <ul>
        <li>Initialisation d'un réplicat</li><br>
        <li>Ajout d'un nouveau noeud</li><br>
        <li>Opération de maintenance</li><br>
        <li>Primaire down</li><br>
    </ul>
    <img alt="h-600" src="assets/images/school/replication/election.svg"/>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide -->
# Les propriétés de l'election
<br><br>
<ul>
    <li>Durée d'une élection d'environs 12 secondes</li><br>
    <li>On peut réduire ce temps en utilisant la propriété <strong>electionTimeoutMillis</strong></li><br>
    <li>Paramètre à prendre en compte, la latence du réseau</li><br>
    <li>Réjouer les écritures perdues</li>
</ul>
Notes:
 - Version MongoDB 3.6 et 4.0 il faut préciser cette option à true
 - Version MongoDB 4.2, cette option est à true par defaut

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le fonctionnement d'une élection
<br><br>
<ul>
    <li>Heartbeats</li><br>
    <li>Evènement d'élection levée</li><br>
    <li>Votes</li><br>
    <li>Algorithm best effort</li><br>
</ul>
Notes:
 - Normalement, le noeud possédant la valeur la plus haute de la propriété priority se voit élu primaire
 - Heartbeats sont en quelques sortes des pings que lancent les secondaires au primaire pour savoir s'il est toujours up
 
##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Rollback after a failover
<br><br>
<ul>
    <li>Rollack nécessaire quand les opérations d'écriture non pas été répliqués</li><br>
    <li>Action très rare, resultante d'un "network partition"</li><br>
    <li>Se trouve dans le fichier suivant: <strong>"dbpath/rollback/db.collection.date.bson"</strong></li><br>
    <li>Peut s'éviter grâce à l'option write concern</li>
</ul>
