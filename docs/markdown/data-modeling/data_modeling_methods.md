<!-- .slide-->
# Schema Design Question
- Pour modéliser correctement ces données, <b>plusieurs</b> questions doivent être posées :<br/><br/>
    - Quelles données doivent être accessibles ?<br/><br/>
    - Quelle fréquence d'accessibilité ?<br/><br/>
    - Quelles données doivent être ensemble ?
Notes : On appelle cela établir un data access pattern.

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Les types de structures de document
- <b>Rappel :</b> Un document possède un schéma flexible<br/><br/><br/>
- 2 types de structures possibles :
    - Embedded Data => <b>Dénormalisation</b>
    - Référence => <b>Normalisation</b>
##==##

<!-- .slide-->
# Embedded Data ou la Dénormalisation
![full-center](assets/images/school/data-modeling/denormalization.svg)

##==##

<!-- .slide-->
# Avantages / Inconvénients
Avantages :
<br/>
<div class="flex-row">
  <div class="bold circle">Atomicité</div>
  <div class="bold circle">Lecture</div>
</div>
<br/><br/>
Inconvénients :
<br/>
<div class="flex-row">
  <div class="bold circle">Écriture</div>
  <div class="bold circle">Redondance<div>
</div>

##==##

<!-- .slide-->
# Référence ou la Normalisation
![full-center](assets/images/school/data-modeling/normalization.svg)

##==##

<!-- slide-->
# Avantages / Inconvénients

Avantages : 
<br/>
<div class="flex-row">
  <div class="bold circle">Écriture</div>
  <div class="bold circle">"Laconique"</div>
</div>
<br/>
Inconvénients :
<br/><br/>
<div class="flex-row">
  <div class="bold circle">Atomicité</div>
  <div class="bold circle">Lecture</div>
  <div class="bold circle">Incohérence</div>
</div>

##==##

<!-- .slide-->
# Mais comment faire sans contraintes ? 
- <b>Définition :</b> Comment garder ses données cohérentes ?<br/><br/>
- MongoDB, base de données NoSQL => pas de clé primaire<br/><br/><br/><br/>

Utiliser la dénormalisation
<!-- .element: class="bold center important" -->

##==##

<!-- .slide-->
# Mais comment faire sans transactions ?
- <b>Définition : </b>Dans le monde relationnel, les transactions nous offrent l'ACID <br/><br/>
- À partir de la version 4 de MongoDB, les transactions apparaissent, il reste tout de même préférable de ne pas les utiliser car c'est bien trop coûteux !<br/><br/><br/><br/>

Utiliser la dénormalisation + les opérations atomiques
<!-- .element: class="important bold center" -->
