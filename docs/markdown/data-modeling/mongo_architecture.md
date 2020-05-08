<!-- .slide-->
# Architecture
<br>

![](assets/images/school/data-modeling/architecture.png)

##==##

<!-- .slide-->
# Les différents Storage Engine
<br><br><br>
- <b>Wired Tiger</b><br><br>
- <b>In Memory</b><br><br>
- <b>MMAPv1</b>
Notes:
MMAPv1 storage engine est deprecated lors du passage à la version 4 de Mongo

##==##

<!-- .slide"-->
# Wired Tiger Storage Engine
<br><br>

- Storage Engine par <b>défaut</b><br><br>
- Document level concurrency<br><br>
- Compression of data and indexes<br><br>
- Aucune place allouée pour l'update<br><br>
- Supporté par MongoDB Enterprise => <b>Encrypted Storage Engine</b>
Notes: 
- Document level concurrency: système bloquant sur le document, deux personnes peuvent écrire sur deux documents différents de la collection mais pas sur le même document.
En cas de conflit, MongoDB réessaye l'opération en conflit en toute transparence.

##==##

<!-- .slide-->
# In Memory Storage Engine
<br><br>

- Uniquement disponible pour <b>MongoDB Enterprise</b><br><br>
- Document level concurreny<br><br>
- Ne persiste pas toutes les données (configuration, index, credentials, data)<br><br>
- <b>Aucun/Peu</b> de temps de latence pour les différentes opérations du crud

##==##

<!-- .slide-->
# MMAPv1 Storage Engine
<br><br>

- <b>Deprecated</b> à partir de la version 4 de MongoDB<br><br>
- Collection Level Locking<br><br>
- Place allouée pour les oprérations d'update<br><br>
- 2 size Feature
Notes: 
- Collection Level Locking: ne permet pas à deux personnes d'écrire dans la même collection au même moment
- 2 size feature: alloue le double de la taille du document
