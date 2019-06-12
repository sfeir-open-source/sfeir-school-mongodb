<!-- .slide: class="sfeir-bg-pink exercice"-->
## Exercice
<br>
Dans la collection students
 - créer un index sur le champs de name
 - afficher tous les indexes disponibles sur cette collection
 - réaliser une covered queries
 - vérifier cette covered query à l'aide de la commande explain
 
##==##

<!-- .slide: class="sfeir-bg-pink exercice"-->
## Exercice
<br>
Soit la query suivante:
 
db.products.find({ in_stock: true, price: { $gt: 1, $lt: 5 } }).sort({ name: 1 })

Construisez un index permettant de réaliser une covered query

##==##

<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<br>
Soit l'index suivant

{"first_name": 1, "address.state": -1, "address.city": -1, "ssn": 1}

Dans le dossier assets/exercice/sort-queries situé à la racine, fichier sort_queries, quelles queries utilisent l'index ci-dessus?

##==##

<!-- .slide: class="sfeir-bg-pink exercice" -->
## Exercice
<br>
Dans le dossier assets/exercice/explain, fichier explain se trouve une explication de query.

A l'aide de cette explication, quel index correspond à ce résultat :
- { "address.state": 1, "name": 1, "stars": 1 }
- { "address.state": 1, "stars": 1, "name": 1 }
- { "address.state": 1, "name": 1 }
- { "address.state": 1 }

##==##
<!-- .slide: class="transition-white sfeir-bg-blue"-->
# Live Correction

##==##
<!-- .slide: class="transition-white sfeir-bg-blue"-->
# Cas Concret & Q/A
