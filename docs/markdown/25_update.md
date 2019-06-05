<!-- .slide: class="transition-white sfeir-bg-blue"-->
# Modification

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# La modification
<br><br>
<div>
  <span> Une modification d'un document peut être de type:</span>
  <br><br>
  <ul>
    <li>Un <strong>remplacement</strong> du contenu du document (sauf la propriété _id)</li>
    <li>Une <strong>mise à jour</strong> du contenu du doucument (sauf la propriété _id)</li>
  </ul>
  <br><br>
  <span>Il existe plusieurs façons de modifier un document</span>
  <br><br>
  <ul>
    <li>Save</li>
    <li>FindAndModify</li>
    <li>Update</li>
  </ul>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# La méthode Save
<br><br>
<div>
  <strong> La méthode save consiste à remplacer un document existant si la propriété _id précisé dans le document de save existe</strong>
</div>
<br><br>
```bash
 db.products.save( { _id : 100, item : "juice" } )
```
<!-- .element: class="big-code"-->
<br><br>
Notes: 
Cette commande réalise une insertion de document si _id n'existe pas, revient donc à réaliser un update with the upsert option à true
Cette commande réalise un update de document si _id existe, revient également à réaliser un update with the upsert option à true

##==##

<!-- .slide: class="sfeir-basic-slide with code"-->
# La méthode findAndModify
<br><br>
<div>
  <strong> La métode findAndModify permet de modifier ou remplacer un document. Cette méthode permet également d'insérer un document<strong>
</div>
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
<br><br>
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with code"-->
# La méthode Update
<br><br>
<div>
  <strong>Métode la plus classique pour modifier ou remplacer un document</strong>
</div>
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
<br>
```bash
db.books.update(
   { item: "XYZ123" },
   {
     item: "XYZ123",
     stock: 10,
     info: { publisher: "2255", pages: 150 },
     tags: [ "baking", "cooking" ]
   }
)
```
<br><br>

##==##

<!-- .slide: class="sfeir-basic-slide-->
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
$set: remplace la valeur d'un champs par une valeur spécifié
$unset: supprime un champs d'un object
$rename: renomme un champs
$setOnInsert: insère un champs avec une valeur spécifié si la méthode update résulte à une insertion
$inc: incrémente une valeur d'un champs par la valeur spécifié
$mul: multiplie une valeur d'un champs par la valeur spécifié
$min: remplace la valeur d'un champs si et seulement si la valeur spécifié est plus petite que la valeur du champs
$max: remplace la valeur d'un champs si et seulement si la valeur spécifié est plus grande que la valeur du champs

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Quelques exemples
<br><br>
```bash
db.products.update({ _id: 100 },{ $set:{ quantity: 500, details: { model: "14Q3", make: "xyz" }, tags: ["coats", "outerwear", "clothing" ] } })
```
<br>
```bash
  db.products.update({ _id: 100}, { $unset: { quantity: "" } })
```
<br>
```bash
  db.products.updateMany({ }, { $rename: { "quantity": "total" } })
```
<br>
```bash
  db.products.update({ _id: 100 }, { $inc: { quantity: 1 } })
```
<br>

##==##
<!-- .slide: class="sfeir-basic-slide"-->
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
$addToSet: ajoute une valeur un tableau si et seulement si cette valeur n'existe pas
$pop: supprime la première ou la dernière valuer d'un tableau
$pull: supprime toutes les valeurs d'un tableau matchant une condition
$pullAll: surpprime toutes instance d'un valeurs matchant une liste de valeur
$push: ajoute une valeur dans un tableau

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Quelques exemples
<br><br>
```bash
db.inventory.update({ _id: 1 }, { $addToSet: { tags: "camera" } })
```
<br>
```bash
db.inventory.update({ _id: 1 }, { $pop: { tags: 1 } })
```
<br>
```bash
db.profiles.update( { _id: 1 }, { $pull: { votes: { $gte: 6 } } } )
```
<br>
```bash
db.survey.update( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )
```
<br>
```
db.students.update({ _id: 1 }, { $push: { quizzes: { $each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ], $sort: { score: 1 } } } })
```


