FROM python:3.8 as gunicorn-build
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app
WORKDIR /app
COPY demo/django/requirements.txt .
RUN pip install -r requirements.txt
COPY compose/gunicorn/entrypoint.sh /
RUN chmod +x "/entrypoint.sh"
COPY src/django /tmp/django
RUN cd /tmp/django && python setup.py install && rm -rf /tmp/django
COPY demo/django ./

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/local/bin/gunicorn", "-b", "0.0.0.0:8000", "demo.wsgi:application"]


FROM node:14.12 as angular-build
ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir -p /app /angular-django
WORKDIR /app
COPY demo/angular/package.json demo/angular/package-lock.json ./
RUN npm install
COPY demo/angular ./

WORKDIR /angular-django
COPY src/angular ./
RUN npm install && ng build
WORKDIR /app
RUN ls /angular-django/
WORKDIR /app
RUN npm install /angular-django/dist/angular-django
RUN ng build --prod


FROM nginx:1.19 as nginx-build

COPY --from=angular-build /app/dist/angular-demo/ /angular/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
