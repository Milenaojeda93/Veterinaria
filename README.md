# MoledaVet · Sistema de gestión veterinaria

Sistema web para una clínica veterinaria con hotel canino y guardería. Funciona en computadora y celular, con modo claro y oscuro.

## Módulos

**Clínica**
- Inicio: resumen del día, solicitudes y recordatorios
- Agenda y turnos: vista semanal y mensual, respeta feriados y horarios
- Propietarios y pacientes: lista o tarjetas, agrupados por letra y contraíbles; ficha con historia clínica, vacunas, antiparasitarios y recetas
- Internación y urgencias (triage por prioridad)
- Hotel y guardería: reservas por canil, planes por día, semana o mes, ocupación de 14 días, ingreso y salida, facturación de la estadía
- Baño y peluquería
- Recordatorios por WhatsApp

**Administración**
- Presupuestos, facturación (IVA 10 % y 5 %), caja diaria, stock y compras, tesorería, reportes
- Ajustes: horarios, feriados de Paraguay y cierres propios

## Estructura

| Carpeta | Contenido |
|---|---|
| `sistema/` | Versión principal en un solo archivo (`index.html`), pensada para correr con una base de datos compartida |
| `demo/` | Versión demo para Vercel: datos de ejemplo guardados en el navegador y acceso con usuario y contraseña |
| `herramientas/mkapp.py` | Genera `demo/app.js` a partir de `sistema/index.html` |

## Actualizar la demo

1. Editar `sistema/index.html`.
2. Ejecutar `python3 herramientas/mkapp.py` para regenerar `demo/app.js`.
3. Si cambian los estilos, copiar los nuevos a `demo/app.css` o `demo/hotel.css`.
4. Publicar la carpeta `demo/` en Vercel.

Los datos de la demo son ficticios y se guardan solo en el dispositivo de quien la abre.
