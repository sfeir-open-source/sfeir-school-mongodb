<!-- .slide -->
# Les avantages de MongoDB
<br><br><br>

- <b>'Schemaless'</b><br><br>
- <b>Haute disponibilité</b> (réplication possible des données)<br><br>
- <b>'Horizontal Scaling'</b> (sharding)
<br><br>
Notes:
Pour obtenir une scalabilité horizontale, il a fallu omettre deux grandes fonctionnalités du monde SQL :
- les transactions multiples qui ne sont plus vraiment le cas puisque cette fonctionnalité a été implémentée dans la version 4 (reste tout de même déconseillé)
- Les jointures n'ont également pas été implémentées. Un système similaire a été implémenté dans le framework d'agrégation, mais sera vu bien plus tard dans la formation

##==##

<!-- .slide: class="exercice lab" -->
# Exercice 1
## Lab
<br>

- Qu'est-ce qui assure une haute disponibilité des données avec MongoDB? <br/><br/>
- Quelles fonctionnalités ont été délibérément omises pour assurer une scalabilité horizontale? <br/><br/>
- Qu'est-ce qu'une colonne SQL en MongoDB? <br/><br/>
- Comment caractérise-t-on le modèle de document en MongoDB?
