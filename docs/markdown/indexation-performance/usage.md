<!-- .slide: class="with-code inconsolata"-->
# Quand sont utilisés les indexes pour les queries?
- Contexte
<!-- .element: class="bold" -->
```json
{ name: 1, age: 1, size: 1 }
```
<!-- .element: class="big-code" -->
<br>

- Règles d'utilisation:
<!-- .element: class="bold" -->
    - { name: 'Nicolas'} => <span class="important">utilise l'index</span><br><br>
    - { name: 'Nicolas', age: 26 } => <span class="important">utilise l'index</span><br><br>
    - { name: 'Nicolas', age: 26, size: 180 } => <span class="important">utilise l'index</span><br><br>
    - { age: 26, size: 180 } => <span class="important">n'utilise pas l'index</span>


##==##

<!-- .slide: class="with-code inconsolata"-->
# Quand sont utilisés les indexes pour trier (sort and index prefix)?
- Contexte
<!-- .element: class="bold" -->
```bash
{ name: 1, age: -1 }
```
<!-- .element: class="big-code" -->
<br>

- Règle d'utilisations
<!-- .element: class="bold" -->
    - ..sort({ name: 1 }) => <span class="important">utilise l'index</span><br><br>
    - ...sort({ name: 1, age: -1 }) => <span class="important">utilise l'index</span><br><br>
    - ...sort({ name: -1, age: 1 }) => <span class="important">utilise l'index</span><br><br>
Notes: Le reste des combinaisons ne marchera pas ! et n'utilisera pas l'index

##==##

<!-- .slide: class="with-code inconsolata"-->
# Quand sont utilisés les indexes pour trier (sort and Non-prefix Subset of an Index)?
- Contexte
<!-- .element: class="bold" -->
```json
{ a: 1, b: 1, c: 1, d: 1 }
```
<!-- .element: class="big-code" -->
<br>

- Règle d'utilisation
<!-- .element: class="bold" -->
    - db.data.find( { a: 5 } ).sort( { b: 1, c: 1 } ) => <span class="important">utilise l'index</span> <br><br>
    - db.data.find( { b: 3, a: 4 } ).sort( { c: 1 } ) => <span class="important">utilise l'index</span> <br><br>
    - db.data.find( { b: 3, a: 4 } ).sort( { c: 1 } ) => <span class="important">utilise l'index</span> <br><br>
Notes: 
- db.data.find( { a: { $gt: 2 }, b: 2 } ).sort( { c: 1 } ) n'utilise pas l'index pas de condition d'égalité sur a et b
- db.data.find( { c: 5 } ).sort( { c: 1 } )  n'utilise pas l'index pour les mêmes raisons que précédemment


