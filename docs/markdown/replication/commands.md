<!-- .slide: class="sfeir-basic-slide" -->
# Les commandes de réplication
<br><br>
<ul>
    <li><strong>rs.conf()</strong></li><br>
    <li><strong>rs.status()</strong></li><br>
    <li><strong>rs.add()</strong></li><br>
    <li><strong>rs.remove()</strong></li><br>
    <li><strong>rs.reconfig()</strong></li><br>
</ul>

Notes: 
 - rs.config permet de récupérer un document contenant la configuration de notre réplicat set
 - rs.status() permet d'avoir la description de la configuration de notre réplicat set
 - rs.add() permet d'ajouter un membre à notre réplicat set
 - rs.remove() permet de supprimer un membre de notre replicat set
 - rs.reconfig() permet de reconfigurer notre réplicat set (membre)
 
 ##==##
 
 <!-- .slide: class="sfeir-basic-slide" -->
 # Exemple de la commande rs.status()
 <img alt="h-950 center" src="assets/images/school/replication/rs-status.png" />