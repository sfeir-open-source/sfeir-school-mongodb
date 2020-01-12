<!-- .slide: class="sfeir-basic-slide" -->
# Primary Shard
<br><br>
<ul>
    <li>Réalise les opérations lourde comme le sort</li><br>
    <li>Contient toutes les collections qui ne sont pas shared</li><br>
    <li>Elu automatique par les mongos (celui qui possède le moins de data)</li><br>
    <li>Peut être modifié à l'aide la commande movePrimary</li><br>
</ul>