Installation
============

**Angular-django** consists of two packages: a package for Angular and an optional package for Django. To install the
**Angular package**.

.. code-block:: shell

    $ npm i angular-django

Import ``AngularDjangoModule`` and ``HttpClientModule`` in your app:

.. code-block:: typescript

    import { AngularDjangoModule } from 'angular-django';
    import { HttpClientModule } from '@angular/common/http';


      @NgModule({
        imports: [
           AngularDjangoModule,
           HttpClientModule,
        ],
      })
      export class AppModule { }

Enable ``emitDecoratorMetadata`` in the ``compilerOptions`` section of your ``tsconfig.json``:

.. code-block:: json

    {
      "compilerOptions": {
        "emitDecoratorMetadata": true
      }
    }

Install the **Django package** in your project:

.. code-block:: shell

    $ pip install -U angular-django

Add the app in the ``INSTALLED_APPS`` list in your ``settings.py`` file:

.. code-block:: python

    INSTALLED_APPS = [
        # ...
        'rest_framework',
        'angular_django',
    ]
