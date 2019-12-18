<!-- .slide: class="sfeir-basic-slide"-->
# L'insertion
<br><br><br>
<div>Chaque document inséré possède la propriété <strong>_id</strong>. Celui-ci est de type <strong>ObjectId</strong> s'il n'est pas précisé</div>
<br><br>
<div>Il existe plusieurs façons d'insérer un document : </div>

- <strong>Insert</strong>
- <strong>Save</strong>
- <strong>FindAndModify<strong>
- <strong>Upsert</strong>

##==##

<!-- slide: class="transition-white sfeir-basic-slide"-->
# _id et ObjectId
<br><br><br>
<div>
  <ul>
    <li>La propriété _id est toujours la <strong>première</strong> propriété d'un document</li>
    <li>Il est <strong>unique</strong></li>
    <li>Peut-être de tout type <strong>sauf</strong> de type Array</li>
    <li><strong>Obligatoirement</strong> de type ObjectId s'il n'est pas précisé</li>
  </ul>
  <br><br>
  <div>Un ObjectId est codé sur <strong>12 bytes</strong> :</div>
  <ul>
    <li><strong>4 bytes</strong> : secondes depuis l'époque Unix</li>
    <li><strong>5 bytes</strong> : valeur aléatoire</li>
    <li><strong>3 bytes</strong> : compteur commençant par une valeur aléatoire</li>
  </ul>
</div>
Note: Il est quand même préférable de gérer son _id dans le code du serveur, c'est moins coûteux que de générer un objectId par la base de données.

##==##

<!-- .slide: class="sfeir-basic-slide with-code "-->
# La méthode Insert
<br><br>
```bash
db.collection.insert(document/tableau de document, options)
```
<!-- .element: class="big-code"-->
<br>
<div>
  <ul>
    <li>Crée une collection si elle n'existe pas</li>
    <li>Crée un _id s'il n'est pas précisé</li>
    <li>Pris en compte dans la nouvelle fonctionnalité transactionnelle</li>
  </ul>
</div>
<br>
```bash
db.products.insert(
   [
     { _id: 20, item: "lamp", qty: 50, type: "desk" },
     { _id: 21, item: "lamp", qty: 20, type: "floor" },
     { _id: 22, item: "bulk", qty: 100 }
   ],
   { ordered: false }
)
```
Notes: La méthode insert permet d'insérer des documents uniquement.
Il faut savoir que l'option ici est de type document et prend en compte deux propriétés: ordered et writeConcern
- La propriété ordered permet de gérer la façon d'insérer les documents. Si MongoDB insert dans l'ordre défini par le tableau, l'insertion s'arrête à la première erreur. A l'inverse si MongoDB n'insert pas dans l'ordre, il continuera d'insérer les documents suivant le document en erreur.
- La propriété writeConcern concerne plus particulièrement la réplication. Il s'agit juste du temps d'attente après l'écriture.

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# La méthode Save
<br><br>
```bash
db.collection.save(document, options)
```
<!-- .element: class="big-code"-->
<br>
<div>
  <ul>
    <li>Insère un document</li>
    <li>Remplace un document </li>
    <li>Crée une collection si elle n'existe pas</li>
    <li>Crée un _id s'il n'est pas précisé</li>
    <li>Pris en compte dans la nouvelle fonctionnalité transactionnelle</li>
  </ul>
</div>
<br>
```bash
db.products.save( { _id: 100, item: "water", qty: 30 } )
```
Notes: 
- Dans le cas d'insertion d'un document, les règles de la méthode insert s'appliquent. Création d'id et de collection s'il n'y a pas d'existence.
- Il faut que la collection existe pour se servir de la méthode save dans une transaction

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# La méthode Update (upsert)
<br><br>
```bash
db.collection.update(query, update, options)
```
<!-- .element: class="big-code"-->
<br>
<div>
  <ul>
    <li>Insère un document</li>
    <li>Modifie un document </li>
    <li>Crée une collection si elle n'existe pas</li>
    <li>Crée un _id s'il n'est pas précisé</li>
    <li>Pris en compte dans la nouvelle fonctionnalité transactionnelle</li>
  </ul>
</div>
<br>
```bash
db.books.update(
   { item: "ZZZ135" },
   { item: "ZZZ135", stock: 5, tags: [ "database" ] },
   { upsert: true })
```
Notes: Si upsert est vrai et qu'aucun document ne correspond aux critères de la requête, update () insère un seul document. La mise à jour crée le nouveau document avec:

- Les champs et les valeurs du paramètre "update" si le paramètre "update" est un document de remplacement (c'est-à-dire ne contient que des paires de champs et de valeurs). Si ni le document "query" ni le document "update" ne spécifient un champ _id, MongoDB ajoute le champ _id avec une valeur ObjectId.
- Les champs et les valeurs des paramètres "query" et "update" si le paramètre "update" contient des expressions d'opérateur de mise à jour. La mise à jour crée un document de base à partir des clauses d'égalité dans le paramètre "query", puis applique les expressions de mise à jour à partir du paramètre "update". Les opérations de comparaison de la requête ne seront pas incluses dans le nouveau document.

Si upsert est vrai et que certains documents correspondent aux critères de la requête, update () effectue une mise à jour.

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# La méthode findAndModify
<br><br>
```bash
db.collection.findAndModify(query, update, upsert: true);
```
<!-- .element: class="big-code"-->
<br>
<div>
  <ul>
    <li>Insère un document</li>
    <li>Modifie un document </li>
    <li>Crée une collection si elle n'existe pas</li>
    <li>Crée un _id s'il n'est pas précisé</li>
    <li>Pris en compte dans la nouvelle fonctionnalité transactionnelle</li>
  </ul>
</div>
<br>
```bash
db.people.findAndModify({
    query: { name: "Pascal", state: "active", rating: 25 },
    update: { $inc: { score: 1 } },
    upsert: true,
})
```
Notes: La méthode findAndModify permet de réaliser beaucoup plus de choses. En outre elle permet également de supprimer des documents, retourner le nouveau document créé.


Il existe également un paramètre sort qui permet d'avoir de la granularité sur le document à update par exemple quand la query match plusieurs documents.
