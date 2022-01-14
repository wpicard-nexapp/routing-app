# routing-app
Proof of concept: improved routing and route configuration with react-router

Utilitaire qui permettrait de gérer la structure en arborescence commune à la plupart des apps.
L’idée c’est de faire un peu comme quand on design des api rest, avec les identifiants pour ressources et sub-ressources.

resourceful-tree-js (name to be refined):
- brief: Streamlined routing for front-end (and backend?) ressources api
- “Known parents tree”:
  - generate a tree of known parents and children for a given resource that is easily accessible from within this tree
- “Unknown parents”:
  - a resource can be nested under another with no knowledge of its predecessor but still provide useful information about its descendants
- “Relative resolve”:
  - auto-magically resolve the full path of a given resource, even if one ore many of its parents are unknown
- “Unknown childs?“:
  - sub-resources that are unknown (dynamically added) might be allowed
- “Path params and query strings”:
  - they generate a unique signature for the resources (function, react component, etc.) and are easily accessible from within the resource tree.
- “Interoperability”:
  - Works with vanillaJS, React, react-router, expressJS. (allow different methods overload for backend: get/post/etc.)
- Strongly typed?
