## Http failure response for  /wc/v3 401 Unauthorized wordpress
- change ```http``` with ```https```

#### enviroment.ts
```js
export const environment = {
  production: false,
  API_URL: "https://localhost/projects/_rd/VueWP/wordpress/wp-json/"
};
```

- Make sure in ```.htaccess``` add this 2 lines

```js
RewriteRule ^index\.php$ – [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```


```xml
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /projects/_rd/VueWP/wordpress/
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /projects/_rd/VueWP/wordpress/index.php [L]

RewriteRule ^index\.php$ – [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
</IfModule>
```














## NG0303: Can't bind to 'ngForOf' since it isn't a known property of 'tr'.

- Make sure component imported in ```app.module.ts``` OR ```xyz-component.module.ts``` *incase modular based folder

```import { ProductListComponent } from './views/frontend/pages/products/product-list/product-list.component';```







## Render string with html tags in Angular | Vue v-html

```[innerHTML]="product.description"```