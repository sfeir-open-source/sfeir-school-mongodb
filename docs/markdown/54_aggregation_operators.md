<!-- .slide: class="sfeir-basic-slide with-code"-->
# L'opérateur $add
<br><br>
<div>
  <span>L'opérateur <strong>$add</strong> permet d'ajouter plusieurs nombres ensemble ou plusieurs nombres et une date entre eux.
</div>
<br>
```bash
{ $add: [ <expression1>, <expression2>, ... ] }
```
<!-- .element: class="big-code"-->
<br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.sales.aggregate([{ $project: { item: 1, billing_date: { $add: [ "$date", 3*24*60*60000 ] } } }])
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# L'opérateur $addToSet
<br>
<div>
  <span>L'opérateur <strong>$addToSet</strong> ajoute dans un tableau une valeur si elle n'existe pas. Uniquement disponible dans le stage $group
</div>
<br>
```bash
{ $addToSet: <expression> }
```
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.sales.aggregate(
   [
     {
       $group:
         {
           _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           itemsSold: { $addToSet: "$item" }
         }
     }
   ]
)
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# L'opérateur $push
<br>
<div>
  <span>L'opérateur <strong>$push</strong> permet d'ajouter dans un tableau une valeur, disponible uniquement dans le stage $group</span>
</div>
<br>
```bash
{ $push: <expression> }
```
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.sales.aggregate(
   [
     {
       $group:
         {
           _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           itemsSold: { $push:  { item: "$item", quantity: "$quantity" } }
         }
     }
   ]
)
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# L'opérateur $avg
<br>
<div>
  <span>L'opérateur <strong>$avg</strong> permet de réaliser la moyenne de plusieurs valeurs</span>
</div>
<br>
```bash
{ $avg: <expression> }
```
<!-- .element: class="big-code"-->
<br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
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

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# L'opérateur $sum
<br>
<div>
  <span>L'opérateur <strong>$sum</strong> permet de faire la somme de plusieurs valeurs</span>
</div>
<br>
```bash
{ $sum: <expression> }
```
<!-- .element: class="big-code"-->
<br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
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

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# L'opérateur $mulitply
<br>
<div>
  <span>L'opérateur <strong>$mulitply</strong> permet de multiplier des valeurs entre elles
</div>
<br>
```bash
{ $multiply: [ <expression1>, <expression2>, ... ] }
```
<!-- .element: class="big-code"-->
<br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.sales.aggregate(
   [
     { $project: { date: 1, item: 1, total: { $multiply: [ "$price", "$quantity" ] } } }
   ]
)
```


