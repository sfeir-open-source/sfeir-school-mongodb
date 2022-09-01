<!-- .slide: class="with-code inconsolata" -->
# Commandes basiques et utiles

<b>Mongod</b>: permet de lancer une instance mongo
<br/><br/>

```bash
mongod -f path_to_config
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code incosolata" -->
# Commandes basiques et utiles
<b>Mongosh</b>: permet de lancer un client mongo
<br/><br/>

```bash
mongosh
```
<!-- .element: class="big-code" -->
Notes:
Cette commande comporte des options, ces options permettent entre autre de se connecter à un cluster Mongo avec authentification
ou encore se connecter à un MongoDB qui n'est pas sur le port par défaut à savoir 27017

##==##

<!-- .slide: class="with-code inconsolata" -->
# Commandes basiques et utiles

<b>MongoImport</b>: permet d'importer des données dans une base de données
<br/><br/>

```bash
mongoimport --db users --collection contacts --file contacts.json
```
<!-- .element: class="big-code" -->
Notes:
- Cette commande permet d'importer dans le fichier contacts.json dans une collection nommée contacts et sera dans la base de données users.
- Cette commande possède aussi une multitude d'options. Dans cette commande je n'ai mis que les options requises. Il y a d'autres options comme type, mode

##==##

<!-- .slide: class="with-code inconsolata"-->
# Commandes basiques et utiles

<b>MongoExport</b>: permet d'exporter des données dans un certains format(json, csv)
<br/><br/>

```bash
mongoexport --db traffic --collection traffic --out traffic.json
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Commandes basiques et utiles
<b>show</b>: permet d'afficher les bases de données ou collections disponibles
<br/><br/>

```bash
show dbs / collections
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="transition-bg-sfeir-2 blue"-->
# Time to Demo

##==##

<!-- .slide: class="exercice"-->
# Exercice 2
## Lab
<br>

- Lancer MongoDB en local<br><br>
- Se connecter à MongoDB<br><br>
- Réaliser l'import du fichier companies.json dans la base de données SfeirSchool, collection companies<br><br>
- Exporter ce fichier fraîchement importé<br><br>
Notes: Les fichiers de mocks se trouvent dans le dossier assets à la racine du projet

##==##

<!-- .slide: class="transition-bg-sfeir-3 blue"-->
# Live Correction

##==##

<!-- .slide: class="transition-bg-sfeir-2 blue"-->
# Cas Concret & Q/A
