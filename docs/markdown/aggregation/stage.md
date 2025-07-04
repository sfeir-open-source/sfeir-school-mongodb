<!-- .slide: class="with-code incosolata"-->
# Stage : $Match
Le stage <b>$match</b> permet de sélectionner tous les documents respectant une certaine condition.
<br/>

```bash
{ $match: { <query> } }
```
<!-- .element: class="big-code"-->
<br/><br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.articles.aggregate([ { $match : { author : "dave" } } ]);
```
<!-- .element: class="big-code"-->


##==##

<!-- .slide: class="with-code inconsolata"-->
# Stage : $project
Le stage <b>$project</b> permet d'inclure/exclure certains champs. Par défaut _id est toujours inclus.
```bash
{ $project: { <specification(s)> } }
```
<!-- .element: class="big-code"-->
<br/><br/> 

Exemple
<!-- .element: class="bold" -->
```bash
db.books.aggregate( [ { $project : { title : 1 , author : 1 } } ] )
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Stage : $skip
Le stage <b>$skip</b> permet de passer un certain nombre de documents.
```bash
{ $skip: <positive integer> }
```
<!-- .element: class="big-code"-->
<br/><br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.article.aggregate({ $skip : 5 });
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Stage : $limit
Le stage <b>$limit</b> permet de limiter le nombre de documents de retour.
```bash
{ $limit: <positive integer> }
```
<!-- .element: class="big-code"-->
<br/><br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.article.aggregate({ $limit : 5 });
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Stage : $sort
Le stage <b>$sort</b> permet de réaliser un tri en fonction d'un ou plusieurs champs par ordre croissant ou décroissant.
```bash
{ $sort: { <field1>: <sort order>, <field2>: <sort order> ... } }
```
<!-- .element: class="big-code"-->
<br/><br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.users.aggregate([{ $sort : { age : -1, posts: 1 } }])
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Stage : $unwind
Le stage <b>$unwind</b> permet de destructurer un tableau et de réaliser un document pour chaque valeur de ce tableau.
```bash
{ $unwind: { path: <field path>, includeArrayIndex: <string>, preserveNullAndEmptyArrays: <boolean> } }
```
<!-- .element: class="big-code"-->
<br/><br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.inventory.aggregate( [ { $unwind : "$sizes" } ] )
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Stage : $group
Le stage <b>$group</b> permet de regrouper les documents par un certain champ.
```bash
{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }
```
<!-- .element: class="big-code"-->
<br/><br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.books.aggregate([{ $group : { _id : "$author", books: { $push: "$title" } } }])
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Stage : $lookup
Le stage <b>$lookup</b> permet de réaliser une jointure sur deux collections différentes.
```bash
{ $lookup: {
    from: <collection to join>,
    localField: <field from the input documents>,
    foreignField: <field from the documents of the "from" collection>,
    as: <output array field>
  }
}
```
<!-- .element: class="medium-code" -->
<br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.orders.aggregate([
   {
     $lookup:{ from: "inventory", localField: "item", foreignField: "sku", as: "inventory_docs"}
  }
])
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Stage : $addFields
Le stage <b>$addFields</b> permet d'ajouter de nouveaux champs aux documents.
```bash
{ $addFields: { <newField>: <expression>, ... } }
```
<!-- .element: class="medium-code"-->
<br/>

Exemple
<!-- .element: class="bold" -->
```bash
db.scores.aggregate( [
   {
     $addFields: { totalHomework: { $sum: "$homework" } , totalQuiz: { $sum: "$quiz" } }
   },
   {
     $addFields: { totalScore:
       { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
   }
] )
```
<!-- .element: class="medium-code" -->
