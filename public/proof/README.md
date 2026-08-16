# SOOCLY camera proof media

Only real straight-out-of-camera JPEG evidence belongs in this directory.

Reference photography, browser-filter mockups, AI-generated images, edited exports, and stock imagery must never be added here as camera proof.

Each variant uses its own directory:

`/proof/<variant-id>/samples/`

`/proof/<variant-id>/pairs/`

The canonical metadata ledger is `proof/manifest.json`. CI checks that every manifest-referenced proof image exists under the matching variant directory.
