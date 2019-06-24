<!-- .slide: class="sfeir-basic-slide"-->
# Qu'est ce qu'un index
<br><br>
Un index est une structure de données utilisée et entretenue par le système
<br><br>
<span>Il permet: </span>
<ul>
  <li>Eviter un scan de collection</li>
  <br>
  <li>Localiser plus rapidemment les documents</li>
  <br>
  <li>Améliorer la performance</li>
<ul>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Comment se matérialise un index dans MongoDB
<br><br><br>
<div class="full-center">
  <img src="../assets/images/index-for-sort.bakedsvg.svg" class="index-concept__structure-index">
</div>
<br>
Note: 
 Ici on peut observer comment MongoDB organise son indexation, il crée des "documents" ne possédant que le champs indexé et sa valeur.
 Si dans notre query (qu'elle soit de type range, égalitaire ou juste trie) on ne spécifie pas l'index alors, MongoDB réalisera une résolution de query par collection scan (scan de tous les documents de la collection)

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Les différents types d'index
<br><br>
<span>Il existe plusieurs types d'index qui sont : </span>
<br>
<ul>
  <li>Single field index</li>
  <br>
  <li>Compound index</li>
  <br>
  <li>Multikey index</li>
  <br>
  <li>Text index</li>
  <br>
  <li>Geospatial index</li>
  <br>
  <li>Hashed index</li>
</ul>
<br>
Note: 
Pour l'index de types géospacial, il y a deux types d'index => 2d et 2sphère

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Les propriétés des indexes
<br><br>
<span>Les indexes peuvent posséder également des propriétés:</span>
<br><br>
<ul>
  <li>Partial</li>
  <br>
  <li>Unique</li>
  <br>
  <li>Sparse</li>
  <br>
  <li>TTL</li>
</ul>
<br>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Un index déjà créé
<br><br>
<div class="full-center">
  <label>MongoDB crée déjà un index lorsqu'il crée une collection</label>
  <br>
  <label>Quel est-il ?</label>
</div>
<br>
Note: Solution _id puisque ce champs est obligatoire et doit être unique!!!
