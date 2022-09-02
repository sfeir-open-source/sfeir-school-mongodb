<!-- .slide: class="with-code inconsolata"-->
# L'opérateur: $add
L'opérateur <b>$add</b> permet d'ajouter plusieurs nombr/es ensemble ou plusieurs nombr/es et une date entre eux.
```bash
{ $add: [ <expression1>, <expression2>, ... ] }
```
<!-- .element: class="big-code"-->
<br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.sales.aggregate([{ $project: { item: 1, billing_date: { $add: [ "$date", 3*24*60*60000 ] } } }])
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# L'opérateur: $addToSet
L'opérateur <b>$addToSet</b> ajoute dans un tableau une valeur si elle n'existe pas. Uniquement disponible dans le stage $group
```bash
{ $addToSet: <expression> }
```
<!-- .element: class="big-code" -->
<br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.sales.aggregate(
   [
     {
       $group:{ _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } }, itemsSold: { $addToSet: "$item" } }
     }
   ]
)
```
<!-- .element: class="medium-code" -->
##==##

<!-- .slide: class="with-code inconsolata"-->
# L'opérateur: $push
L'opérateur <b>$push</b> permet d'ajouter dans un tableau une valeur, disponible uniquement dans le stage $group
```bash
{ $push: <expression> }
```
<!-- .element: class="big-code" -->
<br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.sales.aggregate(
   [
     {
       $group: { _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } }, itemsSold: { $push:  { item: "$item", quantity: "$quantity" } }}
     }
   ]
)
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# L'opérateur: $avg
L'opérateur <b>$avg</b> permet de réaliser la moyenne de plusieurs valeurs
```bash
{ $avg: <expression> }
```
<!-- .element: class="big-code"-->
<br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.students.aggregate([
   {
     $project: {
       quizAvg: { $avg: "$quizzes"},
       labAvg: { $avg: "$labs" },
       examAvg: { $avg: [ "$final", "$midterm" ] }
     }
   }
])
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# L'opérateur: $sum
L'opérateur <b>$sum</b> permet de faire la somme de plusieurs valeurs
```bash
{ $sum: <expression> }
```
<!-- .element: class="big-code"-->
<br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.students.aggregate([
   {
     $project: {
       quizTotal: { $sum: "$quizzes"},
       labTotal: { $sum: "$labs" },
       examTotal: { $sum: [ "$final", "$midterm" ] }
     }
   }
])
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# L'opérateur $mulitply
L'opérateur <b>$mulitply</b> permet de multiplier des valeurs entre elles
```bash
{ $multiply: [ <expression1>, <expression2>, ... ] }
```
<!-- .element: class="big-code"-->
<br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.sales.aggregate(
   [
     { $project: { date: 1, item: 1, total: { $multiply: [ "$price", "$quantity" ] } } }
   ]
)
```
<!-- .element: class="big-code" -->


