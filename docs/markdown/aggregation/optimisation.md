<!-- .slide-->
# L'optimisation
Parfois un enchaînement de stages peut être optimisé.
<!-- .element: class="full-center important" -->

##==##

<!-- .slide: class=" with-code" -->
# $project ou $addFields + $match
Contexte :
<!-- .element: class="bold" -->
<br/>

```bash
{ $addFields: {
    maxTime: { $max: "$times" },
    minTime: { $min: "$times" }
} },
{ $project: {
    _id: 1, name: 1, times: 1, maxTime: 1, minTime: 1,
    avgTime: { $avg: ["$maxTime", "$minTime"] }
} },

{ $match: {

    name: "Joe Schmoe",

    maxTime: { $lt: 20 },

    minTime: { $gt: 5 },

    avgTime: { $gt: 7 }

} }
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# $project ou $addFields + $match
Optimisation :
<!-- .element: class="bold" -->
<br/>

```bash
{ $match: { name: "Joe Schmoe" } },

{ $addFields: {
    maxTime: { $max: "$times" },
    minTime: { $min: "$times" }
} },

{ $match: { maxTime: { $lt: 20 }, minTime: { $gt: 5 } } },

{ $project: {
    _id: 1, name: 1, times: 1, maxTime: 1, minTime: 1,
    avgTime: { $avg: ["$maxTime", "$minTime"] }
} },

{ $match: { avgTime: { $gt: 7 } } }
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# $sort + $match
Contexte :
<!-- .element: class="bold" -->
```bash
{ $sort: { age : -1 } },
{ $match: { status: 'A' } }
```
<!-- .element: class="big-code" -->
<br/>

Optimisation
<!-- .element: class="bold" -->
```bash
{ $match: { status: 'A' } },
{ $sort: { age : -1 } }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# $project + $skip 
Contexte :
<!-- .element: class="bold" -->
```bash
{ $sort: { age : -1 } },
{ $project: { status: 1, name: 1 } },
{ $skip: 5 }
```
<!-- .element: class="big-code" -->
<br/>

Optimisation
<!-- .element: class="bold" -->
```bash
{ $sort: { age : -1 } },
{ $skip: 5 },
{ $project: { status: 1, name: 1 } }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# $limit + $limit
Contexte :
<!-- .element: class="bold" -->
```bash
{ $limit: 100 },
{ $limit: 10 }
```
<!-- .element: class="big-code" -->
<br/>

Optimisation
<!-- .element: class="bold" -->
```bash
{ $limit: 10 }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# $skip + $skip
Contexte :
<!-- .element: class="bold" -->
```bash
{ $skip: 5 },
{ $skip: 2 }
```
<!-- .element: class="big-code" -->
<br/>

Optimisation
<!-- .element: class="bold" -->
```bash
{ $skip: 7 }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# $match + $match 
Contexte :
<!-- .element: class="bold" -->
```bash
{ $match: { year: 2014 } },
{ $match: { status: "A" } }
```
<!-- .element: class="big-code" -->
<br/>

Optimisation
<!-- .element: class="bold" -->
```bash
{ $match: { $and: [ { "year" : 2014 }, { "status" : "A" } ] } }
```
<!-- .element: class="big-code" -->



