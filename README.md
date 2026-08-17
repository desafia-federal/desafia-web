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

## Sistema de marca

La interfaz implementa el Manual de Marca DESAFÍA Federal v1.1. Los tokens
centrales están en `src/app/globals.css`: Azul Derecho `#032545`, Violeta
Acción `#7537E2`, Lavanda Encuentro `#DCB4FA`, Naranja Expresión `#FB9A33`,
Crema Comunidad `#FEEFD5` y blanco. Inter es la familia principal y Georgia se
reserva para énfasis editorial y relatos.

Los activos web optimizados están en `public/brand`. No se debe reconstruir el
wordmark con texto, deformar el logo ni separar sus elementos. Toda nueva
combinación de texto y fondo debe conservar, como mínimo, contraste WCAG AA.

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

## Cena fundacional y Mercado Pago

`/participar` presenta la cena a beneficio del 27 de agosto de 2026 y crea una
preferencia de Checkout Pro por cada reserva. El precio, la moneda y la
referencia del evento se definen únicamente en el servidor. Antes de habilitar
el cobro en producción hay que configurar:

- `MERCADO_PAGO_ACCESS_TOKEN`: credencial privada de la aplicación.
- `MERCADO_PAGO_WEBHOOK_SECRET`: firma secreta del webhook de pagos.
- `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` (o los equivalentes
  `KV_REST_API_URL` y `KV_REST_API_TOKEN`): registro persistente de la nómina.
- `NEXT_PUBLIC_SITE_URL`: origen HTTPS público, sin barra final.

En Mercado Pago se debe registrar el evento `payment` con la URL
`https://TU_DOMINIO/api/mercado-pago/webhook`. La ruta verifica la firma,
consulta el pago directamente en Mercado Pago y solo registra un nombre si el
estado es `approved`, la moneda es ARS, el importe es $150.000 y la referencia
corresponde a la cena. El ID de pago funciona como clave idempotente.

Para publicar un nombre se solicita consentimiento explícito. El correo se usa
para iniciar el checkout, no se incluye en la nómina pública y el portal nunca
recibe datos de tarjeta. Sin todas las variables privadas configuradas, el
endpoint de checkout rechaza nuevas reservas para evitar cobros sin registro.

## Contenido y datos

Los indicadores muestran el estado fundacional real de la asociación y metas
del primer año. No deben reemplazarse por números estimados: cada actualización
debe corresponder a evidencia verificable.

## Licencias y fuentes

El código está bajo licencia MIT. Ver [NOTICE.md](./NOTICE.md) para las
referencias de diseño, contenido y fotografías.
