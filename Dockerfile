FROM python:3.8 as gunicorn-build
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app /tmp/django/src/django
WORKDIR /app
COPY demo/django/requirements.txt .
COPY setup.* *.in LICENSE /tmp/django/
RUN pip install -r requirements.txt
COPY compose/gunicorn/entrypoint.sh /
RUN chmod +x "/entrypoint.sh"
COPY src/django/ /tmp/django/src/django
RUN cd /tmp/django && python setup.py install
COPY demo/django ./

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/local/bin/gunicorn", "-b", "0.0.0.0:8000", "demo.wsgi:application"]


FROM python:3.8 as docs
ENV OUTPUT_DOCS_DIRECTORY _build/docs
WORKDIR /docs
COPY docs/ .
RUN pip install -r requirements.txt
RUN make docs


FROM node:14.12 as angular-src-build
ENV PATH /angular-django/node_modules/.bin:$PATH
RUN mkdir /angular-django
WORKDIR /angular-django
COPY src/angular/package.json src/angular/package-lock.json ./
RUN npm i && ngcc
COPY src/angular ./
RUN ng build --prod
RUN ln -s /angular-django/dist/angular-django /angular-django/node_modules/angular-django


FROM node:14.12 as angular-demo-build
ENV PATH /app/node_modules/.bin:$PATH
RUN mkdir /app
WORKDIR /app
COPY demo/angular/package.json demo/angular/package-lock.json ./
RUN npm ci && ngcc
COPY --from=angular-src-build /angular-django/dist/ /app/node_modules/
COPY demo/angular ./
RUN ng build --prod
COPY --from=docs /docs/ demo/angular/src/assets/


FROM nginx:1.19 as nginx-build

COPY --from=angular-demo-build /app/dist/angular-demo/ /angular/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
