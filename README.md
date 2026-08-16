# DESAFÍA Federal — Portal web

Portal institucional de **DESAFÍA Federal**, una asociación civil en etapa de
formación desde Córdoba, con mirada federal, dedicada a enfrentar la exclusión
que producen las barreras para comunicarse.

> Derecho a la Expresión Sin barreras: Asociación Federal por la Inclusión y
> la Autonomía.

## Stack

- Next.js 16 con App Router
- React 19 y TypeScript
- CSS nativo, sin runtime de componentes
- Formularios serverless compatibles con Vercel
- Imágenes optimizadas con `next/image`

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Abrí `http://localhost:3000`.

## Verificación

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Despliegue en Vercel

1. Importá este repositorio en Vercel.
2. Vercel detectará Next.js automáticamente.
3. Copiá las variables necesarias desde `.env.example`.
4. Configurá `NEXT_PUBLIC_SITE_URL` con el dominio definitivo.

No se necesita una configuración especial de build.

## Formularios

Los formularios envían JSON a `CONTACT_WEBHOOK_URL`. Mientras esa variable no
esté configurada, el portal informa con claridad que el envío todavía no está
habilitado y ofrece el correo institucional como alternativa.

## Donaciones

La interfaz está preparada para contribuciones únicas o mensuales en ARS y
USD. Los botones permanecen deshabilitados hasta que la asociación esté
constituida y se agreguen URLs de checkout verificadas. El sitio nunca captura
ni almacena información de tarjetas.

## Contenido y datos

Los indicadores muestran el estado fundacional real de la asociación y metas
del primer año. No deben reemplazarse por números estimados: cada actualización
debe corresponder a evidencia verificable.

## Licencias y fuentes

El código está bajo licencia MIT. Ver [NOTICE.md](./NOTICE.md) para las
referencias de diseño, contenido y fotografías.
