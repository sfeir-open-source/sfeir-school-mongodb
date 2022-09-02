<!-- .slide: class="sfeir-basic-slide"-->
# L'insertion
- Chaque document inséré possède la propriété <b>_id</b>. Celui-ci est de type <b>ObjectId</b> s'il n'est pas précisé
<br/><br/>

- Il existe plusieurs façons d'insérer un document :
    - insertOne / insertMany
    <!-- .element: class="bold" -->
    - findAndModify / findOneAndUpdate / findOneAndReplace
    <!-- .element: class="bold" -->
    - updateOne / updateMany
    <!-- .element: class="bold" -->

##==##

<!-- slide: class="transition-white sfeir-basic-slide"-->
# _id et ObjectID

- La propriété _id
    - première propriété d'un document
    - unique
    - obligatoirement de types <b>ObjectId</b> s'il n'est pas précisé

<br/><br/>

- Un ObjectId est codé sur 12 bytes
    - <b>4 bytes</b>: secondes depuis l'époque Unix
    - <b>5 bytes</b>: valeur aléatoire
    - <b>3 bytes</b>: compteur commençant par une valeur aléatoire
Notes: Il est quand même préférable de gérer son _id dans le code du serveur, c'est moins coûteux que de générer un objectId par la base de données.

##==##

<!-- .slide: class="with-code inconsolata"-->
# La méthode insertMany
```bash
db.collection.insertMany(tableau de document, options)
```
<!-- .element: class="big-code"-->
<br>

- Crée une collection si elle n'existe pas
- Crée un _id s'il n'est pas précisé
- Prise en compte dans la nouvelle fonctionnalité transactionnelle
<br><br>

```bash
db.products.insertMany(
   [
     { _id: 20, item: "lamp", qty: 50, type: "desk" },
     { _id: 21, item: "lamp", qty: 20, type: "floor" },
     { _id: 22, item: "bulk", qty: 100 }
   ],
   { ordered: false }
)
```
<!-- .element: class="medium-code"-->
Notes: La méthode insert permet d'insérer des documents uniquement.
Il faut savoir que l'option ici est de type document et prend en compte deux propriétés: ordered et writeConcern
- La propriété ordered permet de gérer la façon d'insérer les documents. Si MongoDB insert dans l'ordre défini par le tableau, l'insertion s'arrête à la première erreur. A l'inverse si MongoDB n'insert pas dans l'ordre, il continuera d'insérer les documents suivant le document en erreur.
- La propriété writeConcern concerne plus particulièrement la réplication. Il s'agit juste du temps d'attente après l'écriture.

##==##


<!-- .slide: class="with-code inconsolata"-->
# La méthode updateMany / updateOne (upsert)
```bash
db.collection.updateOne(query, update, options)
```
<!-- .element: class="big-code"-->
<br>

- Insère un/plusieurs document(s)
- Modifie un/plusieurs document(s)
- Crée une collection si elle n'existe pas
- Crée un _id s'il n'est pas précisé
- Pris en compte dans la nouvelle fonctionnalité transactionnelle
<br><br>

```bash
db.books.update(
   { item: "ZZZ135" },
   { item: "ZZZ135", stock: 5, tags: [ "database" ] },
   { upsert: true })
```
<!-- .element: class="medium-code"-->
Notes: Si upsert est vrai et qu'aucun document ne correspond aux critères de la requête, update () insère un seul document. La mise à jour crée le nouveau document avec:
- Les champs et les valeurs du paramètre "update" si le paramètre "update" est un document de remplacement (c'est-à-dire ne contient que des paires de champs et de valeurs). Si ni le document "query" ni le document "update" ne spécifient un champ _id, MongoDB ajoute le champ _id avec une valeur ObjectId.
- Les champs et les valeurs des paramètres "query" et "update" si le paramètre "update" contient des expressions d'opérateur de mise à jour. La mise à jour crée un document de base à partir des clauses d'égalité dans le paramètre "query", puis applique les expressions de mise à jour à partir du paramètre "update". Les opérations de comparaison de la requête ne seront pas incluses dans le nouveau document.

Si upsert est vrai et que certains documents correspondent aux critères de la requête, update () effectue une mise à jour.

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# La méthode findAndModify
```bash
db.collection.findAndModify(query, update, upsert: true);
```
<!-- .element: class="big-code"-->
<br>

- Insère un document
- Modifie un/plusieurs document(s)
- Crée une collection si elle n'existe pas
- Crée un _id s'il n'est pas précisé
- Pris en compte dans la nouvelle fonctionnalité transactionnelle
<br><br>

```bash
db.people.findAndModify({
    query: { name: "Pascal", state: "active", rating: 25 },
    update: { $inc: { score: 1 } },
    upsert: true,
})
```
<!-- .element: class="medium-code"-->
Notes: La méthode findAndModify permet de réaliser beaucoup plus de choses. En outre elle permet également de supprimer des documents, retourner le nouveau document créé.
Il existe également un paramètre sort qui permet d'avoir de la granularité sur le document à update par exemple quand la query match plusieurs documents.

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->

# La méthode findOneAndReplace
```bash
db.collection.findOneAndReplace(query, update, upsert: true);
```
<!-- .element: class="big-code"-->
<br>

- Insère un document
- Modifie un document
- Crée une collection si elle n'existe pas
- Crée un _id s'il n'est pas précisé
- Pris en compte dans la nouvelle fonctionnalité transactionnelle
<br><br>

```bash
db.people.findOneAndReplace({
    query: { name: "Pascal", state: "active", rating: 25 },
    update: { score: 1 },
    upsert: true,
})
```
<!-- .element: class="medium-code"-->
