<div align="center">

<img src="docs/banner.svg" alt="Leonardo Nucamendi Ruiz — Portafolio y blog técnico" width="100%">

<br>

<a href="https://mi-landing-devblog.vercel.app/">
  <img src="https://img.shields.io/badge/Vercel-Live-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</a>
<a href="https://mi-blog-dev.vercel.app/">
  <img src="https://img.shields.io/badge/Blog-DevBlog__-3df0a8?style=for-the-badge&logo=hashnode&logoColor=0b0f0e" alt="Blog">
</a>
<a href="https://leonardo251207.github.io/mi-landing-devblog/">
  <img src="https://img.shields.io/badge/GitHub%20Pages-Live-222222?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages">
</a>
<img src="https://img.shields.io/badge/HTML%20·%20CSS%20·%20JS-vanilla-0b0f0e?style=for-the-badge&logo=javascript&logoColor=3df0a8" alt="HTML, CSS y JavaScript">

# Portafolio DevBlog_

**Landing profesional de Leonardo Nucamendi Ruiz.** Hero, proyectos,
certificaciones, videos, últimas notas del blog y contacto.

[Portafolio](https://mi-landing-devblog.vercel.app/) ·
[Landing del proyecto](https://mi-landing-devblog.vercel.app/sitio.html?site=devblog-project) ·
[Blog](https://mi-blog-dev.vercel.app/) ·
[CMS](https://mi-blog-dev.vercel.app/admin.html)

</div>

---

## Repositorios

| Repositorio | Contenido |
|---|---|
| **mi-landing-devblog** (este) | Portafolio y renderer multi-sitio. |
| **[mi-blog-dev](https://github.com/Leonardo251207/mi-blog-dev)** | Blog, CMS API, métricas y generador estático. |

La landing enlaza al blog y el blog enlaza a la landing. Cada sitio se despliega
por separado y comparte el mismo CMS.

## Capacidades

- **Landing profesional** con hero, tecnologías, proyectos, certificaciones,
  videos, notas y contacto.
- **Multi-sitio**: `sitio.html?site={slug}` sirve landings adicionales con su
  propio contenido y tema.
- **Videos** por URL o archivo subido al CMS: MP4/WebM/MOV, YouTube o Vimeo,
  con póster, subtítulos VTT y CTA.
- **Contenido editable** desde la consola: el renderer aplica el contenido
  publicado, el tema del sitio y la publicidad activa.
- **Respaldo estático** si la API no responde.

## Estructura

```text
mi-landing-devblog/
├── index.html            # Portafolio
├── sitio.html            # Renderer multi-sitio
├── landing.js            # Contenido del portafolio
├── sitio.js              # Renderer por sitio
├── notes.js              # Últimas notas del blog
├── api.js                # Cliente de la API del CMS
├── api-config.js         # URLs y tokens públicos
├── metrics.js            # Beacon del colector
├── styles.css            # Sistema visual
├── sitio.css             # Estilos de videos y multi-sitio
├── script.js             # Interacciones del sitio
├── assets/               # Foto de perfil y certificados
├── docs/banner.svg
└── .github/workflows/    # GitHub Pages
```

## Stack

`HTML5` · `CSS3` · `JavaScript vanilla` · `FastAPI CMS` · `Vercel` ·
`GitHub Pages` · `GitHub Actions`

## Autor

**Leonardo Nucamendi Ruiz**  
Estudiante de Ing. en Tecnologías de la Información e Innovación Digital · México

[GitHub](https://github.com/Leonardo251207) ·
[LinkedIn](https://www.linkedin.com/in/leonardo-nucamendi-703b48441/) ·
[Blog](https://mi-blog-dev.vercel.app/)

---

<div align="center">
  <sub>Hecho con intención · 2026</sub>
</div>
