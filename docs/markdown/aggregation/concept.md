<!-- .slide"-->
# Qu'est-ce que l'agrégation
<b>Définition :</b> On peut associer une agrégation à un ensemble d'étapes où chaque étape réalise une transformation sur les données qu'elle reçoit en entrée
<br/>

![h-700](assets/images/school/aggregation/aggregation-pipeline.gif)

##==##

<!-- .slide-->
# Les différents types d'agrégation
- <b>Trois</b> types :<br/><br/>
    - Aggregation Pipeline => la plus commune <br/><br/>
    - Map-Reduce function => peu commune <br/><br/>
    - Single Purpose Aggregation Operations => count - distinct
Notes : 
Il est très rare de réaliser une agrégation à l'aide d'une map reduce function, c'est compliqué et pas forcément simple à comprendre

##==##

<!-- .slide: class="with-code inconsolata"-->
# Des exemples concrets
Agrégation Pipeline
<!-- .element: class="bold" -->
<br/><br/>

```bash
 db.orders.aggregate([{ $match: { status: "A" } }, { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }])
```
<!-- .element: class="big-code"-->
Notes : 
- Premier stage $match => filtre tous les documents qui ont le statut A.
- Second stage $group => on regroupe par le champ $cust_id et on fait la somme totale de leur prix.

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
