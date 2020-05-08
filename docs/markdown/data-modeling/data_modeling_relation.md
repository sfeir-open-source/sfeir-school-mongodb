<!-- .slide-->
# Les différents types de relations
<br><br><br>
- Il existe <b>trois</b> types de relations classiques entres les données:
    - One to one
    - one to many
    - many to many

##==##

<!-- .slide-->
# La relation One to One 
<br><br>
- <b>Exemple:</b> Un patient et son historique médical
<br><br>

- 2 façons de modéliser ce type de relation:
    - Dénormalization
    <!-- .element: class="important" -->
    - Normalization
    <!-- .element: class="important" -->
Notes:
Chaque solution a ses avantages et inconvénients
- Dénormalization: On gagne de la performance en terme de lecture cependant un historique médical peut être conséquent on risque de dépasser la taille max d'un document 16MB
- Normalization: On gagne du temps en terme d'écriture et de lecture si l'on souhaite avoir plus souvant accès au patient qu'à son historique. Cependant
 on risque de créer de l'inconsistence de données (on peut supprimer ce risque en utilisant le true linking)

 ##==##

 <!-- .slide: class="with-code inconsolata"-->
 # Exemple - context
 <br>
 Un patron et l'adresse de son restaurant: On suppose que le patron n'a qu'un seul restaurant
 <br><br>

```json
{
   _id: "joe",
   name: "Joe Bookreader"
}

{
   patron_id: "joe",
   street: "123 Fake Street",
   city: "Faketon",
   state: "MA",
   zip: "12345"
}
```
<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Exemple - solution
<br><br>

```json
{
   _id: "joe",
   name: "Joe Bookreader",
   address: {
              street: "123 Fake Street",
              city: "Faketon",
              state: "MA",
              zip: "12345"
            }
}
```
<!-- .element: class="medium-code"-->
<br>

##==##

<!-- .slide -->
# La relation One to Many
<br><br>
- <b>Exemple:</b> Une ville et ses habitants
<br><br>

- 1 seule façon de modéliser ce type de relation:
    - Normalization en utilisant le true linking <br><br>
    <!-- .element: class="important" -->
- Et si l'on était dans une relation ou le Many se trouve être un few?
<!-- .element: class="bold" -->
Notes: 
Le true linking consiste à réaliser une référence par _id qui est unique et surtout qui n'est pas sencée être modifiée => on supprime ici l'inconsistence ;)

##==##

<!-- .slide: class="with-code inconsolata"-->
# Exemple - context

- Un patron et l'adresse de son restaurant: On suppose que le patron a plusieurs restaurants
<br><br>

```json
{
   _id: "joe",
   name: "Joe Bookreader"
}

{
   patron_id: "joe",
   street: "123 Fake Street",
   city: "Faketon",
   state: "MA",
   zip: "12345"
}

{
   patron_id: "joe",
   street: "1 Some Other Street",
   city: "Boston",
   state: "MA",
   zip: "12345"
}
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Exemple - solution
<br><br>

```json
{
   _id: "joe",
   name: "Joe Bookreader",
   addresses: [
                {
                  street: "123 Fake Street",
                  city: "Faketon",
                  state: "MA",
                  zip: "12345"
                },
                {
                  street: "1 Some Other Street",
                  city: "Boston",
                  state: "MA",
                  zip: "12345"
                }
              ]
 }
 ```
 <!-- .element: class="medium-code" -->

 ##==##

 <!-- .slide: class="with-code inconsolata"-->
 # Exemple - context
- Une maison de publication de livres
<br><br>

```json
{
  name: "O'Reilly Media",
  founded: 1980,
  location: "CA",
}
{
  title: "MongoDB: The Definitive Guide",
  author: [ "Kristina Chodorow", "Mike Dirolf" ],
  published_date: ISODate("2010-09-24"),
  pages: 216,
  language: "English",
}
{
  title: "50 Tips and Tricks for MongoDB Developer",
  author: "Kristina Chodorow",
  published_date: ISODate("2011-05-06"),
  pages: 68,
  language: "English",
}
```
<!-- .element: class="medium-code" -->
<br>

##==##

<!-- .slide: class="with-code inconsolata"-->
# Exemple - solution
<br>

```json
{
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",

   publisher_id: "oreilly"

}

{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",

   publisher_id: "oreilly"

}
```
<!-- .element: class="medium-code" -->
<br>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# La relation Many to Many
<br><br>
- <b>Exemple: </b> Professeurs et élèves: un professeur a plusieurs élèves et réciproquement <br><br>
- 1 façon de modéliser ce type de relation:
    - Normalization en utilisant le two way true linking 
    <!-- .element: class="important" -->
Notes: 
Two way true linking consiste tout simplement à réaliser un tableau dans chaque document contenant les id relationnels

##==##

<!-- .slide: class="with-code inconsolata"-->
# Exemple - context
<br>

```json
{
  id: '1',
  name: 'Nicolas',
  job: 'strudent'
}
{
  id: '2',
  name: 'Renaud',
  job: 'student'
}
{
  id: '11',
  name: 'Groche',
  job: 'Teacher'
}
{
  id: '12',
  name: 'Volpy',
  job: 'Teacher'
}
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Exemple - solution
<br>

```json
{
  id: '1',
  name: 'Nicolas',
  job: 'strudent'
  teachers: [11, 12]
}
{
  id: '2',
  name: 'Renaud',
  job: 'student'
  teachers: [11, 12]
}
{
  id: '11',
  name: 'Groche',
  job: 'Teacher'
  students: [1,2]
}
{
  id: '12',
  name: 'Volpy',
  job: 'Teacher'
  students: [1,2]
}
```
<!-- .element: class="medium-code" -->
