<!-- .slide: class="sfeir-basic-slide with-code"-->
# L'optimisation
<div class="full-center important">Parfois un enchaînement de stage peut être optimisé</div>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# $project or $addFields + $match
<br>
<div>
  <span class="bold">Context</span>
</div>
<br>
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

##--##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# $project or $addFields + $match
<br>
<div>
  <span class="bold">Optimisation</span>
</div>
<br>
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

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# $sort + $match
<br>
<div>
  <span class="bold">Context</span>
<div>
<br>
```bash
{ $sort: { age : -1 } },
{ $match: { status: 'A' } }
```
<br>
<div>
  <span class="bold">Optimisation</span>
</div>
<br>
```bash
{ $match: { status: 'A' } },
{ $sort: { age : -1 } }
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# $project + $skip 
<br>
<div>
  <span class="bold">Context</span>
</div>
<br>
```bash
{ $sort: { age : -1 } },
{ $project: { status: 1, name: 1 } },
{ $skip: 5 }
```
<br>
<div>
  <span class="bold">Optimisation</span>
</div>
<br>
```bash
{ $sort: { age : -1 } },
{ $skip: 5 },
{ $project: { status: 1, name: 1 } }
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# $limit + $limit
<br>
<div>
  <span class="bold">Context</span>
</div>
<br>
```bash
{ $limit: 100 },
{ $limit: 10 }
```
<br>
<div>
  <span class="bold">Optimisation</span>
</div>
<br>
```bash
{ $limit: 10 }
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# $skip + $skip
<br>
<div>
  <span class="bold">Context</span>
</div>
<br>
```bash
{ $skip: 5 },
{ $skip: 2 }
```
<br>
<div>
  <span class="bold">Optimisation</span>
</div>
<br>
```bash
{ $skip: 7 }
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# $match + $match 
<br>
<div>
  <span class="bold">Context</span>
</div>
<br>
```bash
{ $match: { year: 2014 } },
{ $match: { status: "A" } }
```
<br>
<div>
  <span class="bold">Optimisation</span>
</div>
<br>
```bash
{ $match: { $and: [ { "year" : 2014 }, { "status" : "A" } ] } }
```



