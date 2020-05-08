<!-- .slide: class="transition-bg-grey-2 underline"-->
# Modification

##==##

<!-- .slide-->
# La modification
<br>

- Une modification d'un document peut être de type
    - Un <b>remplacement</b> du contenu du document (sauf la propriété _id)
    - Une <b>mise à jour</b> du contenu du document (sauf la propriété _id)<br><br><br>
- Il existe plusieurs façons de modifier un document
    - Save
    - FindAndModify
    - Update

##==##

<!-- .slide: class="with-code inconsolata"-->
# La méthode Save
<br><br>
<b> La méthode save consiste à remplacer un document existant si la propriété _id précisée dans le document de save existe</b>
<br><br>

```bash
 db.products.save( { _id : 100, item : "juice" } )
```
<!-- .element: class="big-code"-->
<br><br>
Notes: 
- Cette commande réalise une insertion de document si _id n'existe pas, revient donc à réaliser un update with the upsert option à true
- Cette commande réalise un update de document si _id existe, revient également à réaliser un update with the upsert option à true

##==##

<!-- .slide: class="with-code inconsolata"-->
# La méthode findAndModify
<br><br>
<b> La métode findAndModify permet de modifier ou remplacer un document. Cette méthode permet également d'insérer un document</b>
<br><br>

```bash
db.people.findAndModify({
    query: { name: "Pascal", state: "active", rating: 25 },
    sort: { rating: 1 },
    update: { $inc: { score: 1 } },
    upsert: true,
    new: true
})
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# La méthode Update
<br><br>
<b>Méthode la plus classique pour modifier ou remplacer un document</b>
<br><br>
```bash
db.books.update(
   { _id: 1 },
   {
     $inc: { stock: 5 },
     $set: {
       item: "ABC123",
       "info.publisher": "2222",
       tags: [ "software" ],
       "ratings.1": { by: "xyz", rating: 3 }
     }
   }
)
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide-->
# Les opérateurs d'update sur champs simple
<br>
<div class="flex-row">
  <div class="circle bold">$set</div>
  <div class="circle bold">$unset</div>
  <div class="circle bold">$rename</div>
  <div class="circle bold">$setOnInsert</div>
</div>
<br><br>
<div class="flex-row">
  <div class="circle bold">$inc</div>
  <div class="circle bold">$mul</div>
  <div class="circle bold">$min</div>
  <div class="circle bold">$max</div>
</div>
<br><br>
Notes:
- $set : remplace la valeur d'un champs par une valeur spécifiée
- $unset : supprime un champs d'un object
- $rename : renomme un champs
- $setOnInsert : insère un champs avec une valeur spécifiée si la méthode update résulte à une insertion
- $inc : incrémente une valeur d'un champs par la valeur spécifiée
- $mul : multiplie une valeur d'un champs par la valeur spécifiée
- $min : remplace la valeur d'un champs si et seulement si la valeur spécifiée est plus petite que la valeur du champs
- $max : remplace la valeur d'un champs si et seulement si la valeur spécifiée est plus grande que la valeur du champs

##==##

<!-- .slide: class="with-code inconsolata"-->
# Quelques exemples
<br><br>

```bash
db.products.update({ _id: 100 },{ $set:{ quantity: 500, details: { model: "14Q3", make: "xyz" }, tags: ["coats", "outerwear", "clothing" ] } })
```
<!-- .element: class="big-code" -->
<br>

```bash
  db.products.update({ _id: 100}, { $unset: { quantity: "" } })
```
<!-- .element: class="big-code" -->
<br>

```bash
  db.products.updateMany({ }, { $rename: { "quantity": "total" } })
```
<!-- .element: class="big-code" -->
<br>

```bash
  db.products.update({ _id: 100 }, { $inc: { quantity: 1 } })
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide-->
# Les opérators d'update sur des tableaux
<br>
<div class="flex-row">
  <div class="circle bold">$addToSet</div>
  <div class="circle bold">$pop</div>
  <div class="circle bold">$pull</div>
  <div class="circle bold">$pullAll</div>
  <div class="circle bold">$push</div>
</div>
<br>
<div class="flex-row">
  <div class="circle bold">$each</div>
  <div class="circle bold">$slice</div>
  <div class="circle bold">$sort</div>
  <div class="circle bold">$postion</div>
  <div class="circle bold">$ / $[]</div>
</div>
<br>
Notes:
- $addToSet : ajoute une valeur à un tableau si et seulement si cette valeur n'existe pas
- $pop : supprime la première ou la dernière valeur d'un tableau
- $pull : supprime toutes les valeurs d'un tableau matchant une condition
- $pullAll : surpprime toutes instances d'une valeur matchant une liste de valeurs
- $push : ajoute une valeur dans un tableau

##==##

<!-- .slide: class="with-code inconsolata"-->
# Quelques exemples

```bash
db.inventory.update({ _id: 1 }, { $addToSet: { tags: "camera" } })
```
<!-- .element: class="big-code" -->
<br>

```bash
db.inventory.update({ _id: 1 }, { $pop: { tags: 1 } })
```
<!-- .element: class="big-code" -->
<br>

```bash
db.profiles.update( { _id: 1 }, { $pull: { votes: { $gte: 6 } } } )
```
<!-- .element: class="big-code" -->
<br>

```bash
db.survey.update( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )
```
<!-- .element: class="big-code" -->
<br>

```
db.students.update({ _id: 1 }, { $push: { quizzes: { $each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ], $sort: { score: 1 } } } })
```
<!-- .element: class="big-code" -->