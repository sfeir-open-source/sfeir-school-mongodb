<!-- .slide: class="sfeir-basic-slide"-->
# Les avantages de MongoDB
<br><br><br>
- <strong>'Schemaless'</strong>
<br><br>
- <strong>Haute disponibilité</strong> (réplication possible des données)
<br><br>
- <strong>'Horizontal Scaling'</strong> (sharding)
<br><br>
Notes:
Pour obtenir une scalabilité horiziontale, il a fallu omettre deux grandes fonctionnalités du monde SQL
- la transactions multiple qui n'est plus vraiment le cas puisque cette fonctionnalité a été implémentée dans la version 4 (reste tout de même déconseillé)
- Les jointures n'ont également pas été implémentées. Un système similaire a été implémenté dans le framework d'intégration, mais sera vu que bien plus tard dans la formation

##==##

<!-- .slide: class="exercice sfeir-bg-pink" -->
## Exercice
- Qu'est ce qui assure une haute disponibilité des données avec MongoDB?
- Quelles fonctionnalités ont été délibérément omises pour assurer une scalabilité horizontale?
- Qu'est ce qu'une colonne SQL en MongoDB?
- Comment caratérise t-on le modèle de document en MongoDB?
