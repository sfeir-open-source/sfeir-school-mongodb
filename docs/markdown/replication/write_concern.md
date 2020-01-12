<!-- .slide: class="sfeir-basic-slide' -->
# Write concern définition
<div class="full-center">
    <span>Le write concern concerne la statégie d'écriture sur une instance mongod seul ou sur un cluster partagé</span>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Write concern paramétrisation
<br><br>
<ul>
    <li><strong>w</strong>: l'écriture a été propagé au nombre d'instance mongod souhaité</li><br>
    <li><strong>j</strong>: l'écriture a été écrite sur le journal de l'instance mongod</li><br>
    <li><strong>wtimeout</strong>: Temps à ne pas dépasser pour l'opération d'écriture</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Write concern pour une unique istance mongod
<br>
<img alt="center h-800" src="assets/images/school/replication/write-concern-standalone.png"/>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Write concern pour une configuration de réplication
<br><br>
<span>Deux situation différents:</span><br><br>
<ul>
    <li>w: setter à majority</li><br>
    <li>w: setter à un nombre</li>
</ul> 

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# W setter à "majority"
<br>
<img alt="center h-800" src="assets/images/school/replication/write-concern-majority.png"/>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# W setter avec un nombre
<br>
<img alt="center h-800" src="assets/images/school/replication/write-concern-number.png"/>


