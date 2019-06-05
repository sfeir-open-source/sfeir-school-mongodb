<!-- .slide: class="sfeir-basic-slide"-->
# Schema Design Question
<br><br>
<div>Pour modéliser correctement ces données, <strong>plusieurs<strong> questions doivent être posées</div>
<br>
<ul>
 <li> Quelles données doivent être accessible</li>
 <br> 
 <li> Quelle fréquence d'accessibilité</li>
 <br>
 <li>Quelles données doivent être ensemble</li>
<ul>
<br><br>
Note: On appelle ça établir un data access pattern

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Les types de structures de document
<br><br>
<div><strong>Rappel</strong> Un document possède un shema fléxible</div>
<br><br>
2 types de structures possibles
<br>
<ul>
  <li>Embedded Data => <strong>Dénormalization</strong></li>
  <br>
  <li>Référence => <strong>Normalization</strong></li>
<ul>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Enbedded Data où la Démormalization
<br><br>
<div class="full-center">
  <img src="../assets/images/Dénormalization.svg">
<div>
<br>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Avantages / Inconvénients
<br><br>
Avantages:
<br>
<div class="flex-row">
  <div class="bold circle">Atomic</div>
  <div class="bold circle">Read</div>
</div>
<br><br>
Inconvénients
<br>
<div class="flex-row">
  <div class="bold circle">Ecriture</div>
  <div class="bold circle">Redondance<div>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Référence où la Normalization
<br><br>
<div class="full-center">
  <img src="../assets/images/Normalization.svg">
</div>
<br><br>

##==##

<!-- slide: class="sfeir-basic-slide"-->
# Avantages / Inconvénients
<br>
Avantages: 
<br>
<div class="flex-row">
  <div class="bold circle">Ecriture</div>
  <div class="bold circle">"Laconique"</div>
</div>
<br><br>
Inconvénients:
<br><br>
<div class="flex-row">
  <div class="bold circle">Atomic</div>
  <div class="bold circle">Lecture</div>
  <div class="bold circle">Inconsistence</div>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Mais comment faire sans contraintes ? 
<br><br><br>
<div><strong>Définitions:</strong> Comment garder ses données consistentes ?</div>
<br><br>
<div>
  MongoDB, base de données NoSQL => pas de clé primaires
</div>
<br><br>
<div class="important bold center">Utiliser la dénormalization</div>
<br>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Mais comment faire sans transactions
<br><br><br>
<div><strong>Définition: </strong>
  Dans le monde relationel, les transactions nous offrent l' ACID
</div> 
<br><br>
<div> A partir de la version 4 de MongoDB, les transactions apparaissent, il reste tout de même préférable de ne pas l'utiliser bien trop couteux!!</div>
<br><br>
<div class="important bold center">Utiliser la dénormalization + les opérations atomics</div>
<br>
Notes: 
 - A: Atomicity
 - C: Consistence
 - I: Isolation
 - D: Durability