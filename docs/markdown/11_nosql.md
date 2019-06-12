<!-- .slide: class="sfeir-basic-slide" -->
# Qu'est ce réellement le NOSQL
<br><br><br>
NOSQL signifie Not Only Structured Query Language
<br><br>
Ce qui implique :
<br><br>
- Pas de clé primaire
- Pas de Table
- Pas de Colonne
<br><br><br>
<div class="center">
  <span>Comment représenter donc facilement et lisiblement nos données ? </span>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Représentation de nos données
<br><br><br>
<div class="flex-row">
  <div>
    <h4>Les Documents</h4>
    <br><br>
    <ul>
      <li>Référencement possible</li>
      <li>Destructuration possible</li>
      <li>Format Objet (BSON)</li>
    </ul>
  </div>
  <div>
    <img src="../assets/images/exemple_document.png">
  </div>
</div>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Le format Object BSON
<br><br>
<div class="center">
  <span><strong>BSON (Binary JavaScript Object Notation)</strong><span>
</div>
<br><br>
- Definition : BSON est une sérialisation codée en binaire de document de type JSON
<br><br>
- Étend les types classiques JSON et en ajoute de nouveaux
<br><br>
- Possède les propriétés suivantes
 - <strong>Lightweight</strong>
 - <strong>Traversable</strong>
 - <strong>Efficient</strong>
Notes: 
- BSON apporte son lot de nouveaux types. Pour ne citer que les plus célèbres: ObjectId; Timestamp; Decimal128 (utile pour les banques, permet d'avoir une précision extrèmement fine sur la valeur)
- Pourquoi ces propriétés ?
   - Lightweight: Le BSON est une sérialisation codée en binaire, par définition le binaire est léger. Propriété très avantageuse, rappelons que l'on peut mettre une base MongoDB dans le cloud. Le fait que le document soit LightWeight est très important dans ce cas de figure
   - Traversable: Lire un document BSON est très rapide, gain de performance lorsque l'on exécute une query
   - Efficient: Encoder et décoder des Datas BSON peuvent être réalisés très rapidement dans beaucoup de languages. Ce principe est fortement dû à l'utilisation du C data type

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Champs lexical de MongoDB
<br><br><br>
- <strong>document</strong> : un document représente une entité (exemple un utilisateur)
<br><br>
- <strong>collection</strong> : une collection représente un ensemble d'entités.
<br><br>
- <strong>MongoDB</strong> : Technologie regroupant un ensemble de bases de données de type Msongo
<br><br>
Notes: 
- Quand on parle de MongoDB, on fait souvent l'association MongoDB égal base de données. Cette association est complètement fausse. MongoDB est une technologie qui permet de stocker différentes bases de données NO SQL de type Mongo.
- Quand on lance MongoDB, on lance une sorte de container contenant plusieurs bases de données.
- Information importante: un document ne peut pas dépasser une taille de 16 Megabytes. Pourquoi? La réponse d'une query se stocke en Ram, cette limite est mise en place pour ne pas excéder la Ram avec un unique document

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Transcription SQL NOSQL
<br>
<div class="center">
  <img src="../assets/images/sqlvnosql.png">
</div>
<br>
