# Pruebas React

Permite inicialmente listar todos los productos sin importar la categoría y permite seleccionarlos de acuerdo a las opciones del menú.
Adicionalmente permire realizar varios filtros por los atributos de los productos.
Y se pueden agregar los productos a un carrito que queda guardado por medio de localstorage.

## Ver funcionando 🚀
la prueba esta montada en el subdominio **https://baraton.monodigital.com.co/** ingresa para verificar su funcionamiento.

### Instalación 🔧

Para ejecutarlo localmente se debe tener instalado nodejs

Debes descargar o clonar el repositorio y luego seguir los siguientes pasos:

```
cd carpeta_local
```


instalar dependencias
```
npm install
```


configurar urls en el archivo services/apirest.js modificar se debe poner la ruta local al api en laravel para que todo funcione localmente.
```
export const Apiurl = "https://api.monodigital.com.co/api/"
export const url = "https://api.monodigital.com.co/"
```


Ejecutar aplicación
```
npm start
```
