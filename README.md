<div align="center">

<img src="docs/banner.svg" alt="Leonardo Nucamendi Ruiz — Portafolio y blog técnico" width="100%">

<br>

<a href="https://mi-landing-devblog.vercel.app/">
  <img src="https://img.shields.io/badge/Vercel-Live-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</a>
<a href="https://mi-blog-dev.vercel.app/">
  <img src="https://img.shields.io/badge/Blog-DevBlog__-3df0a8?style=for-the-badge&logo=hashnode&logoColor=0b0f0e" alt="Blog">
</a>
<a href="https://github.com/Leonardo251207">
  <img src="https://img.shields.io/badge/GitHub-Leonardo251207-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>
<img src="https://img.shields.io/badge/HTML%20·%20CSS%20·%20JS-vanilla-0b0f0e?style=for-the-badge&logo=javascript&logoColor=3df0a8" alt="HTML, CSS y JavaScript">

# Portafolio DevBlog_

**Landing personal de Leonardo Nucamendi Ruiz.** Proyectos, certificaciones y
contacto, con un puente directo al blog técnico.

[Demo en Vercel](https://mi-landing-devblog.vercel.app/) ·
[Blog](https://mi-blog-dev.vercel.app/) ·
[Repositorio del blog](https://github.com/Leonardo251207/mi-blog-dev)

</div>

---

## Qué es este repo

Este repositorio contiene **solo la landing/portafolio**: la portada, la
presentación, los proyectos, las certificaciones y el contacto.

El blog, la consola CMS, el servicio de métricas y el generador de HTML estático
viven en un repositorio aparte:

- **Landing (este repo):** presentación personal y enlaces.
- **[mi-blog-dev](https://github.com/Leonardo251207/mi-blog-dev):** blog dinámico,
  CMS API en FastAPI, métricas con GraphQL y generador de páginas estáticas.

La separación permite desplegar y versionar cada sitio por su cuenta sin tocar
el otro.

## Demo en vivo

| Sitio | URL |
|---|---|
| Portafolio (Vercel) | <https://mi-landing-devblog.vercel.app/> |
| Portafolio (GitHub Pages) | <https://leonardo251207.github.io/mi-landing-devblog/> |
| Blog + CMS | <https://mi-blog-dev.vercel.app/> |
| Repositorio del blog | <https://github.com/Leonardo251207/mi-blog-dev> |

## Secciones

| Sección | Contenido |
|---|---|
| **Hero** | Nombre, rol, propuesta y foto de perfil. |
| **Tecnologías** | C++, Java, JavaScript, Python, HTML y CSS. |
| **Proyectos** | Lawpocket, Math & English Quest y Marketplace Universitario. |
| **Certificaciones** | PDFs de Código Facilito, AWS Academy, Google y Cisco. |
| **Blog** | Tarjetas con las últimas notas y enlace al blog completo. |
| **Contacto** | GitHub, LinkedIn y correo con copia al portapapeles. |

## Stack

`HTML5` · `CSS3` · `JavaScript vanilla` · `Vercel` · `GitHub Pages` ·
`GitHub Actions`

Sin frameworks, sin build: son archivos estáticos que se sirven tal cual.

## Estructura

```text
mi-landing-devblog/
├── index.html            # Landing completa
├── styles.css            # Sistema visual retro-tech
├── script.js             # Menú, scroll reveal y copia del correo
├── metrics-config.js     # Configuración pública del beacon
├── metrics.js            # Carga del colector de métricas
├── assets/               # Foto de perfil y certificados PDF
├── docs/banner.svg       # Banner del README
└── .github/workflows/    # Despliegue en GitHub Pages
```

## Ejecutar en local

No necesita instalación. Desde la raíz del repo:

```powershell
python -m http.server 5500
```

Abre <http://127.0.0.1:5500/>.

> En local, el beacon de métricas apunta a `http://127.0.0.1:8000`. Si el
> colector no está corriendo, el sitio funciona igual: solo no registra visitas.

## Despliegue

### Vercel

1. Importa este repositorio en Vercel.
2. Framework preset: **Other**.
3. Build command: vacío. Output directory: `.`
4. Deploy.

### GitHub Pages

El workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
publica la raíz del repositorio en cada push a `main`. Solo hay que activar
**Settings → Pages → Source: GitHub Actions**.

## Mantenimiento

- El contenido editable (proyectos, certificaciones, enlaces) está en
  `index.html`.
- Los estilos globales viven en `styles.css`; los colores y tipografías se
  controlan con variables CSS en `:root`.
- Si cambia la URL del blog, actualízala en `index.html` (nav, hero, sección de
  blog y footer).
- La landing envía pageviews al mismo sitio `devblog` del colector de métricas,
  así que el tráfico de ambos repos aparece junto en GraphQL.

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
