<!-- .slide: class="sfeir-basic-slide"-->
# Architecture
<br><br>
<img src="../assets/images/architecture.png">

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Les différents Storage Engine
<br><br><br>
<ul>
  <li><strong> Wired Tiger</strong></li>
  <br>
  <li><strong> In Memory</strong></li>
  <br>
  <li><strong>MMAPv1</strong></li>
</ul>
Notes:
MMAPv1 storage engine est deprecated lors du passage à la version 4 de Mongo

##==##

<!-- .slide: class="sfeir--basic-slide"-->
# Wired Tiger Storage Engine
<br><br><br>
<ul>
  <li>Storage Engine par <strong>défaut</strong></li>
  <br>
  <li>Document level concurrency</li>
  <br>
  <li>Compression of data and indexes</li>
  <br>
  <li>Aucune place allouée pour l'update</li>
  <br>
  <li>Supporté par MongoDB Enterprise => <strong>Encrypted Storage Engine</strong></li>
</ul>
Note: 
- Document level concurrency: système bloquant sur le document, deux personnes peuvent écrire sur deux documents différents de la collection mais pas sur le même document.
En cas de conflit, MongoDB réessaye l'opération en conflit en toute transparence.

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# In Memory Storage Engine
<br><br><br>
<ul>
  <li>Uniquement disponible pour <strong>MongoDB Enterprise</strong></li>
  <br>
  <li>Document level concurreny</li>
  <br>
  <li>Ne persiste pas toutes les données (configuration, index, credentials, data)</li>
  <br>
  <li><strong>Aucun/Peu</strong> de temps de latence pour les différentes opérations du crud</li>
</ul>

##==##

<!-- .slide: class=""sfeir-basic-slide-->
# MMAPv1 Storage Engine
<br><br>
<ul>
  <li><strong>Deprecated</strong> à partir de la version 4 de MongoDB</li>
  <br>
  <li>Collection Level Locking</li>
  <br>
  <li>Place allouée pour les oprérations d'update</li>
  <br>
  <li>2 size Feature</li>
Note: 
- Collection Level Locking: ne permet pas à deux personnes d'écrire dans la même collection au même moment
- 2 size feature: alloue le double de la taille du document
