# BitaHealth Frontend

BitaHealth es la interfaz web de una herramienta integral para el análisis de señales biométricas (ECG y HRV) que utiliza inteligencia artificial. Esta aplicación, desarrollada con React (Create React App), permite a los usuarios:

- Subir archivos TXT de BITalino (y opcionalmente archivos H5) para analizar la señal.
- Visualizar los resultados del análisis, que incluyen métricas de HRV y diversos gráficos generados por el backend.
- Consultar gráficos resumen (gráfico circular y gráfico de barras) que muestran la distribución de las predicciones de la IA.
- Descargar un informe en formato PDF que incluye todos los resultados y gráficos generados.

## Características

- **Carga de archivos:** Permite la subida del archivo TXT (y opcionalmente H5) para enviar al servidor Flask.
- **Visualización de resultados:** Muestra el resultado textual del modelo de IA, gráficos generados en el backend (señal ECG limpia, segmento ampliado, serie de intervalos RR, Poincaré plot, histograma, espectro FFT, etc.) y gráficos resumen (pastel y barras) basados en las predicciones.
- **Descarga de informe PDF:** Opción para exportar en PDF todo el contenido mostrado en la interfaz.
- **Interfaz moderna y minimalista:** Diseñada con CSS personalizado y utilizando componentes de ChartJS para la visualización de datos.

## Instalación

Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, sigue estos pasos:

1. Clona el repositorio o descarga el código fuente.
2. Abre una terminal en la carpeta del proyecto y ejecuta:

   ```bash
   npm install

Esto instalará todas las dependencias necesarias.

Las dependencias principales incluyen:
- React (Create React App)
- react-chartjs-2 y chart.js para gráficos.
- jsPDF y html2canvas para la generación del PDF.

## Uso
Inicia el servidor de desarrollo:

   ```bash
   npm start
  ```
Abre tu navegador en http://localhost:3000.

Utiliza la interfaz para:

- Subir el archivo TXT de BITalino.
- Visualizar los resultados y gráficos generados por el backend.
- Descargar el informe PDF mediante el botón "Descargar Informe PDF".
- Reiniciar la medición usando el botón "Volver a hacer otra medición".

## Comunicación con el Backend
La aplicación se comunica con un servidor Flask (configurado en otro repositorio o carpeta) que procesa el archivo subido, segmenta la señal en ventanas, calcula las métricas HRV, ejecuta el modelo de IA y genera gráficos. Asegúrate de que el servidor Flask esté corriendo (por defecto en http://localhost:5000/upload) para que el frontend pueda enviar los archivos y recibir los resultados.
