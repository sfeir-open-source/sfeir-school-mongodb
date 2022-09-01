<!-- .slide" -->
# Qu'est ce réellement le NOSQL

- NOSQL signifie Not Only Structured Query Language<br><br>
- Pas de clé primaire <br><br>
- Pas de Table<br><br>
- Pas de Colonne<br><br><br><br>


Comment représenter donc facilement et lisiblement nos données ?
<!-- .element: class="center dark-pink" -->

##==##

<!-- .slide: class="two-column" -->

## Les documents

- Référencement possible
- Destructuration possible
- Format Objet (BSON)

##--##

## Exemple de documents
![](assets/images/school/basics/exemple_document.png)

##==##

<!-- .slide-->
# Le format Object BSON

BSON (Binary JavaScript Object Notation)
<!-- .element: class="bold center" -->

<br/><br/>

- Definition : BSON est une sérialisation codée en binaire de document de type JSON<br><br>
- Étend les types classiques JSON et en ajoute de nouveaux<br><br>
- Possède les propriétés suivantes
    - Lightweight
    <!-- .element: class="bold" -->
    - Traversable
    <!-- .element: class="bold" -->
    - Efficient
    <!-- .element: class="bold" -->

Notes: 
- BSON apporte son lot de nouveaux types. Pour ne citer que les plus célèbres: ObjectId; Timestamp; Decimal128 (utile pour les banques, permet d'avoir une précision extrèmement fine sur la valeur)
- Pourquoi ces propriétés ?
   - Lightweight: Le BSON est une sérialisation codée en binaire, par définition le binaire est léger. Propriété très avantageuse, rappelons que l'on peut mettre une base MongoDB dans le cloud. Le fait que le document soit LightWeight est très important dans ce cas de figure
   - Traversable: Lire un document BSON est très rapide, gain de performance lorsque l'on exécute une query
   - Efficient: Encoder et décoder des Datas BSON peuvent être réalisés très rapidement dans beaucoup de languages. Ce principe est fortement dû à l'utilisation du C data type

##==##

<!-- .slide -->
# Champs lexical de MongoDB

- <b>document</b> : un document représente une entité (exemple un utilisateur)<br><br>
- <b>collection</b> : une collection représente un ensemble d'entités.<br><br>
- <b>MongoDB</b> : Technologie regroupant un ensemble de bases de données de type Mongo
Notes: 
- Quand on parle de MongoDB, on fait souvent l'association MongoDB égal base de données. Cette association est complètement fausse. MongoDB est une technologie qui permet de stocker différentes bases de données NO SQL de type Mongo.
- Quand on lance MongoDB, on lance une sorte de container contenant plusieurs bases de données.
- Information importante: un document ne peut pas dépasser une taille de 16 Megabytes. Pourquoi? La réponse d'une query se stocke en Ram, cette limite est mise en place pour ne pas excéder la Ram avec un unique document

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Transcription SQL NOSQL
<br>

![center](assets/images/school/basics/sql_vs_nosql.png)

