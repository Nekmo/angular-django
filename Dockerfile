FROM python:3.8 as gunicorn-build
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app
WORKDIR /app
COPY django_demo/requirements.txt .
RUN pip install -r requirements.txt
COPY compose/gunicorn/entrypoint.sh /
RUN chmod +x "/entrypoint.sh"
COPY django_demo ./

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/local/bin/gunicorn", "-b", "0.0.0.0:8000", "demo.wsgi:application"]


FROM node:14.12 as angular-build
ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir -p /app /angular-django
WORKDIR /app
COPY angular-demo/package.json angular-demo/package-lock.json ./
RUN npm install
COPY angular-demo ./

WORKDIR /angular-django
COPY angular-django ./
RUN npm install && ng build
WORKDIR /app
RUN ls /angular-django/
WORKDIR /app
RUN npm install /angular-django/dist/angular-django
RUN ng build --prod


FROM nginx:1.19 as nginx-build

COPY --from=angular-build /app/dist/angular-demo/ /angular/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
