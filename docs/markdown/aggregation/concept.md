<!-- .slide"-->
# Qu'est ce que l'aggrégation
<b>Définition:</b>On peut associer une aggrégation à un ensemble d'étapes où chaque étape réalise une transformation sur les données qu'elle reçoit en Input
<br/>

![h-700](assets/images/school/aggregation/aggregation-pipeline.gif)

##==##

<!-- .slide-->
# Les différents types d'aggrégation
- <b>Trois</b> types<br/><br/>
    - Aggregation Pipeline => la plus commune <br/><br/>
    - Map-Reduce function => peu commun <br/><br/>
    - Single Purpose Aggregation Operations => count - distinct
Notes: 
Il est très rare de réaliser une aggrégation à l'aide d'une map reduce function c'est compliqué et par forcément simple à comprendre

##==##

<!-- .slide: class="with-code inconsolata"-->
# Des exemples concrets
Aggrégation Pipeline
<!-- .element: class="bold" -->
<br/><br/>

```bash
 db.orders.aggregate([{ $match: { status: "A" } }, { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }])
```
<!-- .element: class="big-code"-->
Notes: 
- premier stage $match => match tous les documents qui ont le statut A
- second stage $group  => on regroupe par le champs $cust_id et on fait la somme totale de leur prix
 
 ##==##
 
 <!-- .slide-->
 # Des exemples concrets

Map-Reduce Function
<!-- .element: class="bold" -->
<br/>

 ![center](assets/images/school/aggregation/map-reduce.svg)
 
 ##==##
 
 <!-- .slide"-->
 # Des exemples concrets
 
Single Purpose Aggregation Operations
<!-- .element: class="bold" -->
 <br/>

 ![center](assets/images/school/aggregation/distinct.svg)


  
