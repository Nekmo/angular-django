API guide
=========
The following guide allows you to delve into the use of Angular Django for more advanced uses.

Serializer fields
-----------------
Angular Django will transform all response values using the ``@Field()`` decorator in the serializer to the correct
type. Even if the server sends a value with another type, such as a string:

.. code-block:: json

    {"date_joined": "2020-10-04T01:37:56.460648Z"}

The server will convert it to the type declared in the serializer:

.. code-block:: typescript

    export class User extends SerializerService {
      @Field() date_joined: Date;
    }


This will also work with **nested serializers** but **multiple nested serializers** must be declared specially:

.. code-block:: typescript

    export class Permission extends SerializerService {
      @Field() code_name: string;
      @Field() name: string;
    }

    export class User extends SerializerService {
      @Field({many: true}) permissions: Permission[];
    }

The fields declared with the ``Field()`` decorator will also be used for building forms with the ``getFormFields()``
method. The forms fields created with ``getFormFields()`` can also be customized using ``Field()``. The following are
the available options:

.. code-block:: typescript

    export interface FieldOptions {
      widget?: string | Widget;
      many?: boolean;
      required?: boolean;
      defaultValue?: any;
      readOnly?: boolean;
      writeOnly?: boolean;
      helpText?: string;
    }

Most options like ``is_required`` are obtained from the server automatically. Angular Django uses the server's
``HTTP OPTIONS`` method to get these options. ``@Field()``'s options take precedence over server options.


API & serializer extra actions
------------------------------
`Django Rest Framework extra actions`_ allow you to perform additional actions on objects or on lists. For example,
to get users ordered by join date. These actions are added to the Django Rest Framework viewsets.

.. code-block:: python

    class UserViewSet(viewsets.ReadOnlyModelViewSet):
        queryset = User.objects.all()
        serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'status': 'password set'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False)
    def recent_users(self, request):
        recent_users = User.objects.all().order_by('-last_login')

        page = self.paginate_queryset(recent_users)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_users, many=True)
        return Response(serializer.data)

These actions are not automatically detected by Angular Django and must be added manually to typescript classes.

.. code-block:: typescript

    @Api(User)
    @Injectable({
      providedIn: 'root'
    })
    export class UserApi extends ApiService {

      url = '/api/users/';
      serializer = User;

      constructor(injector: Injector) {
        super(injector);
      }

      setPassword(pk: number, password: string): Observable<{status: string}> {
        return this.http.post(`${this.getUrlDetail(pk)}set_password/`,
                              {password}, this.defaultHttpOptions()) as {status: string};
      }

      recentUsers(): Observable<Page<any>> {
        return this.pipeHttp(this.http.get(`${this.getUrlList()}recent_users/`, {params: this.queryParams}), true) as
          Observable<Page<any>>;
      }
    }

``this.pipeHttp`` method transforms the server response with the API serializer (``User`` serializer in this example):

.. code-block:: typescript

  /**
   * Transform the observable object or objects with the API serializer.
   * @param observable: observable to add the pipe to.
   * @param listMode: Apply the serializer to an object (retrieve) or several (list).
   */
  pipeHttp(observable: Observable<object | object[] | ApiPage>,
           listMode: boolean = false): Observable<object | Page<SerializerService>> {
  }


In this example ``setPassword`` does not return the object as a response. In this case the ``this.pipeHttp`` method
should not be used. In order to use the action in the serializer, the method must be added.

It is recommended to add the actions of the objects (those that use ``detail=True``) to the serializer to be able to use
them in the serializer instances.

.. code-block:: typescript

    export class User extends SerializerService {
      @Field() url: string;
      @Field() id: number;
      @Field() username: string;
      @Field() email: string;
      @Field() is_active: boolean;
      @Field() date_joined: Date;

      getName(): string {
        return this.username;
      }

      setPassword(password: string): Observable<{status: string}> {
        return this._api.setPassword(this.pk, password);
      }
    }


So you can use the newly added method:

.. code-block:: typescript

    // Subscribe style:
    UserApi.retrieve(123).subscribe(user: User) {
      user.setPassword('newPassword').subscribe();
    }

    // Await style:
    const user: User = await UserApi.retrieve(123).toPromise();
    await user.setPassword('newPassword');


.. _Django Rest Framework extra actions: https://www.django-rest-framework.org/api-guide/viewsets/#marking-extra-actions-for-routing
