<!-- .slide: class="sfeir-basic-slide with-code"-->
# Quand sont utilisés les indexes pour les queries
<br>
<span>Context</span>
<br>
```bash
{ name: 1, age: 1, size: 1 }
```
<br>
<span>Règles d'utilisation</span>
<ul>
  <li>{ name: 'Nicolas'} => <span class="important">utilise l'index<span></li>
  <br>
  <li>{ name: 'Nicolas', age: 26 } => <span class="important">utilise l'index</span></li>
  <br>
  <li>{ name: 'Nicolas', age: 26, size: 180 } => <span class="important">utilise l'index</span></li>
  <br>
  <li>{ age: 26, size: 180 } => <span class="important">n'utilise pas l'index</span></li>
  <br>
</ul>
<br>

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Quand sont utilisés les indexes pour trier (sort and index prefix)
<br>
<span>Context</span>
<br>
```bash
{ name: 1, age: -1 }
```
<br>
<span>Règle d'utilisations</span>
<ul>
  <li>...sort({ name: 1 }) => <span class="important">utilise l'index</span></li>
  <br>
  <li>...sort({ name: 1, age: -1 }) => <span class="important">utilise l'index</span></li>
  <br>
  <li>...sort({ name: -1, age: 1 }) => <span class="important">utilise l'index</span></li>
</ul>
<br>
Notes: Le reste des combinaison ne marchera pas ! et n'utilisera pas l'index

##==##

<!-- .slide: class="sfeir-basic-slide with code"-->
# Quand sont utilisés les indexes pour trier (sort and Non-prefix Subset of an Index)
<br>
<span>Context</span>
<br>
```bash
{ a: 1, b: 1, c: 1, d: 1 }
```
<br>
<span>Règle d'utilisation</span>
<ul>
  <li>db.data.find( { a: 5 } ).sort( { b: 1, c: 1 } ) => <span class="important">utilise l'index</span></li>
  <br>
  <li>db.data.find( { b: 3, a: 4 } ).sort( { c: 1 } ) => <span class="important">utilise l'index</span></li>
  <br>
  <li>db.data.find( { b: 3, a: 4 } ).sort( { c: 1 } ) => <span class="important">utilise l'index</span></li>
<ul>
Notes: 
 - db.data.find( { a: { $gt: 2 }, b: 2 } ).sort( { c: 1 } ) n'utilise pas l'index pas de condition d'égalité sur a et b
 - db.data.find( { c: 5 } ).sort( { c: 1 } )  n'utilise pas l'index pour les mêmes raisons que précedemment


