<!-- .slide: class="sfeir-basic-slide"-->
# Qu'est ce que l'aggregation
<br><br>
<div>
  <strong>Défintion: </strong>On peut associer une aggrégation à un ensemble d'étape ou chaque étape réalise une transformation sur les données qu'il reçoit en Input
</div
<br><br>
<div>
  <img class="aggregation_concept__pipeline" src="../assets/images/aggregation-pipeline.gif">
</div>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Les différents types d'aggrégation
<br><br>
<div>
<span><strong>Trois</strong> types:</span>
<ul>
  <li>Aggregation Pipeline => la plus commune</li>
  <br>
  <li>Map-Reduce function => peut commun</li>
  <br>
  <li>Single Purpose Aggregation Operations => count - distinct</li>
</ul>
</div>
<br>
Notes: 
 - Il est très rare de réaliser une aggrégation à l'aide d'une map reduce function c'est compliqué et par forcément simple à comprendre

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Des exemples concrets
<br><br>
<span class="bold">Aggregation Pipeline</span>
<br><br>
```bash
 db.orders.aggregate([{ $match: { status: "A" } }, { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }])
```
<!-- .element: class="big-code"-->
<br>
Notes: 
 - premier stage $match => match tous les documents qui ont le status A
 - second stage $group  => on regroupe par le champs $cust_id et on fais la somme total de leur prix
 
 ##==##
 
 <!-- .slide: class="sfeir-basic-slide"-->
 # Des exemples concrets
 <br><br>
 <span class="bold">Map-Reduce Function</span>
 <br><br>
 <div class="center">
  <img src="../assets/images/map-reduce.bakedsvg.svg"/>
 </div>
 
 ##==##
 
 <!-- .slide: class="sfeir-basic-slide"-->
 # Des exemples concrets
 <br><br>
 <span class="bold">Single Purpose Aggregation Operations</span>
 <br><br>
 <div class="center">
  <img src="../assets/images/distinct.bakedsvg.svg"/>
 </div>

  
