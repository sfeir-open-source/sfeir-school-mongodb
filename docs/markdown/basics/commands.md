<!-- .slide: class="with-code " -->
# Commandes basiques et utiles
<br><br>
<div>
  <h6 class="center"><strong>Mongod</strong></h6>
  <br><br>
  <strong>Permet de lancer MongoDB</strong>
</div>
<br><br>
```bash
mongod
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code" -->
# Commandes basiques et utiles
<br><br>
<div>
  <h6 class="center"><strong>Mongo</strong></h6>
  <br><br>
  <strong>Permet de se connecter à MongoDB, évidemment il faut déjà que MongoDB soit lancé pour se connecter</strong>
</div>
<br><br>
```bash
mongo
```
<!-- .element: class="big-code"-->
Notes:
Cette commande comporte des options, ces options permettent entre autre de se connecter à un cluster Mongo avec authentification
ou encore se connecter à un MongoDB qui n'est pas sur le port par défaut à savoir 27017

##==##

<!-- .slide: class="with-code" -->
# Commandes basiques et utiles
<br><br>
<div>
  <h6 class="center"><strong>MongoImport</strong></h6>
  <br><br>
  <span><strong>Permet d'importer des données dans une base de données</strong></span>
</div>
<br><br>
```bash 
mongoimport --db users --collection contacts --file contacts.json
```
<!-- .element: class="big-code" -->
Notes:
Cette commande permet d'importer dans le fichier contacts.json dans une collection nommée contacts et sera dans la base de données users.
Cette commande possède aussi une multitude d'options. Dans cette commande je n'ai mis que les options requises. Il y a d'autres options comme type, mode

##==##

<!-- .slide: class="with-code"-->
# Commandes basiques et utiles
<br><br>
<div>
  <h6 class="center"><strong>MongoExport</strong></h6>
  <br><br>
  <span><strong>Permet d'exporter des données dans un certains format(json, csv)</strong></span>
</div>
<br><br>
```bash
mongoexport --db test --collection traffic --out traffic.json
```
<!-- .element:  class="big-code"--->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Commandes basiques et utiles
<br><br>
<div>
  <h6 class="center"><strong>show dbs</strong></h6>
  <br><br>
  <span class="bold">Permet d'afficher toutes les bases de données disponibles</span>
</div>
<br><br>
```bash
show dbs
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Commandes basiques et utiles
<br><br>
<div>
  <h6 class="center bold"><strong>show collections</strong></h6>
  <br><br>
  <span class="bold">Permet d'afficher toutes les bases de données disponibles</span>
</div>
<br><br>
```bash
show collections
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="transition-white sfeir-bg-blue"-->
# Time to Demo

##==##

<!-- .slide: class="exercice sfeir-bg-pink"-->
## Exercice
<br>
<div class="center">
  <ul>
    <li>Lancer MongoDB en local</li>
    <li>Se connecter à MongoDB</li>
    <li>Réaliser l'import du fichier companies.json dans la base de données SfeirSchool, collection companies</li>
    <li>Exporter ce fichier fraîchement importé</li>
  </ul>
</div>
Notes: Les fichiers de mocks se trouvent dans le dossier assets à la racine du projet

##==##

<!-- .slide: class="transition-white sfeir-bg-blue"-->
# Live Correction

##==##

<!-- .slide: class="transition-white sfeir-bg-blue"-->
# Cas Concret & Q/A
