<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $Match
<br><br>
<div>
  <span>Le stage <strong>$match</strong> permet de sélectionner tous les documents respectant une certaine condition.
</div>
<br>
```bash
{ $match: { <query> } }
```
<!-- .element: class="big-code"-->
<br><br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.articles.aggregate([ { $match : { author : "dave" } } ]);
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $project
<br><br>
<div>
  <span>Le stage <strong>$project</strong> permet d'inclure/exclure certains champs. Par défaut _id est toujours inclus.
</div>
<br>
```bash
{ $project: { <specification(s)> } }
```
<!-- .element: class="big-code"-->
<br></br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
````bash
db.books.aggregate( [ { $project : { title : 1 , author : 1 } } ] )
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $skip
<br><br>
<div>
  <span>Le stage <strong>$skip</strong> permet de passer un certain nombre de documents
</div>
<br>
```bash
{ $skip: <positive integer> }
```
<!-- .element: class="big-code"-->
<br><br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.article.aggregate({ $skip : 5 });
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $limit
<br><br>
<div>
  <span>Le stage <strong>$limit</strong> permet de limiter le nombre de documents de retour
</div>
<br>
```bash
{ $limit: <positive integer> }
```
<!-- .element: class="big-code"-->
<br><br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.article.aggregate({ $limit : 5 });
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $sort
<br><br>
<div>
  <span>Le stage <strong>$sort</strong> permet de réaliser un tri en fonction d'un ou plusieurs champs par ordre croissant ou décroissant
</div>
<br>
```bash
{ $sort: { <field1>: <sort order>, <field2>: <sort order> ... } }
```
<!-- .element: class="big-code"-->
<br><br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.users.aggregate([{ $sort : { age : -1, posts: 1 } }])
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $unwind
<br><br>
<div>
  <span>Le stage <strong>$unwind</strong> permet de destructurer un tableau et de réaliser un document pour chaque valeur de ce tableau
</div>
<br>
```bash
{ $unwind: { path: <field path>, includeArrayIndex: <string>, preserveNullAndEmptyArrays: <boolean> } }
```
<!-- .element: class="big-code"-->
<br><br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.inventory.aggregate( [ { $unwind : "$sizes" } ] )
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $group
<br><br>
<div>
  <span>Le stage <strong>$group</strong> permet de regrouper les documents par un certain champs</span>
</div>
<br>
```bash
{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }
```
<!-- .element: class="big-code"-->
<br><br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.books.aggregate([{ $group : { _id : "$author", books: { $push: "$title" } } }])
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $lookup
<br>
<div>
  <span>Le stage <strong>$lookup</strong> permet de réaliser une jointure sur deux collections différentes
<div>
```bash
{ $lookup: 
  {
    from: <collection to join>,
    localField: <field from the input documents>,
    foreignField: <field from the documents of the "from" collection>,
    as: <output array field>
  }
}
```
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.orders.aggregate([
   {
     $lookup:
       {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
])
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage $addFields
<br>
<div>
  <span>Le stage <strong>addFields</strong></span>
</div>
<br>
```bash
{ $addFields: { <newField>: <expression>, ... } }
```
<!-- .element: class="big-code"-->
<br>
<div>
  <span class="bold">Exemple</span>
</div>
<br>
```bash
db.scores.aggregate( [
   {
     $addFields: {
       totalHomework: { $sum: "$homework" } ,
       totalQuiz: { $sum: "$quiz" }
     }
   },
   {
     $addFields: { totalScore:
       { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
   }
] )
```






