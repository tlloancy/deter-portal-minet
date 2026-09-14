# Portail deter-mi.net

Hub du domaine (Le Puit de connaissance) sur **portal.deter-mi.net**.
Le support en fait partie : même page, aussi via **support.deter-mi.net**.

Contact : [tlloancy@deter-mi.net](mailto:tlloancy@deter-mi.net)

## Contenu

- `index.html`
- `wordpress-perpignan/` — création de site WordPress, Perpignan / 66
- `formation-wordpress-perpignan/` — formation WordPress, Perpignan / 66
- `assets/` — CSS, JS, favicon

## Aperçu local

```bash
python -m http.server 8080
```

Ouvrir `http://localhost:8080`.

## Search Console

La propriété **domaine** `sc-domain:deter-mi.net` couvre déjà apex, www et tous les sous-domaines (`portal`, `formation`, `forces`, `t4c`, `support`…). Pas besoin d’enregistrer chaque sous-domaine.

Après déploiement, dans Search Console : sitemaps → `https://portal.deter-mi.net/sitemap.xml`, puis Inspection d’URL sur `https://portal.deter-mi.net/`, `https://portal.deter-mi.net/wordpress-perpignan/` et `https://portal.deter-mi.net/formation-wordpress-perpignan/`.

Sur la fiche Google Business : URL du site = `https://portal.deter-mi.net/` (pas l’apex WooCommerce démo). Catégorie principale type « Concepteur de sites Web », secondaire « Formateur ». Les avis Maps pèsent plus que le HTML pour passer devant les agences du 66 dans le pack local.

Le sitemap de ce dépôt ne liste que le hub (même hôte). Les autres sites ont chacun le leur.

## Hors périmètre

Pas de vhost Apache dans ce dépôt. Pas d’export Godot, pas de signaling, pas d’auth T4C.
