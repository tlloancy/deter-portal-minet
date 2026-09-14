# Portail deter-mi.net

Hub du domaine (Le Puit de connaissance) sur **portal.deter-mi.net**.
Le support en fait partie : même page, aussi via **support.deter-mi.net**.

Contact : [tlloancy@deter-mi.net](mailto:tlloancy@deter-mi.net)

## Contenu

- `index.html`
- `assets/` — CSS, JS, favicon

## Aperçu local

```bash
python -m http.server 8080
```

Ouvrir `http://localhost:8080`.

## Search Console

La propriété **domaine** `sc-domain:deter-mi.net` couvre déjà apex, www et tous les sous-domaines (`portal`, `formation`, `forces`, `t4c`, `support`…). Pas besoin d’enregistrer chaque sous-domaine.

Après déploiement, dans Search Console : sitemaps → `https://portal.deter-mi.net/sitemap.xml`, puis Inspection d’URL sur `https://portal.deter-mi.net/`.

Le sitemap de ce dépôt ne liste que le hub (même hôte). Les autres sites ont chacun le leur.

## Hors périmètre

Pas de vhost Apache dans ce dépôt. Pas d’export Godot, pas de signaling, pas d’auth T4C.
