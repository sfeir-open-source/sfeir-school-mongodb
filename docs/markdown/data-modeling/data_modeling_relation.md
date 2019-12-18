<!-- .slide: class="sfeir-basic-slide"-->
# Les différents types de relations
<br><br><br>
<div>
  Il existe <strong>trois</strong> types de relations classiques entres les données:
</div>
<br>
<ul>
  <li>One to one</li>
  <br>
  <li>One to many</li>
  <br>
  <li>Many to Many</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# La relation One to One 
<br><br>
<div>
<strong>Exemple:</strong> Un patient et son historique médical
<div>
<br><br>
2 façons de modéliser ce type de relation: 
<br>
<ul>
  <li class="important">Dénormalization</li>
  <br>
  <li class="important">Normalization</li>
<ul>
<br>
Notes:
Chaque solution a ses avantages et inconvénients
- Dénormalization: On gagne de la performance en terme de lecture cependant un historique médical peut être conséquent on risque de dépasser la taille max d'un document 16MB
- Normalization: On gagne du temps en terme d'écriture et de lecture si l'on souhaite avoir plus souvant accès au patient qu'à son historique. Cependant
 on risque de créer de l'inconsistence de données (on peut supprimer ce risque en utilisant le true linking)

 ##==##

 <!-- .slide: class="sfeir-basic-slide with-code"-->
 # Exemple - context
 <br>
 Un patron et l'adresse de son restaurant: On suppose que le patron n'a qu'un seul restaurant
 <br><br>
```bash
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
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Exemple - solution
<br><br>
```bash
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
<!-- .element: class="big-code"-->
<br>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# La relation One to Many
<br><br><br>
<strong>Exemple:</strong> Une ville et ses habitants
<br><br>
1 seule façon de modéliser ce type de relation:
<ul>
  <li class="important">Normalization en utilisant le true linking</li>
</ul>
<br><br>
<div class="center">Et si l'on était dans une relation ou le Many se trouve être un few?</div>
<br>
Note: 
Le true linking consiste à réaliser une référence par _id qui est unique et surtout qui n'est pas sencée être modifiée => on supprime ici l'inconsistence ;)

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Exemple - context
<br><br>
Un patron et l'adresse de son restaurant: On suppose que le patron a plusieurs restaurants
<br><br>
```bash
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

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Exemple - solution
<br><br>
```bash
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

 ##==##

 <!-- .slide: class="sfeir-basic-slide with-code"-->
 # Exemple - context
<br><br>
Une maison de publication de livres
<br><br>
```bash
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
<br>

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Exemple - solution
<br><br>
```bash
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
<br>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# La relation Many to Many
<br><br>
<div><strong>Exemple: </strong> Professeurs et élèves: un professeur a plusieurs élèves et réciproquement</div>
<br><br>
<span>1 façon de modéliser ce type de relation:<span>
<br><br>
<ul>
  <li class="important">Normalization en utilisant le two way true linking </li>
</ul>
<br><br>
Note: 
Two way true linking consiste tout simplement à réaliser un tableau dans chaque document contenant les id relationnels

##==##

<!-- .slide: class="sfeir-basic-slide with code"-->
# Exemple - context
<br>
<span>Professeurs et élèves</span>
<br><br>
```bash
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

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Exemple - solution
<br><br>
```bash
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
