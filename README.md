# Evolivie Santé

Application React + TypeScript + Vite + Tailwind CSS pour le tunnel de souscription Néoliane.

## Développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Configuration

Copiez `.env.example` vers `.env` et renseignez votre `VITE_NEOLIANE_TOKEN`. Vous pouvez
également ajuster `VITE_PROXY_URL` si le proxy PHP n'est pas à la racine.

Le fichier `proxy-neoliane.php` fournit un point d'entrée côté serveur pour
relayer toutes les requêtes vers l'API Néoliane. Déposez-le à la racine du site
ou adaptez son URL via `VITE_PROXY_URL`.

Copiez `.env.example` vers `.env` et renseignez votre `VITE_NEOLIANE_TOKEN`.
