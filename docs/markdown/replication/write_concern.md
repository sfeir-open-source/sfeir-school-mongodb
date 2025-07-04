<!-- .slide -->
# Write concern - définition
Le write concern concerne la stratégie d'écriture sur une instance mongod seule ou sur un cluster partagé.
<!-- .element: class="full-center" -->


##==##

<!-- .slide -->
# Write concern - paramétrisation
- <b>w</b> : l'écriture a été propagée au nombre d'instances mongod souhaité <br/><br/>
- <b>j</b> : l'écriture a été écrite sur le journal de l'instance mongod <br/><br/>
- <b>wtimeout</b> : temps à ne pas dépasser pour l'opération d'écriture <br/><br/>


##==##

<!-- .slide -->
# Write concern pour une unique instance mongod
![center h-600](assets/images/school/replication/write-concern-standalone.png)

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Write concern pour une configuration de réplication
- Deux situations différentes : <br/><br/>
    - w : défini à majority <br/><br/>
    - w : défini avec un nombre


##==##

<!-- .slide-->
# W défini à "majority"
![center h-600](assets/images/school/replication/write-concern-majority.png)

##==##

<!-- .slide-->
# W défini avec un nombre
![center h-600](assets/images/school/replication/write-concern-number.png)


