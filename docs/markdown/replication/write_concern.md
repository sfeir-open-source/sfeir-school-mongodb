<!-- .slide -->
# Write concern définition
Le write concern concerne la stratégie d'écriture sur une instance mongod seul ou sur un cluster partagé
<!-- .element: class="full-center" -->


##==##

<!-- .slide -->
# Write concern paramétrisation
- <b>w</b>: l'écriture a été propagé au nombre d'instance mongod souhaité <br/><br/>
- <b>j</b>: l'écriture a été écrite sur le journal de l'instance mongod <br/><br/>
- <b>wtimeout</b>: Temps à ne pas dépasser pour l'opération d'écriture <br/><br/>


##==##

<!-- .slide -->
# Write concern pour une unique istance mongod
![center h-600](assets/images/school/replication/write-concern-standalone.png)

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Write concern pour une configuration de réplication
- Deux situation différents: <br/><br/>
    - w: setter à majority <br/><br/>
    - w: setter à un nombre


##==##

<!-- .slide-->
# W setter à "majority"
![center h-600](assets/images/school/replication/write-concern-majority.png)

##==##

<!-- .slide-->
# W setter avec un nombr/e
![center h-600](assets/images/school/replication/write-concern-number.png)


